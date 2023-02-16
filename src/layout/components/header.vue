<template>
  <a-layout-header class="layout-header" v-show="!isTagsViewCurrenFull">
    <div class="layout-header__optional">
      <slot></slot>
      <NavbarIndex />
    </div>
    <TagsView />
  </a-layout-header>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore, useTagsViewRoutes } from '@/stores'

const NavbarIndex = defineAsyncComponent(
  () => import('@/layout/navBars/index.vue')
)
const TagsView = defineAsyncComponent(
  () => import('@/layout/tagsView/index.vue')
)

const store = useAppStore()
const { appConfig } = storeToRefs(store)

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)

// 是否为顶部模式
const isHorizontal = computed(() => appConfig.value.layout === 'horizontal')

const menuWidth = computed(() => {
  const isCollapse = appConfig.value.isCollapse

  // 顶部模式占满width 100%
  if (isHorizontal.value) return '0px'

  const calcWidth = isCollapse
    ? appConfig.value.collapsedWidth
    : appConfig.value.menuWidth

  return calcWidth + 'px'
})
</script>

<style scoped lang="less">
@import '@/assets/style/variable.less';

.layout-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  transition: width 0.1s ease;
  width: calc(100% - v-bind(menuWidth));
  background: var(--color-bg-2);

  &__optional {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: @layoutHeader;
    padding-right: 10px;
    box-sizing: border-box;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
</style>
