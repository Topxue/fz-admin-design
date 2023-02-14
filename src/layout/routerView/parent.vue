<template>
  <div class="layout-parent">
    <router-view v-slot="{ Component }">
      <transition :name="setTransitionName" mode="out-in">
        <keep-alive :include="getKeepAliveNames">
          <component
            :is="Component"
            :key="state.refreshRouterViewKey"
            v-show="!isIframePage"
          />
        </keep-alive>
      </transition>
    </router-view>
    <transition :name="setTransitionName" mode="out-in">
      <Iframes
        class="w100"
        v-show="isIframePage"
        :refreshKey="state.iframeRefreshKey"
        :name="setTransitionName"
        :list="state.iframeList"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  computed,
  nextTick,
  onMounted,
  onBeforeMount,
  defineAsyncComponent,
  onUnmounted
} from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import router from '@/router'
import { emitter } from '@/utils/route-listener'
import { useAppStore, useKeepALiveNames } from '@/stores'

// 引入组件
const Iframes = defineAsyncComponent(
  () => import('@/layout/routerView/iframes.vue')
)

const route = useRoute()
const appStore = useAppStore()

const storesKeepAliveNames = useKeepALiveNames()

const { appConfig } = storeToRefs(appStore)
const { keepAliveNames, cachedViews } = storeToRefs(storesKeepAliveNames)

const state = reactive<ParentViewState>({
  refreshRouterViewKey: '', // 非 iframe tagsview 右键菜单刷新时
  iframeRefreshKey: '', // iframe tagsview 右键菜单刷新时
  keepAliveNameList: [],
  iframeList: []
})

// 设置主界面切换动画
const setTransitionName = computed(() => {
  console.log(appConfig.value.animation)
  return appConfig.value.animation
})

// 设置 iframe 显示/隐藏
const isIframePage = computed(() => {
  return route.meta.isIframe
})

// 页面加载前，处理缓存，页面刷新时路由缓存处理
onBeforeMount(() => {
  state.keepAliveNameList = keepAliveNames.value
  emitter.on('onTagsViewRefreshRouterView', (fullPath: string) => {
    state.keepAliveNameList = keepAliveNames.value.filter(
      (name: string) => route.name !== name
    )
    state.refreshRouterViewKey = ''
    state.iframeRefreshKey = ''
    nextTick(() => {
      state.refreshRouterViewKey = fullPath
      state.iframeRefreshKey = fullPath
      state.keepAliveNameList = keepAliveNames.value
    })
  })
})

// 获取组件缓存列表(name值)
const getKeepAliveNames = computed(() => {
  console.log(
    appConfig.value.isTagsview ? cachedViews.value : state.keepAliveNameList
  )

  return appConfig.value.isTagsview
    ? cachedViews.value
    : state.keepAliveNameList
})

// 获取 iframe 组件列表(未进行渲染)
const getIframeListRoutes = async () => {
  router.getRoutes().forEach((v) => {
    if (v.meta.isIframe) {
      v.meta.isIframeOpen = false
      v.meta.loading = true
      state.iframeList.push({ ...v })
    }
  })
}

// 页面加载时
onMounted(() => {
  getIframeListRoutes()
  // nextTick(() => {
  //   setTimeout(() => {
  //     if (appConfig.value.isCacheTagsView) {
  //       let tagsViewArr: RouteItem[] = Session.get('tagsViewList') || []
  //       cachedViews.value = tagsViewArr
  //         .filter((item) => item.meta?.isKeepAlive)
  //         .map((item) => item.name as string)
  //     }
  //   }, 0)
  // })
})

// 页面卸载时
onUnmounted(() => {
  emitter.off('onTagsViewRefreshRouterView')
})
</script>

<style scoped lang="less">
.layout-parent {
  height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
