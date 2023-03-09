<template>
  <a-card title="动态路由传参" class="fz-container">
    <a-row :gutter="20" justify="center" align="center">
      <a-col :span="8">
        <a-input v-model="state.tagName" placeholder="请输入tagsView" />
      </a-col>
      <a-col :span="8">
        <a-input v-model="state.value" placeholder="请输入路由参数id" />
      </a-col>
      <a-col :span="8">
        <a-button type="primary" @click="onGoDetailsClick">
          动态路由传参
        </a-button>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import router from '@/router'
import { reactive } from 'vue'

defineOptions({
  name: 'paramsDynamic'
})

const state = reactive({
  tagName: '',
  value: ''
})

const onGoDetailsClick = () => {
  router.push({
    name: 'paramsDynamicDetails',
    params: {
      t: state.tagName,
      id: state.value
    }
  })
}
</script>

<style scoped lang="less"></style>
