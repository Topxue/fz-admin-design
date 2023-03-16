<template>
  <fz-modal
    :title="editId ? '编辑用户' : '新增用户'"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleOK"
    @cancel="handleCancle"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="createUserForm"></fz-form>
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import { createUserForm } from './form'
import useLoading from '@/hooks/loading'
import { queryOpenDeptList } from '@/services/api/dept'
import { createUser, getUserInfo, updateUserInfo } from '@/services/api/person'

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
  (e: 'update:edit-id', payload: string): void
  (e: 'update:visible', stats: boolean): void
}>()

const formRef = ref()

const handleCancle = () => {
  emits('update:edit-id', '')
  emits('update:visible', false)
  formRef.value.onReset()
}

const handleOK = async () => {
  const valid = await formRef.value.onSubmit()
  if (valid) {
    setLoading(true)

    const isEdit = !!props.editId
    if (isEdit) {
      delete valid.password
      delete valid.username
    }

    const [error] = isEdit
      ? await to(
          updateUserInfo({
            ...valid,
            id: props.editId
          })
        )
      : await to(createUser(valid))

    if (error) {
      setLoading(false)
      return
    }
    setLoading(false)

    handleCancle()
    emits('success')
    Message.success(isEdit ? '编辑成功' : '创建成功')
  }
}

// 获取部门数据
const getDepartment = async () => {
  const deptIdOption = createUserForm.list.find(
    (item: any) => item.model === 'deptId'
  )
  if (deptIdOption && deptIdOption.options.options?.length) return

  const { data } = await queryOpenDeptList({ onlyCompany: false })
  if (!data) return

  deptIdOption.options.options = data
}

// TODO: 获取岗位数据渲染逻辑待处理
const getPost = async () => {
  const postIds = createUserForm.list.find(
    (item: any) => item.model === 'postIds'
  )
  if (postIds && postIds.options.options?.length) return
}

// 获取用户详情
const getUserDetails = async () => {
  const res = await getUserInfo({ id: props?.editId ?? '' })

  if (res.data) {
    const { nickname, mobile, email, sex, deptId, postIds } = res.data
    formRef.value.setModelValues({
      nickname,
      mobile,
      email,
      sex,
      deptId,
      postIds
    })
  }
}

// 处理用户账号、密码输入框显示状态
const fildsHidden = () => {
  const fileds = createUserForm.list.filter((item: any) =>
    ['password', 'username'].includes(item.model)
  )

  if (fileds.length) {
    fileds.forEach((item: any) => (item.hidden = !!props.editId))
  }
}

const handleOpen = async () => {
  fildsHidden()

  await getPost()
  await getDepartment()

  if (props?.editId) {
    await getUserDetails()
  }
}
</script>

<style scoped lang="less"></style>
