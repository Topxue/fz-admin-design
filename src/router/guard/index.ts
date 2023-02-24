import type { Router } from 'vue-router'
import setupPermissionGuard from './permission'
import { setRouteEmitter } from '@/utils/route-listener'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    setRouteEmitter(to)
  })
}

export default function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupPermissionGuard(router)
}
