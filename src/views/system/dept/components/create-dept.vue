<template>
  <fz-modal
    :title="isEdit ? '编辑组织' : '创建组织'"
    :visible="visible"
    :align-center="false"
    @cancel="handleCancel"
    @ok="handleOk"
    @before-open="handleOpen"
    :ok-loading="loading"
    draggable
  >
    <template #content>
      <fz-form ref="formRef" :options="createDeptOptions">
        <template #parentId="item">
          <a-tree-select
            v-model="item.parentId"
            :allow-search="true"
            :allow-clear="true"
            :data="deptData"
            placeholder="请选择上级组织"
            :treeProps="{
              virtualListProps: {
                height: 200
              }
            }"
            :fieldNames="{
              key: 'id',
              title: 'name'
            }"
          ></a-tree-select>
        </template>
      </fz-form>
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { createDeptOptions } from './options'
import {
  IOpenDeptData,
  getOrgInfo,
  updateOrgInfo,
  queryOpenDeptList,
  createOrganization
} from '@/services/api/dept'

const { loading, setLoading } = useLoading()

const formRef = ref()
const deptData = ref<Array<IOpenDeptData>>([])

const props = withDefaults(
  defineProps<{
    // 是否为编辑
    isEdit: boolean
    visible: boolean
    // 创建类型 1：公司 2： 部门
    type: 1 | 2
    // 当前组织id
    activeId: string
  }>(),
  {
    isEdit: false,
    visible: false,
    type: 1
  }
)

const emits = defineEmits<{
  (e: 'success'): void
  (e: 'update:active-id', payload: string): void
  (e: 'update:visible', state: boolean): void
}>()

const getOpenDeptList = async () => {
  const [error, res] = await to(
    queryOpenDeptList({ onlyCompany: props.type === 1 })
  )
  if (error) return

  deptData.value = res.data
}

const handleCancel = () => {
  setLoading(false)
  emits('update:visible', false)
  emits('update:active-id', '')
  formRef.value.onReset()
}

const handleOk = async () => {
  const valid = await formRef.value.onSubmit()
  if (!valid) return

  const isEdit = props.isEdit

  setLoading(true)

  const params = {
    ...valid,
    type: props.type,
    status: valid.status ? 1 : 0
  }

  isEdit
    ? await updateOrgInfo({
        ...params,
        id: props.activeId
      })
    : await createOrganization(params)

  emits('success')
  handleCancel()
  Message.success(isEdit ? '编辑成功' : '创建成功')
}

const handleOpen = async () => {
  await getOpenDeptList()

  if (props.activeId) {
    formRef.value.setModelValues({
      parentId: props.activeId
    })
  }

  // 编辑回显
  if (props.isEdit) {
    const { data } = await getOrgInfo({ id: props.activeId })
    if (!data) return

    if (data.parentId === 0) {
      deptData.value = [
        { name: '顶级公司', id: 0, parentId: 0, children: [], type: 1, sort: 1 }
      ]
    }

    formRef.value.setModelValues({
      parentId: data.parentId,
      name: data.name,
      sort: data.sort,
      leaderUserId: data.leaderUserId,
      status: data.status === 1
    })
  }
}
</script>

<style scoped lang="less"></style>
