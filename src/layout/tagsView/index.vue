<template>
  <div class="layout-navbars-tagsview">
    <a-space>
      <TagItem
        class="tag-item"
        v-for="(item, index) in state.tagsViewList"
        :key="item.path"
        :index="index"
        :tag-data="item"
        @eaction="handleAction"
      >
        <a-tag
          class="tag-item"
          :class="{ 'is-active': isActive(item) }"
          :closable="item.path !== '/home' && isActive(item)"
          @click="tagOnClick(item)"
          @close.stop="closeCurrentTagsView(item.path)"
        >
          {{ item.meta.title }}
        </a-tag>
      </TagItem>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, nextTick, defineAsyncComponent, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import router from '@/router'
import { Eaction, TEaction } from './types'
import pinia, {
  useTagsViewRoutes,
  useKeepALiveNames,
  useAppStore
} from '@/stores'
import { Session } from '@/utils/storage'
import { isObjectValueEqual } from '@/utils'
import { Message } from '@arco-design/web-vue'
import { emitter } from '@/utils/route-listener'

const TagItem = defineAsyncComponent(() => import('./tag-item.vue'))

const appStore = useAppStore()
const tagsViewStore = useTagsViewRoutes()
const storesKeepALiveNames = useKeepALiveNames()

const { appConfig } = storeToRefs(appStore)
const { tagsViewRoutes } = storeToRefs(tagsViewStore)

const route = useRoute()
const state = reactive<TagsViewState<RouteItem>>({
  routeActive: '',
  routePath: '',
  tagsRefsIndex: 0,
  tagsViewList: [],
  tagsViewRoutesList: []
})

// 设置 tagsView 高亮
const isActive = (v: RouteItem) => {
  if (
    (v.query && Object.keys(v.query).length) ||
    (v.params && Object.keys(v.params).length)
  ) {
    // 普通传参
    return v.url ? v.url === state.routeActive : v.path === state.routeActive
  } else {
    // 通过 name 传参，params 取值，刷新页面参数消失
    return v.path === state.routePath
  }
}

// 存储 tagsViewList 到浏览器临时缓存中，页面刷新时，保留记录
const addBrowserSetSession = (tagsViewList: Array<object>) => {
  Session.set('tagsViewList', tagsViewList)
}

// 获取 pinia 中的 tagsViewRoutes 列表
const getTagsViewRoutes = async () => {
  state.routeActive = await setTagsViewHighlight(route)
  state.routePath = (await route.meta.isDynamic)
    ? route.meta.isDynamicPath
    : route.path
  state.tagsViewList = []
  state.tagsViewRoutesList = tagsViewRoutes.value
  initTagsView()
}

// pinia 中获取路由信息：如果是设置了固定的（isAffix），进行初始化显示
const initTagsView = async () => {
  if (Session.get('tagsViewList') && appConfig.value.isCacheTagsView) {
    state.tagsViewList = await Session.get('tagsViewList')
  } else {
    await state.tagsViewRoutesList.map((v: RouteItem) => {
      if (v.meta?.isAffix && !v.meta.isHide) {
        v.url = setTagsViewHighlight(v)
        state.tagsViewList.push({ ...v })
        storesKeepALiveNames.addCachedView(v)
      }
    })
    await addTagsView(route.path, <RouteToFrom>route)
  }
  // 初始化当前元素(li)的下标
  // getTagsRefsIndex(state.routeActive)
}

// 处理 tagsView 高亮（多标签详情时使用，单标签详情未使用）
const setTagsViewHighlight = (v: any) => {
  let params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params
  if (!params || Object.keys(params).length <= 0) return v.path
  let path = ''
  for (let i in params) {
    path += params[i]
  }
  // 判断是否是动态路由（xxx/:id/:name"）
  return `${v.meta.isDynamic ? v.meta.isDynamicPath : v.path}-${path}`
}

// 当前项右键菜单点击，拿当前点击的路由路径对比 浏览器缓存中的 tagsView 路由数组，取当前点击项的详细路由信息
// 防止 tagsView 非当前页演示时，操作异常
const getCurrentRouteItem = (item: RouteItem) => {
  let resItem: any = {}
  state.tagsViewList.forEach((v: RouteItem) => {
    v.transUrl = transUrlParams(v)
    if (v.transUrl) {
      // 动态路由、普通路由带参数
      if (v.transUrl === transUrlParams(v) && v.transUrl === item.commonUrl)
        resItem = v
    } else {
      // 路由不带参数
      if (v.path === decodeURI(item.path)) resItem = v
    }
  })
  if (!resItem) return null
  else return resItem
}

// 获取 tagsView 的下标：用于处理 tagsView 点击时的横向滚动
// const getTagsRefsIndex = (path: string | unknown) => {
//   nextTick(async () => {
//     // await 使用该写法，防止拿取不到 tagsViewList 列表数据不完整
//     let tagsViewList = await state.tagsViewList
//     state.tagsRefsIndex = tagsViewList.findIndex((v: RouteItem) => {
//       return v.url === path
//     })
//     // 添加初始化横向滚动条移动到对应位置
//     // tagsViewmoveToCurrentTag()
//   })
// }

// 处理 url，地址栏链接有参数时，tagsview 右键菜单刷新功能失效问题
const transUrlParams = (v: RouteItem) => {
  let params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params
  if (!params) return ''
  let path = ''
  for (let [key, value] of Object.entries(params)) {
    if (v.meta?.isDynamic) path += `/${value}`
    else path += `&${key}=${value}`
  }
  // 判断是否是动态路由（xxx/:id/:name"）isDynamic
  if (v.meta?.isDynamic) {
    /**
     *
     * isFnClick 用于判断是通过方法调用，还是直接右键菜单点击（此处只针对动态路由）
     * 原因：
     * 1、右键菜单点击时，路由的 path 还是原始定义的路由格式，如：/params/dynamic/details/:t/:id/:tagsViewName
     * 2、通过事件调用时，路由的 path 不是原始定义的路由格式，如：/params/dynamic/details/fz-design-admin/111/我是动态路由测试tagsViewName
     *
     * 所以右侧菜单点击时，需要处理路径拼接 v.path.split(':')[0]，得到路径 + 参数的完整路径
     */
    return v.isFnClick
      ? decodeURI(v.path)
      : `${v.path.split(':')[0]}${path.replace(/^\//, '')}`
  } else {
    return `${v.path}${path.replace(/^&/, '?')}`
  }
}

// 2、刷新当前 tagsView：
const refreshCurrentTagsView = async (fullPath: string) => {
  const decodeURIPath = decodeURI(fullPath)
  let item: RouteToFrom = {}
  state.tagsViewList.forEach((v: RouteItem) => {
    v.transUrl = transUrlParams(v)
    if (v.transUrl) {
      if (v.transUrl === transUrlParams(v)) item = v
    } else {
      if (v.path === decodeURIPath) item = v
    }
  })
  if (!item) return false
  await storesKeepALiveNames.delCachedView(item)
  emitter.emit('onTagsViewRefreshRouterView', fullPath)
  if (item.meta?.isKeepAlive) storesKeepALiveNames.addCachedView(item)
}
// 3、关闭当前 tagsView
const closeCurrentTagsView = (path: string) => {
  state.tagsViewList.map((v: any, k: number, arr: any) => {
    if (v.path === path) {
      storesKeepALiveNames.delCachedView(v)
      state.tagsViewList.splice(k, 1)
      setTimeout(() => {
        if (
          state.tagsViewList.length === k
            ? state.routePath === path
            : state.routeActive === path
        ) {
          // 最后一个且高亮时
          if (arr[arr.length - 1].meta.isDynamic) {
            // 动态路由（xxx/:id/:name"）
            if (k !== arr.length)
              router.push({ name: arr[k].name, params: arr[k].params })
            else
              router.push({
                name: arr[arr.length - 1].name,
                params: arr[arr.length - 1].params
              })
          } else {
            // 普通路由
            if (k !== arr.length)
              router.push({ path: arr[k].path, query: arr[k].query })
            else
              router.push({
                path: arr[arr.length - 1].path,
                query: arr[arr.length - 1].query
              })
          }
        } else {
          // 非最后一个且高亮时，跳转到下一个
          if (
            state.tagsViewList.length !== k
              ? state.routePath === path
              : state.routeActive === path
          ) {
            if (arr[k].meta.isDynamic) {
              // 动态路由（xxx/:id/:name"）
              router.push({ name: arr[k].name, params: arr[k].params })
            } else {
              // 普通路由
              router.push({ path: arr[k].path, query: arr[k].query })
            }
          }
        }
      }, 0)
    }
  })

  addBrowserSetSession(state.tagsViewList)
}

// 关闭其他
const closeOthersTagsView = (path: string) => {
  state.tagsViewList = state.tagsViewList.filter((item, index) => {
    if (item.path === path || index === 0) {
      storesKeepALiveNames.delOthersCachedViews(item)

      return item
    }
  })

  addBrowserSetSession(state.tagsViewList)
}

// 关闭全部
const closeAllTagsView = () => {
  state.tagsViewList = state.tagsViewList.filter((_, index) => index === 0)
  router.push(state.tagsViewList[0].path)
  addBrowserSetSession(state.tagsViewList)
}

// 开启当前页全屏
const openCurrenFullscreen = async (path: string): any => {
  const item = state.tagsViewList.find((v: any) => v.path === path) as RouteItem

  if (item.meta.isDynamic) {
    await router.push({ name: item.name, params: item.params })
  } else {
    await router.push({ name: item.name, query: item.query })
  }

  tagsViewStore.setCurrenFullscreen(true)
}

const handleAction = async (target: { type: TEaction; index: number }) => {
  const currentRoute = state.tagsViewList[target.index]
  currentRoute.commonUrl = transUrlParams(currentRoute)
  if (!getCurrentRouteItem(currentRoute))
    return Message.warning('请正确输入路径及完整参数（query、params）')

  const { path, name, params, query, meta } = getCurrentRouteItem(currentRoute)

  switch (target.type) {
    // 刷新当前
    case Eaction.reload:
      if (meta.isDynamic) await router.push({ name, params })
      else await router.push({ path, query })
      refreshCurrentTagsView(route.fullPath)
      break
    // 关闭当前
    case Eaction.current:
      await closeCurrentTagsView(path)
      break
    // 关闭其他
    case Eaction.others:
      await closeOthersTagsView(path)
      break
    case Eaction.all:
      await closeAllTagsView()
      break
    case Eaction.screenFull:
      await openCurrenFullscreen(path)
  }
}

const tagOnClick = (item: RouteItem) => {
  const { name, path } = item
  if (name) {
    if (item.query) {
      router.push({
        name,
        query: item.query
      })
    } else if (item.params) {
      router.push({
        name,
        params: item.params
      })
    } else {
      router.push({ name })
    }
  } else {
    router.push({ path })
  }

  state.routeActive = path
}

// 处理单标签时，第二次的值未覆盖第一次的 tagsViewList 值（Session Storage）
const singleAddTagsView = (path: string, to?: RouteToFrom) => {
  let isDynamicPath = to?.meta?.isDynamic ? to.meta.isDynamicPath : path
  state.tagsViewList.forEach((v) => {
    if (
      v.path === isDynamicPath &&
      !isObjectValueEqual(
        to?.meta?.isDynamic
          ? v.params
            ? v.params
            : null
          : v.query
          ? v.query
          : null,
        to?.meta?.isDynamic
          ? to?.params
            ? to?.params
            : null
          : to?.query
          ? to?.query
          : null
      )
    ) {
      to?.meta?.isDynamic ? (v.params = to.params) : (v.query = to?.query)
      v.url = setTagsViewHighlight(v)
      addBrowserSetSession(state.tagsViewList)
    }
  })
}

// 1、添加 tagsView：未设置隐藏（isHide）也添加到在 tagsView 中（可开启多标签详情，单标签详情）
const addTagsView = (path: string, to?: RouteToFrom) => {
  // 防止拿取不到路由信息
  nextTick(async () => {
    let item: any
    if (to?.meta?.isDynamic) {
      // 动态路由（xxx/:id/:name"）：参数不同，开启多个 tagsview
      await singleAddTagsView(path, to)
      if (
        state.tagsViewList.some(
          (v: RouteItem) => v.path === to?.meta?.isDynamicPath
        )
      ) {
        // 防止首次进入界面时(登录进入) tagsViewList 不存浏览器中
        addBrowserSetSession(state.tagsViewList)
        return false
      }
      item = state.tagsViewRoutesList.find(
        (v: RouteItem) => v.path === to?.meta?.isDynamicPath
      )
    } else {
      // 普通路由：参数不同，开启多个 tagsview
      await singleAddTagsView(path, to)
      if (state.tagsViewList.some((v: RouteItem) => v.path === path)) {
        // 防止首次进入界面时(登录进入) tagsViewList 不存浏览器中
        addBrowserSetSession(state.tagsViewList)
        return false
      }
      item = state.tagsViewRoutesList.find((v: RouteItem) => v.path === path)
    }
    if (!item) return false
    if (item?.meta?.isLink && !item.meta.isIframe) return false
    if (to?.meta?.isDynamic)
      item.params = to?.params ? to?.params : route.params
    else item.query = to?.query ? to?.query : route.query
    item.url = setTagsViewHighlight(item)
    await storesKeepALiveNames.addCachedView(item)
    await state.tagsViewList.push({ ...item })
    await addBrowserSetSession(state.tagsViewList)
  })
}

onBeforeRouteUpdate(async (to) => {
  state.routeActive = setTagsViewHighlight(to)
  state.routePath = (
    to.meta.isDynamic ? to.meta.isDynamicPath : to.path
  ) as string

  await addTagsView(to.path, to as any)
})

onMounted(() => {
  getTagsViewRoutes()
})

// 监听路由的变化，动态赋值给 tagsView
watch(
  pinia.state,
  (val) => {
    if (
      val.tagsViewRoutes.tagsViewRoutes.length ===
      state.tagsViewRoutesList.length
    )
      return false
    getTagsViewRoutes()
  },
  {
    deep: true
  }
)
</script>

<style scoped lang="less">
.layout-navbars-tagsview {
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 12px;
  box-sizing: border-box;
  background-color: var(--color-bg-2);
  box-shadow: 0 0 1px #888;

  .tag-item {
    cursor: pointer;
    color: var(--color-text-2);
    &:hover:not(.is-active) {
      color: rgb(var(--primary-7));
    }
  }

  .is-active {
    color: #fff;
    background-color: rgb(var(--primary-6));
  }

  :deep .arco-tag .arco-icon-hover.arco-tag-icon-hover:hover::before {
    border-radius: 50px;
    background-color: var(--color-primary-light-3);
  }

  :deep .arco-tag .arco-icon-hover.arco-tag-icon-hover::before {
    border-radius: 50px;
  }
}
</style>
