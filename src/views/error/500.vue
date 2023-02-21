<template>
  <ErrorWrapper :status="500" text="抱歉，服务器出错了" />
</template>

<script setup lang="ts">
import ErrorWrapper from './error-wrapper.vue'

defineOptions({
  name: '500'
})
</script>

<style lang="less" scoped></style>
