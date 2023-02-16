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
import { ref, defineAsyncComponent, onBeforeMount } from 'vue'
import { useAppStore, useTagsViewRoutes } from '@/stores'

import useMenuList from '@/hooks/useMenuList'

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)

const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'))
const VerticalMenu = defineAsyncComponent(
  () => import('@/layout/navMenu/vertical.vue')
)

const appStore = useAppStore()
const { appConfig } = storeToRefs(appStore)

const menuList = ref<RouteItem[] | any>([])

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
  menuList.value = useMenuList()
})
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
