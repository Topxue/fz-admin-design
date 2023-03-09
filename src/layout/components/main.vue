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
import { defineAsyncComponent } from 'vue'

import { useTagsViewRoutes } from '@/stores'

const storesTagsViewRoutes = useTagsViewRoutes()

const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)

const LayoutParentView = defineAsyncComponent(
  () => import('@/layout/routerView/parent.vue')
)

const closeCurrentFull = () => {
  storesTagsViewRoutes.setCurrenFullscreen(false)
}
</script>

<style scoped lang="less">
.layout-content {
  height: calc(100vh - 85px);
  overflow-x: hidden;
  // overflow: auto;
  // padding: 0;

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
      &:hover {
        color: rgb(var(--primary-6));
      }
    }
  }
}
</style>
