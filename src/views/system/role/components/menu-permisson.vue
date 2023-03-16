<template>
  <fz-modal
    title="菜单权限"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleOK"
    @cancel="handleCancel"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="menuPermissonForm" />
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { menuPermissonForm } from './form'
import { getRoleInfo } from '@/services/api/role'
import { queryOpenMenuList } from '@/services/api/menu'
import { createMenuPermisson } from '@/services/api/permisson'

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
  const valid = await formRef.value.onSubmit()

  const [error] = await to(
    createMenuPermisson({
      roleId: props.editId,
      menuIds: valid.menuIds
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
}

const getMenuList = async () => {
  const { data } = await queryOpenMenuList()

  if (data) {
    const menuIds = menuPermissonForm.list.find(
      (item) => item.model === 'menuIds'
    )
    if (menuIds) menuIds.options.options = data as any
  }
}

const handleOpen = async () => {
  await getMenuList()

  if (props.editId) {
    const { data } = await getRoleInfo({ id: props.editId })
    console.log(data)

    formRef.value.setModelValues({
      name: data.name,
      code: data.code
    })
  }
}
</script>

<style scoped lang="less"></style>
