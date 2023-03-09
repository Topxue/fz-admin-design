<template>
  <a-layout-header class="layout-header" v-show="!isTagsViewCurrenFull">
    <div class="layout-header__optional">
      <slot></slot>
      <NavbarIndex />
    </div>
    <TagsView v-if="isTagsView" />
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

// 是否显示TagsView
const isTagsView = computed(() => appConfig.value.isTagsview)
</script>

<style scoped lang="less">
@import '@/style/variable.less';

.layout-header {
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
