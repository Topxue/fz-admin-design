<template>
  <a-layout-sider
    collapsible
    breakpoint="xl"
    @collapse="onCollapse"
    :width="appConfig.menuWidth"
    :collapsed-width="appConfig.collapsedWidth"
    class="sider-wrapper"
    v-show="!isTagsViewCurrenFull"
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
import { storeToRefs } from 'pinia'
import { ref, defineAsyncComponent, onBeforeMount, watch } from 'vue'

import useMenuList from '@/hooks/useMenuList'
import { useAppStore, useRoutesList, useTagsViewRoutes } from '@/stores'

// 定义变量内容
const useRouteStore = useRoutesList()
const storesTagsViewRoutes = useTagsViewRoutes()

const { routesList } = storeToRefs(useRouteStore)
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)

const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'))
const VerticalMenu = defineAsyncComponent(
  () => import('@/layout/navMenu/vertical.vue')
)

const appStore = useAppStore()
const { appConfig } = storeToRefs(appStore)

const menuList = ref<RouteItem[] | any>([])

const onCollapse = (state: boolean) => {
  appStore.updateSettings({
    appConfig: {
      isCollapse: state
    }
  })
}

onBeforeMount(() => {
  menuList.value = useMenuList()
})

// 监听路由数据变化
watch(
  () => routesList.value,
  () => {
    menuList.value = useMenuList()
  }
)
</script>

<style scoped lang="less">
.sider-wrapper {
  box-shadow: 0 0 1px #888;
  position: relative;
  z-index: 100;
  .collapse-button {
    color: var(--color-text-3);
    background-color: var(--color-fill-1);
    &:hover {
      background-color: var(--color-fill-3);
    }
  }
}
</style>
