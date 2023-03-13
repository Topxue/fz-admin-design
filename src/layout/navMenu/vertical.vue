<template>
  <a-menu
    class="menu-wrapper"
    @menu-item-click="handleMenuItemClick"
    :selected-keys="[defaultActive]"
    accordion
  >
    <template v-for="route in menuLists">
      <a-sub-menu
        :key="route.path"
        v-if="route.children && route.children.length > 0"
      >
        <template #icon>
          <icon-font :icon="route.meta.icon" />
        </template>
        <template #title>{{ route.meta.title }}</template>
        <MenuItem :chil="route.children" />
      </a-sub-menu>

      <template v-else>
        <a-menu-item :key="route.path">
          <template #icon>
            <icon-font :icon="route.meta.icon" />
          </template>
          <template
            v-if="
              !route.meta.linkUrl || (route.meta.linkUrl && route.meta.iframe)
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
import { storeToRefs } from 'pinia'
import { ref, computed, defineAsyncComponent } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { setParentHighlight } from './utils'
import { useTagsViewRoutes } from '@/stores'
import { verifyUrl } from '@/utils/validate'

const MenuItem = defineAsyncComponent(
  () => import('@/layout/navMenu/menuItem.vue')
)

const route = useRoute()
const router = useRouter()

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes)

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
  const routeItem = tagsViewRoutes.value.find((item) => item.path === path)

  if (routeItem.meta.linkUrl && !routeItem.meta.iframe) {
    onALinkClick(routeItem)
  } else {
    router.push(path)
  }
}

const onALinkClick = (val: RouteItem) => {
  const { origin, pathname } = window.location
  // router.push(val.path)

  if (val.meta?.link && verifyUrl(<string>val.meta?.linkUrl))
    window.open(val.meta?.linkUrl)
  else window.open(`${origin}${pathname}#${val.meta?.linkUrl}`)
}

// 路由更新时
onBeforeRouteUpdate((to) => {
  defaultActive.value = setParentHighlight(to as any)
})
</script>

<style scoped lang="less">
.menu-wrapper {
  height: calc(100vh - 100px);
}
</style>
