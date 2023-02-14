<template>
  <a-layout-header class="layout-header" v-show="!isTagsViewCurrenFull">
    <NavbarIndex />
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore, useTagsViewRoutes } from '@/stores'

const NavbarIndex = defineAsyncComponent(
  () => import('@/layout/navBars/index.vue')
)

const store = useAppStore()
const { appConfig } = storeToRefs(store)

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)

const menuWidth = computed(() => {
  const isCollapse = appConfig.value.isCollapse
  const calcWidth = isCollapse
    ? appConfig.value.collapsedWidth
    : appConfig.value.menuWidth

  return calcWidth + 'px'
})
</script>

<style scoped lang="less">
@import '@/assets/style/variable.less';

.layout-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  transition: width 0.1s ease;
  width: calc(100% - v-bind(menuWidth));
  height: @layoutHeader;
  padding: 0 10px 0 0;
  background: var(--color-bg-3);
  border-bottom: 1px solid var(--color-neutral-3);
}
</style>
