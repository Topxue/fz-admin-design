<template>
  <fz-modal
    :title="editId ? '编辑岗位' : '新增岗位'"
    :visible="visible"
    :ok-loading="loading"
    @ok="handleCreate"
    @cancel="handleCancel"
    @before-open="handleOpen"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="createPostForm" />
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'

import { createPostForm } from './form'
import useLoading from '@/hooks/loading'
import { createPost, getPostInfo, updatePost } from '@/services/api/post'

const { loading, setLoading } = useLoading()

const props = withDefaults(
  defineProps<{
    visible: boolean
    editId: string
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

    // 是否为编辑
    const isEdit = !!props.editId

    const [error] = isEdit
      ? await to(
          updatePost({
            ...valid,
            id: props.editId
          })
        )
      : await to(createPost(valid))
    if (error) return setLoading(false)

    handleCancel()
    emits('success')
    setLoading(false)
    Message.success(isEdit ? '编辑成功' : '新增成功')
  }
}

const handleCancel = () => {
  emits('update:edit-id', '')
  emits('update:visible', false)
  formRef.value.onReset()
}

const handleOpen = async () => {
  if (!props.editId) return

  const { data } = await getPostInfo({ id: props.editId })
  if (data) {
    formRef.value.setModelValues({
      code: data.code,
      name: data.name,
      sort: data.sort,
      statue: data.status,
      remark: data.remark
    })
    console.log(data, 'handleOpen..')
  }
}
</script>

<style scoped lang="less"></style>
