<template>
  <a-layout class="layout-content">
    <!-- <a-breadcrumb :style="{ margin: '0 0 20px 0' }">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>List</a-breadcrumb-item>
      <a-breadcrumb-item>App</a-breadcrumb-item>
    </a-breadcrumb> -->

    <a-layout-content>
      <LayoutParentView />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const LayoutParentView = defineAsyncComponent(
  () => import('@/layout/routerView/parent.vue')
)
</script>

<style scoped lang="less">
.layout-content {
  padding: 0;
  margin-top: 55px;
}
</style>
