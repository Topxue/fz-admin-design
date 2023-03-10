<template>
  <a-layout class="layout">
    <LayoutHeader>
      <div class="horizontal-menu">
        <HorizontalMenu :menu-list="menuList" />
      </div>
    </LayoutHeader>
    <LayoutContent />
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeMount, defineAsyncComponent } from 'vue'
import useMenuList from '@/hooks/useMenuList'
import { useRoutesList } from '@/stores'
import { storeToRefs } from 'pinia'

const useRouteStore = useRoutesList()
const { routesList } = storeToRefs(useRouteStore)

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

// 监听路由数据变化
watch(
  () => routesList.value,
  () => {
    menuList.value = useMenuList()
  }
)
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  background: var(--color-bg-1);

  .horizontal-menu {
    flex: 1;
    margin-right: 100px;
    height: 54px;
    display: flex;
    align-items: center;
    overflow-y: hidden;
  }
}
</style>
