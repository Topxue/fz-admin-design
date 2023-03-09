<template>
  <a-card title="普通路由传参" class="fz-container">
    <a-row :gutter="20" justify="center" align="center">
      <a-col :span="8">
        <a-input v-model="state.tagName" placeholder="请输入tagsView" />
      </a-col>
      <a-col :span="8">
        <a-input v-model="state.value" placeholder="请输入路由参数id" />
      </a-col>
      <a-col :span="8">
        <a-button type="primary" @click="onGoDetailsClick">
          普通路由传参
        </a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import router from '@/router'
import { reactive } from 'vue'

defineOptions({
  name: 'paramsCommon'
})

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

<style scoped lang="less"></style>
