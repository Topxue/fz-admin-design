<template>
  <ErrorWrapper :status="404" text="抱歉，你访问的页面不存在" />
</template>

<script setup lang="ts">
import ErrorWrapper from './error-wrapper.vue'

defineOptions({
  name: '404'
})
</script>

<style lang="less" scoped></style>
