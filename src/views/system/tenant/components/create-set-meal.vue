<template>
  <fz-modal
    :title="editId ? '编辑套餐' : '新增套餐'"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleCreate"
    @cancel="handleCancel"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="createSetMealForm" />
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { createSetMealForm } from './form'
import { queryOpenMenuList } from '@/services/api/menu'
import {
  createTenantSetMeal,
  getTenantMealInfo,
  updateSetMeal
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
          updateSetMeal({
            ...valid,
            id: props.editId
          })
        )
      : await to(createTenantSetMeal(valid))
    if (error) return setLoading(false)

    emits('success')
    handleCancel()
    setLoading(false)
    Message.success(isEdit ? '编辑成功' : '新增成功')
  }
}

const handleCancel = () => {
  emits('update:edit-id', '')
  emits('update:visible', false)
  formRef.value.onReset()
}

// 获取菜单列表
const getMenuList = async () => {
  const menuIds = createSetMealForm.list.find(
    (item) => item.model === 'menuIds'
  )
  if (menuIds) menuIds.options.loading = true

  const { data } = await queryOpenMenuList()

  if (data) {
    if (menuIds) {
      menuIds.options.loading = false
      menuIds.options.options = data as any
    }
  } else {
    if (menuIds) menuIds.options.loading = false
  }
}

const handleOpen = async () => {
  await getMenuList()
  // 获取套餐详情
  if (props.editId) {
    const { data } = await getTenantMealInfo({ id: props.editId })
    if (data) {
      formRef.value.setModelValues({
        name: data.name,
        menuIds: data.menuIds,
        statue: data.status,
        remark: data.remark
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
