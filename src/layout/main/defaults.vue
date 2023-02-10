<template>
  <a-layout class="layout">
    <LayoutAside />
    <a-layout>
      <LayoutHeader />
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const LayoutAside = defineAsyncComponent(
  () => import('@/layout/components/sider.vue')
)
const LayoutHeader = defineAsyncComponent(
  () => import('@/layout/components/header.vue')
)
const LayoutContent = defineAsyncComponent(
  () => import('@/layout/components/main.vue')
)
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  background: var(--color-bg-1);
}
</style>
