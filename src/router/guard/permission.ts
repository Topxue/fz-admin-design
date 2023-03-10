import NProgress from '@/utils/progress'

import { storeToRefs } from 'pinia'
import type { Router } from 'vue-router'

import { initBackEndControlRoutes } from './backEnd'
import pinia, { useRoutesList, useUserStore } from '@/stores'

/** 路由白名单 */
const whiteList = ['/login']

export default function setupPermissionGuard(router: Router) {
  // 路由加载前
  router.beforeEach(async (to, from, next) => {
    if (to.meta.title) NProgress.start()
    const token = useUserStore(pinia).getToken

    if (whiteList.includes(to.path) && !token) {
      next()
      NProgress.done()
    } else {
      if (!token) {
        next(
          `/login?redirect=${to.path}&params=${JSON.stringify(
            to.query ? to.query : to.params
          )}`
        )
        useUserStore().resetInfo()
        NProgress.done()
      } else if (token && whiteList.includes(to.path)) {
        next('/home')
      } else {
        const storesRoutesList = useRoutesList(pinia)
        const { routesList } = storeToRefs(storesRoutesList)

        if (routesList.value.length === 0) {
          // 后端控制路由：路由数据初始化，防止刷新时丢失
          await initBackEndControlRoutes()
          // 解决刷新时，一直跳 404 页面问题，关联问题 No match found for location with path 'xxx'
          // to.query 防止页面刷新时，普通路由带参数时，参数丢失。动态路由（xxx/:id/:name"）isDynamic 无需处理
          next({ path: to.path, query: to.query })
        } else {
          next()
        }
      }
    }
  })

  // 路由加载后
  router.afterEach(() => {
    NProgress.done()
  })
}
