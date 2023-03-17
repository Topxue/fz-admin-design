<template>
  <fz-modal
    title="数据权限"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleOK"
    @cancel="handleCancel"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="dataPermissonForm" />
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { dataPermissonForm } from './form'
import { getRoleInfo } from '@/services/api/role'
import { serRoleDataPermisson } from '@/services/api/permisson'
import { queryOpenDeptList } from '@/services/api/dept'

const { loading, setLoading } = useLoading()

const formRef = ref()

const props = withDefaults(
  defineProps<{
    editId: string
    visible: boolean
  }>(),
  {
    editId: '',
    visible: false
  }
)

const emits = defineEmits<{
  (e: 'update:edit-id', id: string): void
  (e: 'update:visible', state: boolean): void
}>()

const handleOK = async () => {
  setLoading(true)
  const data = await formRef.value.onSubmit()

  const [error] = await to(
    serRoleDataPermisson({
      roleId: props.editId,
      dataScope: data.dataScope,
      dataScopeDeptIds: data.dataScopeDeptIds
    })
  )

  if (error) return setLoading(false)

  setLoading(false)
  handleCancel()
  Message.success('操作成功')
}

const handleCancel = () => {
  emits('update:edit-id', '')
  emits('update:visible', false)
  formRef.value.onReset()

  const dataScopeDeptIds = getDatePermissonOptions()
  if (dataScopeDeptIds) dataScopeDeptIds.hidden = true
}

// 获取数据权限 `options`
const getDatePermissonOptions = () => {
  return dataPermissonForm.list.find(
    (item) => item.model === 'dataScopeDeptIds'
  )
}

// 获取部门数据
const getDeptList = async () => {
  const dataScopeDeptIds = getDatePermissonOptions()
  if (dataScopeDeptIds && dataScopeDeptIds.options.options?.length) return

  const { data } = await queryOpenDeptList({ onlyCompany: false })

  if (data) {
    if (dataScopeDeptIds) dataScopeDeptIds.options.options = data as any
  }
}

const handleOpen = async () => {
  await getDeptList()

  if (props.editId) {
    const { data } = await getRoleInfo({ id: props.editId })

    // 是否为指定部门权限
    if (data.dataScope === 2) {
      const dataScopeDeptIds = getDatePermissonOptions()
      if (dataScopeDeptIds) dataScopeDeptIds.hidden = false
    }

    formRef.value.setModelValues({
      name: data.name,
      code: data.code,
      dataScope: data.dataScope,
      dataScopeDeptIds: data.dataScopeDeptIds
    })
  }
}
</script>

<style scoped lang="less"></style>
