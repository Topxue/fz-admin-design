<template>
  <a-space size="medium">
    <Search />
    <Setting />
    <ScreenFull />
    <Avatar />
  </a-space>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const Avatar = defineAsyncComponent(() => import('@/layout/navBars/avatar.vue'))
const ScreenFull = defineAsyncComponent(
  () => import('@/layout/navBars/screen-full.vue')
)
const Search = defineAsyncComponent(() => import('@/layout/navBars/search.vue'))
const Setting = defineAsyncComponent(
  () => import('@/layout/navBars/setting/index.vue')
)
</script>

<style scoped lang="less"></style>
