<template>
  <fz-modal
    :title="editId ? '编辑角色' : '创建角色'"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleCreate"
    @cancel="handleCancel"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form :options="createRoleForm" ref="formRef"></fz-form>
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { createRoleForm } from './form'
import { createRole, getRoleInfo, updateRoleInfo } from '@/services/api/role'

const { loading, setLoading } = useLoading()

const props = withDefaults(
  defineProps<{
    editId?: string
    visible: boolean
  }>(),
  {
    visible: false
  }
)

const emits = defineEmits<{
  (e: 'success'): void
  (e: 'update:edit-id', id: string): void
  (e: 'update:visible', state: boolean): void
}>()

const formRef = ref()

const handleCreate = async () => {
  const valid = await formRef.value.onSubmit()

  if (valid) {
    setLoading(true)

    const isEdit = !!props.editId

    const [error] = isEdit
      ? await to(
          updateRoleInfo({
            ...valid,
            id: props.editId
          })
        )
      : await to(createRole(valid))
    if (error) return setLoading(false)

    setLoading(false)
    handleCancel()
    emits('success')
    Message.success(isEdit ? '编辑成功' : '创建成功')
  }
}

const handleCancel = () => {
  emits('update:edit-id', '')
  emits('update:visible', false)
  formRef.value.onReset()
}

const handleOpen = async () => {
  if (props.editId) {
    const { data } = await getRoleInfo({ id: props.editId })
    if (data) {
      formRef.value.setModelValues({
        code: data.code,
        name: data.name,
        sort: data.sort,
        remark: data.remark
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
