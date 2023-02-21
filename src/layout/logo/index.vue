<template>
  <div class="layout-logo" v-if="!isCollapsed">
    <img src="@/assets/images/logo.jpg" class="layout-logo-medium-img" />
    <span>{{ appConfig.globalTitle }}</span>
  </div>

  <div class="layout-logo-size" v-else>
    <img src="@/assets/images/logo.jpg" class="layout-logo-size-img" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const { appConfig } = storeToRefs(appStore)

const isCollapsed = computed(() => appConfig.value.isCollapse)
</script>

<style scoped lang="less">
.layout-logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  span {
    white-space: nowrap;
    display: inline-block;
  }
  overflow: hidden;
  &-medium-img {
    width: 30px;
    border-radius: 4px;
    margin-right: 10px;
  }
}

.layout-logo-size {
  width: 100%;
  height: 50px;
  display: flex;
  cursor: pointer;
  &-img {
    width: 36px;
    margin: auto;
    border-radius: 4px;
  }
}
</style>
