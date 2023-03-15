<template>
  <FzModal
    :title="isEdit ? '编辑按钮' : '新增按钮'"
    :visible="visible"
    :ok-loading="loading"
    @cancel="handleClose"
    @ok="handleCreate"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form :options="createBtnFormOptions" ref="formRef"></fz-form>
    </template>
  </FzModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { createBtnFormOptions } from './options'
import {
  IMenButtonListData,
  createButton,
  updateMenuButton
} from '@/services/api/menu'

const props = withDefaults(
  defineProps<{
    parentId: string
    visible: boolean
    buttonListItem?: IMenButtonListData
  }>(),
  {
    parentId: '',
    visible: false
  }
)
const emits = defineEmits<{
  (e: 'success'): void
  (e: 'update:visible', state: boolean): void
  (e: 'update:button-list-item', data: IMenButtonListData): void
}>()

const formRef = ref()
const { loading, setLoading } = useLoading()

const isEdit = computed(() => {
  return !!props.buttonListItem?.id
})

// 关闭
const handleClose = () => {
  setLoading(false)
  formRef.value.onReset()
  emits('update:visible', false)
  emits('update:button-list-item', {
    title: '',
    permission: '',
    sort: 1,
    parentId: '',
    status: 1,
    id: '',
    createTime: ''
  })
}

// 确定创建
const handleCreate = async () => {
  const valid = await formRef.value.onSubmit()
  if (!valid) return

  setLoading(true)

  const params = {
    ...valid,
    parentId: props.parentId,
    status: valid.status ? 1 : 0
  }

  if (isEdit.value) {
    params.id = props.buttonListItem?.id ?? ''
  }

  const [error] = isEdit.value
    ? await to(updateMenuButton(params))
    : await to(createButton(params))
  if (error) {
    setLoading(false)
    return
  }

  handleClose()
  emits('success')
  Message.success(isEdit.value ? '编辑成功' : '创建成功')
}

const handleOpen = () => {
  if (!props.buttonListItem?.id) return

  const { parentId, permission, sort, status, title } = props.buttonListItem

  formRef.value.setModelValues({
    parentId,
    permission,
    sort,
    title,
    status: status === 1
  })
}
</script>

<style scoped lang="less"></style>
