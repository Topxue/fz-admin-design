import { RouteRecordRaw } from 'vue-router'

import router from '@/router'
import { getRouteList } from '@/services/api/user'
import pinia, {
  useUserStore,
  useRoutesList,
  useKeepALiveNames,
  useTagsViewRoutes
} from '@/stores'
import { dynamicRoutes, notFoundAndNoPower } from '@/router/routers'

/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const layouModules: any = import.meta.glob(
  '../../layout/routerView/*.{vue,tsx}'
)
const viewsModules: any = import.meta.glob('../../views/**/*.{vue,tsx}')
const dynamicViewsModules: Record<string, Function> = Object.assign(
  {},
  { ...layouModules },
  { ...viewsModules }
)

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method useUserInfo().setUserInfo() 触发初始化用户信息 pinia
 * @method useRequestOldRoutes().setRequestOldRoutes() 存储接口原始路由（未处理component），根据需求选择使用
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */

export async function initBackEndControlRoutes() {
  // 无 token 停止执行下一步
  if (!useUserStore(pinia).getToken) return false

  // 触发初始化用户信息
  await useUserStore(pinia).getUserInfo()

  // 获取路由菜单数据
  const res = await getBackEndControlRoutes()
  // 无登录权限时，添加判断
  if (res.data.length <= 0) return Promise.resolve(true)
  // 存储接口原始路由（未处理component），根据需求选择使用
  // useRequestOldRoutes().setRequestOldRoutes(
  //   JSON.parse(JSON.stringify(res.data))
  // )
  // 处理路由（component），替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
  dynamicRoutes[0].children = await backEndComponent(res.data)
  // 添加动态路由
  await setAddRoute()
  // 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
  await setFilterMenuAndCacheTagsViewRoutes()
}

/**
 * 设置路由到 pinia routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(hidden)
 */
export async function setFilterMenuAndCacheTagsViewRoutes() {
  const storesRoutesList = useRoutesList(pinia)
  storesRoutesList.setRoutesList(dynamicRoutes[0].children as any)
  setCacheTagsViewRoutes()
}

/**
 * 缓存多级嵌套数组处理后的一维数组
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(hidden)
 */
export function setCacheTagsViewRoutes() {
  const storesTagsView = useTagsViewRoutes(pinia)

  const asyncRoutes = formatTwoStageRoutes(
    formatFlatteningRoutes(dynamicRoutes)
  )[0].children

  storesTagsView.setTagsViewRoutes(asyncRoutes)
}

/**
 * 处理路由格式及添加捕获所有路由或 404 Not found 路由
 * @description 替换 dynamicRoutes（@/router/route）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
export function setFilterRouteEnd() {
  const filterRouteEnd: any = formatTwoStageRoutes(
    formatFlatteningRoutes(dynamicRoutes)
  )
  // notFoundAndNoPower 防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
  // 关联问题 No match found for location with path 'xxx'
  filterRouteEnd[0].children = [
    ...filterRouteEnd[0].children,
    ...notFoundAndNoPower
  ]
  return filterRouteEnd
}

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr: any) {
  if (arr.length <= 0) return false
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children) {
      arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1))
    }
  }
  return arr
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 支持二级缓存）
 * @description keepAlive 处理 `name` 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 `定义动态路由（dynamicRoutes）` 的格式
 */
export function formatTwoStageRoutes(arr: any) {
  if (arr.length <= 0) return false
  const newArr: any = []
  const cacheList: Array<string> = []
  arr.forEach((v: any) => {
    if (v.path === '/') {
      newArr.push({
        component: v.component,
        name: v.name,
        path: v.path,
        redirect: v.redirect,
        meta: v.meta,
        children: []
      })
    } else {
      // 判断是否是动态路由（xx/:id/:name），用于 tagsView 等中使用
      // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
      if (v.path.indexOf('/:') > -1) {
        v.meta['isDynamic'] = true
        v.meta['isDynamicPath'] = v.path
      }
      newArr[0].children.push({ ...v })
      // 存 name 值，keep-alive 中 include 使用，实现路由的缓存
      // 路径：@/layout/routerView/parent.vue
      if (newArr[0].meta.keepAlive && v.meta.keepAlive) {
        if (v.name) cacheList.push(v.name)

        const stores = useKeepALiveNames(pinia)
        stores.setCacheKeepAlive(cacheList)
      }
    }
  })
  return newArr
}

/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（@/router/routers）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute() {
  await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
    router.addRoute(route)
  })
}

/**
 * 请求后端路由菜单接口
 * @description isRequestRoutes 为 true，则开启后端控制路由
 * @returns 返回后端路由菜单数据
 */
export function getBackEndControlRoutes() {
  return getRouteList()
}

/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes: any) {
  if (!routes) return
  return routes.map((item: any) => {
    if (item.component)
      item.component = dynamicImport(
        dynamicViewsModules,
        item.component as string
      )
    item.children && backEndComponent(item.children)
    return item
  })
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(
  dynamicViewsModules: Record<string, Function>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules)

  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views/', '')

    return k.startsWith(`${component}`) || k.startsWith(`/${component}`)
  })

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]

    return dynamicViewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    return false
  }
}
