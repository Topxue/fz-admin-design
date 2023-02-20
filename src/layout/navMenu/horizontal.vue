<template>
  <a-menu
    class="menu-wrapper"
    mode="horizontal"
    @menu-item-click="handleMenuItemClick"
    :selected-keys="[defaultActive]"
  >
    <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
      <Logo class="horizontal-ment-logo" v-if="appConfig.isShowLogo" />
    </a-menu-item>
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
import {
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
  RouteRecordRaw
} from 'vue-router'
import { useAppStore } from '@/stores'
import { setParentHighlight } from './utils'
import { storeToRefs } from 'pinia'

const Logo = defineAsyncComponent(() => import('@/layout/logo/index.vue'))
const MenuItem = defineAsyncComponent(
  () => import('@/layout/navMenu/menuItem.vue')
)

const route = useRoute()
const router = useRouter()
const { appConfig } = storeToRefs(useAppStore())

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

// 路由更新时
onBeforeRouteUpdate((to) => {
  defaultActive.value = setParentHighlight(to as any)
})
</script>

<style scoped lang="less">
:deep .horizontal-ment-logo {
  img {
    width: 30px;
    height: 30px;
  }
  span {
    color: var(--color-text-1);
  }
}
</style>
