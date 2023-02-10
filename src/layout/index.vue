<template>
  <component :is="layouts[appConfig.layout]" />
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores'
import usePrimaryColor from '@/hooks/usePrimaryColor'

const appStore = useAppStore()

const { appConfig } = storeToRefs(appStore)

// 引入组件
const layouts: any = {
  defaults: defineAsyncComponent(() => import('@/layout/main/defaults.vue'))
}

onMounted(() => {
  usePrimaryColor(appConfig.value.primary)
  appStore.changeThemeColor(appConfig.value.isDark)
})
</script>

<style scoped lang="less"></style>
