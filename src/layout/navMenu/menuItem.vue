<template>
  <template v-for="routeItem in chils">
    <a-sub-menu
      :key="routeItem.path"
      v-if="routeItem.children && routeItem.children.length > 0"
    >
      <template #title>
        <span>{{ routeItem.meta.title }}</span>
      </template>
      <menu-item :chil="routeItem.children" />
    </a-sub-menu>
    <template v-else>
      <a-menu-item :key="routeItem.path">
        <!-- <template #icon v-if="routeItem.meta.icon">
          <icon-font :icon="routeItem.meta.icon" />
        </template> -->
        <template
          v-if="
            !routeItem.meta.isLink ||
            (routeItem.meta.isLink && routeItem.meta.isIframe)
          "
        >
          <span>{{ routeItem.meta.title }}</span>
        </template>
        <!-- <template v-else>
          <a class="w100" @click.prevent="onALinkClick(routeItem)">
            {{ routeItem.meta.title }}
          </a>
        </template> -->
      </a-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts" name="navMenuItem">
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'

// 定义父组件传过来的值
const props = defineProps({
  // 菜单列表
  chil: {
    type: Array<RouteRecordRaw>,
    default: () => []
  }
})

// 获取父级菜单数据
const chils = computed(() => {
  return <RouteItems>props.chil
})

// 打开外部链接
// const onALinkClick = (routeItem: RouteItem) => {
//   const { origin, pathname } = window.location
//   router.push(val.path)
//   if (verifyUrl(<string>val.meta?.isLink)) window.open(val.meta?.isLink)
//   else window.open(`${origin}${pathname}#${val.meta?.isLink}`)
// }
</script>
