<template>
  <a-layout class="layout">
    <a-layout>
      <LayoutHeader>
        <div class="horizontal-menu">
          <HorizontalMenu :menu-list="menuList" />
        </div>
      </LayoutHeader>
      <LayoutContent />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from 'vue'
import useMenuList from '@/hooks/useMenuList'

const LayoutHeader = defineAsyncComponent(
  () => import('@/layout/components/header.vue')
)
const LayoutContent = defineAsyncComponent(
  () => import('@/layout/components/main.vue')
)
const HorizontalMenu = defineAsyncComponent(
  () => import('@/layout/navMenu/horizontal.vue')
)

const menuList = ref<RouteItem[] | any>([])

onBeforeMount(() => {
  menuList.value = useMenuList()
})
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  background: var(--color-bg-1);

  .horizontal-menu {
    flex: 1;
    margin-right: 100px;
  }
}
</style>
