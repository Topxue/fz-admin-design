<template>
  <a-layout class="layout">
    <LayoutHeader />
    <a-layout>
      <LayoutAside />
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const LayoutHeader = defineAsyncComponent(
  () => import('@/layout/components/classic-header.vue')
)
const LayoutAside = defineAsyncComponent(
  () => import('@/layout/components/classic-sider.vue')
)
const LayoutContent = defineAsyncComponent(
  () => import('@/layout/components/main.vue')
)
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg-1);
}
</style>
