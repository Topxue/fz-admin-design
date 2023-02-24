<template>
  <div class="fz-container">
    <a-card title="图标选择器">
      <a-row>
        <a-col :span="7">
          <IconSelector />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const IconSelector = defineAsyncComponent(
  () => import('@/components/IconSelector/index.vue')
)
</script>

<style scoped lang="less"></style>
