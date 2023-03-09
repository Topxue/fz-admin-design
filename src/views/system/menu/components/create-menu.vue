<template>
  <fz-drawer
    title="创建菜单"
    :visible="visible"
    @cancel="handleClose"
    @ok="handleCreate"
  >
    <fz-form :options="formOptions" ref="formRef">
      <template #icon="item">
        <icon-select v-model="item.icon" />
      </template>
    </fz-form>
  </fz-drawer>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { formOptions } from './options'

const IconSelect = defineAsyncComponent(
  () => import('@/components/IconSelector/index.vue')
)

const formRef = ref()

withDefaults(
  defineProps<{
    visible: boolean
  }>(),
  {
    visible: false
  }
)

const emits = defineEmits<{
  (e: 'update:visible', state: boolean): void
}>()

const handleClose = () => {
  emits('update:visible', false)
}

const handleCreate = async () => {
  const valid = await formRef.value.onSubmit()

  console.log(valid, 'valid...')
}
</script>

<style scoped lang="less"></style>
