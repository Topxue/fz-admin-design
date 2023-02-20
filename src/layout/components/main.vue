<template>
  <a-layout class="layout-content">
    <div
      class="layout-navbars-close-full-icon"
      v-show="isTagsViewCurrenFull"
      @click="closeCurrentFull"
    >
      <icon-close class="close-icon" />
    </div>
    <a-layout-content>
      <LayoutParentView />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent } from 'vue'

import { useTagsViewRoutes, useAppStore } from '@/stores'

const storesTagsViewRoutes = useTagsViewRoutes()

const { appConfig } = storeToRefs(useAppStore())
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)

const marginTop = computed(() =>
  isTagsViewCurrenFull.value
    ? 0
    : appConfig.value.isTagsview
    ? `${54 + 38}px`
    : '54px'
)

const LayoutParentView = defineAsyncComponent(
  () => import('@/layout/routerView/parent.vue')
)

const closeCurrentFull = () => {
  storesTagsViewRoutes.setCurrenFullscreen(false)
}
</script>

<style scoped lang="less">
.layout-content {
  padding: 0;
  margin-top: v-bind(marginTop);
  height: 100%;
  overflow: hidden;

  .layout-navbars-close-full-icon {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: fixed;
    right: -28px;
    top: -28px;
    z-index: 10;
    cursor: pointer;

    .close-icon {
      position: absolute;
      left: 13px;
      top: 35px;
      color: #333;
      transition: all 0.3s ease;
    }
  }
}
</style>
