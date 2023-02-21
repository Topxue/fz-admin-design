<template>
  <div class="layout-navbars-tagsview">
    <a-space>
      <TagItem
        class="tag-item"
        v-for="(item, index) in state.tagsList"
        :key="item.path"
        :index="index"
        :tag-data="item"
        @eaction="handleAction"
      >
        <a-tag
          class="tag-item"
          :class="{ 'is-active': isActive(item) }"
          :closable="item.path !== '/home' && isActive(item)"
          @click="tagOnClick(item)"
          @close.stop="closeCurrentTagsView(item.path)"
        >
          {{ item.meta.title }}
        </a-tag>
      </TagItem>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, nextTick, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import router from '@/router'
import { Eaction, TEaction } from './types'
import { useTagsViewRoutes, useKeepALiveNames } from '@/stores'
import { isObjectValueEqual } from '@/utils'
import { Message } from '@arco-design/web-vue'
import { emitter } from '@/utils/route-listener'

const TagItem = defineAsyncComponent(() => import('./tag-item.vue'))

const tagsViewStore = useTagsViewRoutes()
const storesKeepALiveNames = useKeepALiveNames()

const { tagsViewList } = storeToRefs(tagsViewStore)

const route = useRoute()
const state = reactive<{
  routeActive: string
  routePath: string
  tagsList: Array<RouteItem>
}>({
  routeActive: '',
  routePath: '',
  tagsList: []
})

// 获取 store 中的 tagsList 列表
const initTagsViewList = async () => {
  state.tagsList = []
  state.routeActive = await setTagsViewHighlight(route)
  state.routePath = (
    (await route.meta.isDynamic) ? route.meta.isDynamicPath : route.path
  ) as string

  state.tagsList = [...tagsViewList.value]

  await addTagsView(route.path, <RouteToFrom>route)
}

// 设置 tagsView 高亮
const isActive = (v: RouteItem) => {
  return v.path === state.routeActive
}

// 处理 tagsView 高亮（多标签详情时使用，单标签详情未使用）
const setTagsViewHighlight = (v: any) => {
  let params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params
  if (!params || Object.keys(params).length <= 0) return v.path
  let path = ''
  for (let i in params) {
    path += params[i]
  }
  // 判断是否是动态路由（xxx/:id/:name"）
  return `${v.meta.isDynamic ? v.meta.isDynamicPath : v.path}-${path}`
}

// 当前项右键菜单点击，拿当前点击的路由路径对比 浏览器缓存中的 tagsView 路由数组，取当前点击项的详细路由信息
// 防止 tagsView 非当前页演示时，操作异常
const getCurrentRouteItem = (path: string, cParams: any) => {
  const itemRoute = tagsViewList.value.length
    ? tagsViewList.value
    : state.tagsList

  // eslint-disable-next-line complexity
  return itemRoute.find((v: any) => {
    const params = v.meta.isDynamic
      ? v.params
        ? v.params
        : null
      : v.query
      ? v.query
      : null

    const isEqual = isObjectValueEqual(
      params,
      cParams && Object.keys(cParams ? cParams : {}).length > 0 ? cParams : null
    )

    if (v.path === path && isEqual) {
      return v
    } else if (
      v.path === path &&
      Object.keys(cParams ? cParams : {}).length <= 0
    ) {
      return v
    }
  })
}

// 更新tagView store
const updateTagsViewStore = () => {
  tagsViewStore.setTagsViewList(state.tagsList)
}

// 处理 url，地址栏链接有参数时，tagsview 右键菜单刷新功能失效问题
const transUrlParams = (v: RouteItem) => {
  let params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params
  if (!params) return ''
  let path = ''
  for (let [key, value] of Object.entries(params)) {
    if (v.meta?.isDynamic) path += `/${value}`
    else path += `&${key}=${value}`
  }
  // 判断是否是动态路由（xxx/:id/:name"）isDynamic
  if (v.meta?.isDynamic) {
    /**
     *
     * isFnClick 用于判断是通过方法调用，还是直接右键菜单点击（此处只针对动态路由）
     * 原因：
     * 1、右键菜单点击时，路由的 path 还是原始定义的路由格式，如：/params/dynamic/details/:t/:id/:tagsViewName
     * 2、通过事件调用时，路由的 path 不是原始定义的路由格式，如：/params/dynamic/details/fz-design-admin/111/我是动态路由测试tagsViewName
     *
     * 所以右侧菜单点击时，需要处理路径拼接 v.path.split(':')[0]，得到路径 + 参数的完整路径
     */
    return v.isFnClick
      ? decodeURI(v.path)
      : `${v.path.split(':')[0]}${path.replace(/^\//, '')}`
  } else {
    return `${v.path}${path.replace(/^&/, '?')}`
  }
}

// 2、刷新当前 tagsView：
const refreshCurrentTagsView = async (fullPath: string) => {
  const decodeURIPath = decodeURI(fullPath)
  let item: any = {}
  state.tagsList.forEach((v: RouteItem) => {
    v.transUrl = transUrlParams(v)
    if (v.transUrl) {
      if (v.transUrl === transUrlParams(v)) item = v
    } else {
      if (v.path === decodeURIPath) item = v
    }
  })
  if (!item) return false

  await storesKeepALiveNames.delCachedView(item)
  emitter.emit('onTagsViewRefreshRouterView', fullPath)
  if (item.meta?.isKeepAlive) storesKeepALiveNames.addCachedView(item)
}
// 3、关闭当前 tagsView
const closeCurrentTagsView = (path: string) => {
  state.tagsList.map((v: any, k: number, arr: any) => {
    if (v.path === path) {
      storesKeepALiveNames.delCachedView(v)
      state.tagsList.splice(k, 1)
      setTimeout(() => {
        if (
          state.tagsList.length === k
            ? state.routePath === path
            : state.routeActive === path
        ) {
          // 最后一个且高亮时
          if (arr[arr.length - 1].meta.isDynamic) {
            // 动态路由（xxx/:id/:name"）
            if (k !== arr.length)
              router.push({ name: arr[k].name, params: arr[k].params })
            else
              router.push({
                name: arr[arr.length - 1].name,
                params: arr[arr.length - 1].params
              })
          } else {
            // 普通路由
            if (k !== arr.length)
              router.push({ path: arr[k].path, query: arr[k].query })
            else
              router.push({
                path: arr[arr.length - 1].path,
                query: arr[arr.length - 1].query
              })
          }
        } else {
          // 非最后一个且高亮时，跳转到下一个
          if (
            state.tagsList.length !== k
              ? state.routePath === path
              : state.routeActive === path
          ) {
            if (arr[k].meta.isDynamic) {
              // 动态路由（xxx/:id/:name"）
              router.push({ name: arr[k].name, params: arr[k].params })
            } else {
              // 普通路由
              router.push({ path: arr[k].path, query: arr[k].query })
            }
          }
        }
      }, 0)
    }
  })

  updateTagsViewStore()
}

// 关闭其他
const closeOthersTagsView = (path: string) => {
  state.tagsList = state.tagsList.filter((item, index) => {
    if (item.path === path || index === 0) {
      storesKeepALiveNames.delOthersCachedViews(item)

      return item
    }
  })

  updateTagsViewStore()
}

// 关闭全部
const closeAllTagsView = () => {
  state.tagsList = state.tagsList.filter((_, index) => index === 0)
  router.push(state.tagsList[0].path)
  updateTagsViewStore()
}

// 开启当前页全屏
const openCurrenFullscreen = async (path: string) => {
  const item = state.tagsList.find((v: any) => v.path === path) as RouteItem

  if (item.meta.isDynamic) {
    await router.push({ name: item.name, params: item.params })
  } else {
    await router.push({ name: item.name, query: item.query })
  }

  tagsViewStore.setCurrenFullscreen(true)
}

const handleAction = async (target: { type: TEaction; index: number }) => {
  const currentRoute = state.tagsList[target.index]

  const cParams = currentRoute.meta.isDynamic
    ? currentRoute.params
    : currentRoute.query

  if (!getCurrentRouteItem(currentRoute.path, cParams))
    return Message.warning('请正确输入路径及完整参数（query、params）')

  const { path, name, params, query, meta } = getCurrentRouteItem(
    currentRoute.path,
    cParams
  )

  switch (target.type) {
    // 刷新当前
    case Eaction.reload:
      if (meta.isDynamic) await router.push({ name, params })
      else await router.push({ path, query })
      refreshCurrentTagsView(route.fullPath)
      break
    // 关闭当前
    case Eaction.current:
      await closeCurrentTagsView(path)
      break
    // 关闭其他
    case Eaction.others:
      await closeOthersTagsView(path)
      break
    case Eaction.all:
      await closeAllTagsView()
      break
    case Eaction.screenFull:
      await openCurrenFullscreen(path)
  }
}

const tagOnClick = (item: RouteItem) => {
  const { name, path } = item
  if (name) {
    if (item.query) {
      router.push({
        name,
        query: item.query
      })
    } else if (item.params) {
      router.push({
        name,
        params: item.params
      })
    } else {
      router.push({ name })
    }
  } else {
    router.push({ path })
  }

  state.routeActive = path
}

const addTagsView = (path: string, to?: any) => {
  // 防止拿取不到路由信息
  nextTick(async () => {
    if (to?.meta?.isLink && !to.meta.isIframe) return false
    if (to.meta.isAffix && !to.meta.isHide) {
      const isExistence = state.tagsList.some((item) => item.path === path)
      if (isExistence) return

      const routeItem = {
        path: setTagsViewHighlight(to) as any,
        ...to
      }

      state.tagsList.push(routeItem)
      storesKeepALiveNames.addCachedView(routeItem)
    }

    updateTagsViewStore()
  })
}

onBeforeRouteUpdate(async (to) => {
  state.routeActive = setTagsViewHighlight(to)
  state.routePath = (
    to.meta.isDynamic ? to.meta.isDynamicPath : to.path
  ) as string

  await addTagsView(to.path, to)
})

onMounted(() => {
  initTagsViewList()
})
</script>

<style scoped lang="less">
.layout-navbars-tagsview {
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 12px;
  box-sizing: border-box;
  background-color: var(--color-bg-2);
  box-shadow: 0 0 1px #888;

  .tag-item {
    cursor: pointer;
    color: var(--color-text-2);
    &:hover:not(.is-active) {
      color: rgb(var(--primary-7));
    }
  }

  .is-active {
    color: #fff;
    background-color: rgb(var(--primary-6));
  }

  :deep .arco-tag .arco-icon-hover.arco-tag-icon-hover:hover::before {
    border-radius: 50px;
    background-color: var(--color-primary-light-3);
  }

  :deep .arco-tag .arco-icon-hover.arco-tag-icon-hover::before {
    border-radius: 50px;
  }
}
</style>
