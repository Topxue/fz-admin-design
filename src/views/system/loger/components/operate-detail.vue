<template>
  <fz-modal
    :width="650"
    title="操作日志详情"
    :visible="visible"
    @cancel="handleCancel"
    draggable
  >
    <template #content>{{ detail }}</template>
  </fz-modal>
</template>

<script setup lang="ts">
import { IOperateDataItem } from '@/services/api/loger'

withDefaults(
  defineProps<{
    visible: boolean
    detail: Partial<IOperateDataItem>
  }>(),
  {
    visible: false,
    detail: () => ({})
  }
)

const emits = defineEmits<{
  (e: 'update:visible', state: boolean): void
}>()

const handleCancel = () => {
  emits('update:visible', false)
}
</script>
<style scoped lang="less"></style>
