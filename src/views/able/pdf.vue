<template>
  <div class="fz-container">
    <a-card title="PDF预览">
      <PdfViewer />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'

const PdfViewer = defineAsyncComponent(
  () => import('@/components/PdfViewer/index.vue')
)

defineOptions({
  name: 'Pdf'
})
</script>

<style scoped lang="less"></style>
