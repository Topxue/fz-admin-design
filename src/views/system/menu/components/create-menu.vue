<template>
  <fz-drawer
    :title="id ? '编辑菜单' : '创建菜单'"
    :visible="visible"
    @cancel="handleClose"
    @ok="handleCreate"
    @before-open="handleOpen"
    :ok-loading="loading"
  >
    <fz-form :options="formOptions" ref="formRef">
      <template #parentId="item">
        <a-tree-select
          v-model="item.parentId"
          :allow-search="true"
          :allow-clear="true"
          :data="menuList"
          :filter-tree-node="customFilterTreeNode"
          placeholder="请选择父级菜单"
          :treeProps="{
            virtualListProps: {
              height: 200
            }
          }"
          :fieldNames="{
            key: 'id',
            title: 'title'
          }"
        ></a-tree-select>
      </template>
      <template #icon="item">
        <icon-select v-model="item.icon" />
      </template>
    </fz-form>
  </fz-drawer>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref, defineAsyncComponent } from 'vue'
import { Message, TreeNodeData } from '@arco-design/web-vue'

import { formOptions } from './options'
import useFunction from '@/utils/commonFunction'
import {
  editMenu,
  getMenuDetail,
  queryOpenMenuList,
  newlyIncreasedMenu
} from '@/services/api/menu'
import useLoading from '@/hooks/loading'

const IconSelect = defineAsyncComponent(
  () => import('@/components/IconSelector/index.vue')
)

const { stringToBool } = useFunction()
const { loading, setLoading } = useLoading()

const formRef = ref()
const menuList = ref<Array<RouteItem>>([])

const props = withDefaults(
  defineProps<{
    id?: string
    visible: boolean
    activeMenuId?: string
  }>(),
  {
    id: '',
    visible: false,
    activeMenuId: ''
  }
)

const emits = defineEmits<{
  (e: 'success'): void
  (e: 'update:id', payload: string): void
  (e: 'update:visible', state: boolean): void
  (e: 'update:activeMenuId', payload: string): void
}>()

const handleClose = () => {
  setLoading(false)
  emits('update:id', '')
  emits('update:visible', false)
  emits('update:activeMenuId', '')
  formRef.value.onReset()
}

const customFilterTreeNode = (searchKey: string, nodeData: TreeNodeData) => {
  return nodeData.title ? nodeData.title.indexOf(searchKey) > -1 : false
}

const handleCreate = async () => {
  const valid = await formRef.value.onSubmit()

  if (valid) {
    setLoading(true)

    const id = props.id
    const { parentId, ...reset } = valid

    const params = {
      ...reset,
      id,
      parentId: parentId ? parentId : 0,
      hidden: stringToBool(valid.hidden),
      keepAlive: stringToBool(valid.keepAlive),
      affix: stringToBool(valid.affix),
      iframe: stringToBool(valid.iframe)
    }

    const [error] = id
      ? await to(editMenu(params))
      : await to(newlyIncreasedMenu(params))

    if (error) {
      setLoading(false)
      return
    }

    setLoading(false)
    emits('success')
    handleClose()
    Message.success(id ? '编辑成功' : '创建成功')
  }
}

const getOpenMenuList = async () => {
  // 优化、不需要每次都进行请求
  if (menuList.value.length) return

  const [error, res]: any = await to(queryOpenMenuList())
  if (error) return

  menuList.value = res.data
}

const handleOpen = async () => {
  await getOpenMenuList()

  if (props.activeMenuId) {
    formRef.value.setModelValues({
      parentId: props.activeMenuId
    })
  }

  if (!props.id) return

  const [error, res] = await to(getMenuDetail({ menuId: props.id }))
  if (error) return

  const data = res.data

  formRef.value.setModelValues({
    ...data,
    parentId: data.parentId === 0 ? '' : data.parentId,
    link: String(data.link),
    affix: String(data.affix),
    hidden: String(data.hidden),
    iframe: String(data.iframe),
    keepAlive: String(data.keepAlive)
  })
}
</script>

<style scoped lang="less"></style>
