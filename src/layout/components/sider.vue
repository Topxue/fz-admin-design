<template>
  <a-layout-sider
    collapsible
    breakpoint="xl"
    @collapse="onCollapse"
    :width="appConfig.menuWidth"
    :collapsed-width="appConfig.collapsedWidth"
  >
    <Logo v-if="appConfig.isShowLogo" />

    <VerticalMenu :menuList="menuList" />
    <template #trigger="{ collapsed }">
      <div class="collapse-button arco-menu-collapse-button">
        <icon-menu-unfold v-if="collapsed" />
        <icon-menu-fold v-else />
      </div>
    </template>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'

import type { RouteItem } from '@/types/global'
import { useRoutesList, useAppStore } from '@/stores'

const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'))
const VerticalMenu = defineAsyncComponent(
  () => import('@/layout/navMenu/vertical.vue')
)

const store = useRoutesList()
const appStore = useAppStore()
const { routesList } = storeToRefs(store)
const { appConfig } = storeToRefs(appStore)

const menuList = ref<RouteItem[] | any>([])

// 设置/过滤路由（非静态路由/是否显示在菜单中）
const setFilterRoutes = () => {
  menuList.value = filterRoutesFun(routesList.value)
}

// 路由过滤递归函数
const filterRoutesFun = <T extends RouteItem>(arr: T[]): T[] => {
  return arr
    .filter((item: T) => !item.meta?.isHide)
    .map((item: T) => {
      item = Object.assign({}, item)
      if (item.children) item.children = filterRoutesFun(item.children)
      return item
    })
}

const onCollapse = (state: boolean) => {
  const DELAY_COUNT = state ? 0 : 100

  setTimeout(() => {
    appStore.updateSettings({
      appConfig: {
        isCollapse: state
      }
    })
  }, DELAY_COUNT)
}

onBeforeMount(() => {
  setFilterRoutes()
})
</script>

<style scoped lang="less">
.collapse-button {
  color: var(--color-text-3);
  background-color: var(--color-fill-1);
  &:hover {
    background-color: var(--color-fill-3);
  }
}
</style>
