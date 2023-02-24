<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import setIntroduction from '@/utils/setIconFont'

defineOptions({
  name: 'App'
})

onBeforeMount(() => {
  // 设置批量第三方 icon 图标
  setIntroduction.cssCdn()
  // 设置批量第三方 js
  setIntroduction.jsCdn()
})
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
