<template>
  <fz-modal
    :title="editId ? '编辑租户' : '新增租户'"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleCreate"
    @cancel="handleCancel"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="createTenantForm" />
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

import { createTenantForm } from './form'
import useLoading from '@/hooks/loading'
import {
  createTenant,
  updateTenant,
  getTenantInfo,
  getTenantSimpleList
} from '@/services/api/tenant'

const { loading, setLoading } = useLoading()

const props = withDefaults(
  defineProps<{
    editId?: string
    visible: boolean
  }>(),
  {
    editId: '',
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
          updateTenant({
            ...valid,
            id: props.editId
          })
        )
      : await to(createTenant(valid))
    if (error) return setLoading(false)

    Message.success(isEdit ? '编辑成功' : '创建成功')

    emits('success')
    setLoading(false)
    handleCancel()
  }
}

const handleCancel = () => {
  emits('update:edit-id', '')
  emits('update:visible', false)
  formRef.value.onReset()
}

// 获取套餐列表
const getOpenTenantList = async () => {
  const { data } = await getTenantSimpleList()

  if (data) {
    const packageId = createTenantForm.list.find(
      (item) => item.model === 'packageId'
    )
    if (packageId) packageId.options.options = data as any
  }
}

// 获取租户详情
const getTenantDetails = async () => {
  const id = props.editId
  if (id) {
    const res = await getTenantInfo({ id })
    const {
      name,
      domain,
      status,
      packageId,
      expireTime,
      createTime,
      contactName,
      accountCount,
      contactMobile
    } = res.data

    formRef.value.setModelValues({
      name,
      domain,
      status,
      packageId,
      expireTime,
      createTime,
      contactName,
      accountCount,
      contactMobile
    })
  }
}

const controlFieldStatus = () => {
  const fileds = createTenantForm.list.filter((item) =>
    ['username', 'password'].includes(item.model)
  )
  fileds.forEach((item) => {
    item.hidden = props.editId ? true : false
  })
}

const handleOpen = async () => {
  // 账号、密码显示状态， 创建显示、编辑隐藏
  controlFieldStatus()

  await getOpenTenantList()
  await getTenantDetails()
}
</script>

<style scoped lang="less"></style>
