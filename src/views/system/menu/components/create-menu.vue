<template>
  <fz-drawer
    :title="id ? '编辑菜单' : '创建菜单'"
    :visible="visible"
    @cancel="handleClose"
    @ok="handleCreate"
    @open="handleOpen"
    :ok-loading="loading"
  >
    <fz-form :options="formOptions" ref="formRef">
      <template #parentId="item">
        <a-tree-select
          v-model="item.parentId"
          :allow-search="true"
          :allow-clear="true"
          :data="mapMenuList"
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
import { ref, computed, defineAsyncComponent } from 'vue'
import { Message } from '@arco-design/web-vue'
import { TreeNodeData } from '@arco-design/web-vue/es/tree/interface'

import { formOptions } from './options'

import useFunction from '@/utils/commonFunction'
import {
  editMenu,
  getMenuDetail,
  newlyIncreasedMenu
} from '@/services/api/menu'
import useLoading from '@/hooks/loading'

const IconSelect = defineAsyncComponent(
  () => import('@/components/IconSelector/index.vue')
)

const { stringToBool } = useFunction()
const { loading, setLoading } = useLoading()

const formRef = ref()

const props = withDefaults(
  defineProps<{
    id?: string
    visible: boolean
    activeMenuId?: string
    menuList: Array<RouteItem>
  }>(),
  {
    id: '',
    visible: false,
    activeMenuId: '',
    menuList: () => []
  }
)

const emits = defineEmits<{
  (e: 'success'): void
  (e: 'update:id', payload: string): void
  (e: 'update:visible', state: boolean): void
  (e: 'update:activeMenuId', payload: string): void
}>()

const mapMenuList = computed(() => {
  const recurrence = (children: Array<RouteItem>) => {
    return children.map((item) => {
      item.title = item.meta.title
      if (item.children) recurrence(item.children)

      return item
    })
  }

  return recurrence(props.menuList)
})

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

const handleOpen = async () => {
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
