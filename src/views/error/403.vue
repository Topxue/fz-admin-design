<template>
  <ErrorWrapper :status="403" text="抱歉，你无权访问该页面" />
</template>

<script setup lang="ts">
import ErrorWrapper from './error-wrapper.vue'

defineOptions({
  name: '403'
})
</script>

<style lang="less" scoped></style>
