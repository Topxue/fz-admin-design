import { RouteRecordRaw } from 'vue-router'
import Layout from '../layout/index.vue'

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      isKeepAlive: true
    },
    children: []
  }
]

/**
 * 定义404、401界面
 */
export const notFoundAndNoPower = [
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
      isHide: true
    }
  },
  {
    path: '/403',
    name: 'noAuth',
    component: () => import('@/views/error/403.vue'),
    meta: {
      title: '403',
      isHide: true
    }
  },
  {
    path: '/500',
    name: 'noPower',
    component: () => import('@/views/error/500.vue'),
    meta: {
      title: '500',
      isHide: true
    }
  }
]

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，
 * 会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]
