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
      <!-- 显示状态 -->
      <!-- <template #isHide="item">
        <a-radio-group v-model="item.isHide">
          <a-radio value="true">显示</a-radio>
          <a-radio value="false">隐藏</a-radio>
        </a-radio-group>
      </template> -->
    </fz-form>
  </fz-drawer>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { formOptions } from './options'
import useFunction from '@/utils/commonFunction'

const IconSelect = defineAsyncComponent(
  () => import('@/components/IconSelector/index.vue')
)

const { stringToBool } = useFunction()

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

  if (valid) {
    const params = {
      ...valid,
      isHide: stringToBool(valid.isHide),
      isKeepAlive: stringToBool(valid.isKeepAlive),
      isAffix: stringToBool(valid.isAffix),
      isIframe: stringToBool(valid.isIframe)
    }

    console.log(params, 'params...')
  }
}
</script>

<style scoped lang="less"></style>
