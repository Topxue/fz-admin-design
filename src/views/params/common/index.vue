<template>
  <div class="fz-container">
    <a-space direction="vertical" align="center" fill>
      <a-input v-model="state.tagName" placeholder="请输入tagsView" />
      <a-input v-model="state.value" placeholder="请输入路由参数id" />
      <a-button type="primary" @click="onGoDetailsClick">普通路由传参</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { reactive } from 'vue'

const state = reactive({
  tagName: '',
  value: ''
})

const onGoDetailsClick = () => {
  router.push({
    path: '/params/common/detail',
    query: {
      id: state.value
    }
  })
}
</script>

<style scoped lang="less">
.fz-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
