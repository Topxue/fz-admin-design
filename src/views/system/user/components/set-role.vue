<template>
  <fz-modal
    title="分配角色"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleOK"
    @cancel="handleCancel"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="setRoleForm" />
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import { setRoleForm } from './form'
import useLoading from '@/hooks/loading'
import { setRole } from '@/services/api/permisson'
import { queryOpenRoleList } from '@/services/api/role'

const formRef = ref()
const { loading, setLoading } = useLoading()

const props = withDefaults(
  defineProps<{
    visible: boolean
    userInfo: {
      id: string
      username: string
      nickname: string
    }
  }>(),
  {
    visible: false,
    userInfo: () => ({
      id: '',
      username: '',
      nickname: ''
    })
  }
)

const emits = defineEmits<{
  (e: 'update:visible', state: boolean): void
}>()

const handleOK = async () => {
  setLoading(true)
  const valid = await formRef.value.onSubmit()
  console.log(valid, 'valid...')

  const [error] = await to(
    setRole({
      roleIds: valid.roleIds,
      userId: props.userInfo.id
    })
  )

  if (error) return setLoading(false)

  handleCancel()
  setLoading(false)
  Message.success('操作成功')
}

const handleCancel = () => {
  emits('update:visible', false)
}

const getRoleList = async () => {
  const { data } = await queryOpenRoleList()
  console.log(data, 'data...')

  if (data) {
    const roleIds = setRoleForm.list.find((item) => item.model === 'roleIds')
    if (roleIds) roleIds.options.options = data as any
  }
}

const handleOpen = async () => {
  await getRoleList()

  console.log(props.userInfo, 'userInfo..')
}
</script>

<style scoped lang="less"></style>
