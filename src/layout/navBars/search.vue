<template>
  <a-button shape="circle" @click="state.visible = true">
    <icon-search size="15" />
  </a-button>

  <a-modal
    :width="620"
    v-model:visible="state.visible"
    :footer="false"
    :align-center="false"
    :modal-style="{ background: 'none' }"
    simple
    hide-cancel
    unmount-on-close
    @open="handleOpend"
  >
    <div ref="searchRef">
      <a-select
        placeholder="菜单搜索：只支持中文"
        allow-search
        allow-clear
        @change="handleSelectedMenu"
      >
        <template #prefix>
          <icon-search />
        </template>
        <template #search-icon></template>
        <a-option
          v-for="item in state.tagsViewList"
          :key="item.path"
          :value="item.path"
        >
          {{ item?.meta?.title }}
        </a-option>
      </a-select>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { storeToRefs } from 'pinia'

import router from '@/router'
import { useTagsViewRoutes } from '@/stores'

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()
const { tagsViewRoutes } = storeToRefs(storesTagsViewRoutes)

const searchRef = ref(null)
const state = reactive<{
  visible: boolean
  tagsViewList: RouteItem[]
}>({
  visible: false,
  tagsViewList: []
})

// const visible = ref(false)
// const tagsViewList = ref<RouteItem[]>([])

// 初始化菜单数据
const initTageView = () => {
  // 初始化菜单数据
  if (state.tagsViewList.length > 0) return false
  state.tagsViewList = tagsViewRoutes.value.filter(
    (v: RouteItem) => !v.meta?.isHide
  )
}

// 当前菜单选中时
const handleSelectedMenu = (path: string) => {
  const item = state.tagsViewList.find((item) => item.path === path)

  if (item?.meta?.isLink && !item.meta?.isIframe) window.open(item.meta?.isLink)
  else if (item?.redirect) router.push(item.redirect)
  else router.push(path)

  state.visible = false
}

const handleOpend = () => {
  initTageView()

  nextTick(() => {
    const nodeWrapper = searchRef.value as any
    const inputNode = nodeWrapper.querySelector('input')
    if (!inputNode) return

    inputNode.click()
    inputNode.focus()
  })
}
</script>

<style scoped lang="less"></style>
