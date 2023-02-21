<template>
  <div class="error-wrapper">
    <component :is="statusComponets[status]"></component>
    <div class="error-trip">
      <h1>{{ status }}</h1>
      <div>{{ text }}</div>
      <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const statusComponets: any = {
  403: defineAsyncComponent(() => import('@/assets/status/403.svg?component')),
  404: defineAsyncComponent(() => import('@/assets/status/404.svg?component')),
  500: defineAsyncComponent(() => import('@/assets/status/500.svg?component'))
}

withDefaults(
  defineProps<{
    status: number
    text: string
  }>(),
  {
    status: 404,
    text: ''
  }
)
</script>

<style scoped lang="less">
.error-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .error-trip {
    margin-left: 25px;
    line-height: 50px;
  }
}
</style>
