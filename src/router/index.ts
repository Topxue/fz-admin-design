import { createRouter, createWebHistory } from 'vue-router'

import createRouteGuard from './guard'
import { staticRoutes, notFoundAndNoPower } from './routers'

const router = createRouter({
  history: createWebHistory('/'),
  /**
   * 说明：
   * 1、notFoundAndNoPower 默认添加 404、401 界面，防止一直提示 No match found for location with path 'xxx'
   * 2、backEnd.ts(后端控制路由)、frontEnd.ts(前端控制路由) 中也需要加 notFoundAndNoPower 404、401 界面。
   *    防止 404、401 不在 layout 布局中，不设置的话，404、401 界面将全屏显示
   */
  routes: [...notFoundAndNoPower, ...staticRoutes],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

createRouteGuard(router)

export default router
