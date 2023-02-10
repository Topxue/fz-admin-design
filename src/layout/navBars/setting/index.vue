<template>
  <a-button shape="circle" @click="visible = true">
    <icon-settings size="15" />
  </a-button>

  <setting-drawer v-model:visible="visible" />
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
const SettingDrawer = defineAsyncComponent(() => import('./setting-drawer.vue'))

const visible = ref(false)
</script>

<style scoped lang="less"></style>
