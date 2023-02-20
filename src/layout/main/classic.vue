<template>
  <a-layout class="layout">
    <LayoutHeader>
      <div class="classic-logo">
        <Logo v-if="appConfig.isShowLogo" />
      </div>
    </LayoutHeader>
    <a-layout>
      <LayoutAside />
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores'

const LayoutAside = defineAsyncComponent(
  () => import('@/layout/components/sider.vue')
)
const LayoutHeader = defineAsyncComponent(
  () => import('@/layout/components/header.vue')
)
const LayoutContent = defineAsyncComponent(
  () => import('@/layout/components/main.vue')
)

const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'))

const { appConfig } = storeToRefs(useAppStore())
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  background: var(--color-bg-1);
  :deep .classic-logo {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 20px;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
