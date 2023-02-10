<template>
  <a-menu
    class="menu-wrapper"
    @menu-item-click="handleMenuItemClick"
    :selected-keys="[defaultActive]"
  >
    <template v-for="route in menuLists">
      <a-sub-menu
        :key="route.path"
        v-if="route.children && route.children.length > 0"
      >
        <template #icon><icon-apps></icon-apps></template>
        <template #title>{{ route.meta.title }}</template>
        <MenuItem :chil="route.children" />
      </a-sub-menu>

      <template v-else>
        <a-menu-item :key="route.path">
          <template #icon><icon-bug></icon-bug></template>
          <template
            v-if="
              !route.meta.isLink || (route.meta.isLink && route.meta.isIframe)
            "
          >
            <span>{{ route.meta.title }}</span>
          </template>
          <template v-else>
            <a>
              {{ route.meta.title }}
            </a>
          </template>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const MenuItem = defineAsyncComponent(
  () => import('@/layout/navMenu/menuItem.vue')
)

const route = useRoute()
const router = useRouter()

// 定义父组件传过来的值
const props = withDefaults(
  defineProps<{
    menuList: Array<RouteRecordRaw>
  }>(),
  {
    menuList: () => []
  }
)

const defaultActive = ref(
  route.meta.isDynamic ? route.meta.isDynamicPath : route.path
)

// 获取父级菜单数据
const menuLists = computed(() => {
  return <RouteItems>props.menuList
})

const handleMenuItemClick = (path: string) => {
  router.push(path)
}

// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute: RouteToFrom) => {
  const { path, meta } = currentRoute
  const pathSplit = meta?.isDynamic
    ? meta.isDynamicPath!.split('/')
    : path!.split('/')
  if (pathSplit.length >= 4 && meta?.isHide)
    return pathSplit.splice(0, 3).join('/')
  else return path
}

// 路由更新时
onBeforeRouteUpdate((to) => {
  defaultActive.value = setParentHighlight(to)
})
</script>

<style scoped lang="less">
.menu-wrapper {
  height: calc(100vh - 100px);
}
</style>
