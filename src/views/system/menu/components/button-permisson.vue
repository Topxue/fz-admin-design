<template>
  <fz-drawer
    :width="620"
    title="按钮权限"
    :visible="visible"
    @cancel="handleClose"
    @ok="handleCreate"
  >
    <fz-table
      row-key="path"
      :columns="columns"
      :data="state.buttonList"
      :pagination="false"
    >
      <template #toolbar>
        <a-button type="primary" @click="state.createBtnVisible = true">
          <icon-plus />
          新建
        </a-button>
      </template>
      <template #permission="{ record }">
        <a-tag color="#01B87A">
          {{ record.permission }}
        </a-tag>
      </template>
      <template #status="{ record }">
        <a-tag :color="record.status === 0 ? '#E03E4B' : '#01B87A'">
          {{ record.status === 0 ? '禁用' : '启用' }}
        </a-tag>
      </template>
      <template #optional="{ record }">
        <a-button type="text" @click="handleEdit(record)">
          <icon-edit />
          编辑
        </a-button>
        <a-popconfirm
          :content="`是否确认删除&quot;${record.title}&quot;按钮?`"
          type="warning"
          @ok="handleDeleteButton(record.id)"
        >
          <a-button type="text" status="danger">
            <icon-delete />
            删除
          </a-button>
        </a-popconfirm>
        <!-- <a-button type="text" status="danger">
          <icon-delete />
          删除
        </a-button> -->
      </template>
    </fz-table>

    <CreateButtonPermisson
      v-model:visible="state.createBtnVisible"
      :parent-id="menuId"
      v-model:button-list-item="state.buttonListItem"
      @success="queryMenuButtonList"
    />
  </fz-drawer>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { Message } from '@arco-design/web-vue'
import { reactive, watch, defineAsyncComponent } from 'vue'

import {
  deleteMenu,
  getMenuButtonList,
  IMenButtonListData
} from '@/services/api/menu'

const CreateButtonPermisson = defineAsyncComponent(
  () => import('./create-button.vue')
)

const props = withDefaults(
  defineProps<{
    visible: boolean
    menuId: string
  }>(),
  {
    menuId: '',
    visible: false
  }
)

const emits = defineEmits<{
  (e: 'update:visible', state: boolean): void
  (e: 'update:menu-id', payload: string): void
}>()

const state = reactive<{
  createBtnVisible: boolean
  buttonList: any
  buttonListItem: IMenButtonListData
}>({
  buttonList: [],
  createBtnVisible: false,
  buttonListItem: {
    title: '',
    permission: '',
    sort: 1,
    parentId: '',
    status: 1,
    id: '',
    createTime: ''
  }
})

const columns = [
  {
    title: '按钮名称',
    dataIndex: 'title'
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    slotName: 'permission',
    align: 'center'
  },
  {
    title: '按钮排序',
    align: 'center',
    dataIndex: 'sort'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    slotName: 'status'
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]

const queryMenuButtonList = async () => {
  const [error, res] = await to(getMenuButtonList({ menuId: props.menuId }))
  if (error) return

  state.buttonList = res.data
}

watch(
  () => props.menuId,
  () => {
    props.menuId && queryMenuButtonList()
  }
)

// 编辑
const handleEdit = (record: IMenButtonListData) => {
  state.createBtnVisible = true
  Object.assign(state.buttonListItem, record)
}

// 删除
const handleDeleteButton = async (id: string) => {
  const [error] = await to(deleteMenu({ id }))
  if (error) return

  Message.success('删除成功')
  queryMenuButtonList()
}

// 关闭
const handleClose = () => {
  emits('update:menu-id', '')
  emits('update:visible', false)
}

// 确定创建
const handleCreate = () => {
  console.log('21312')
}
</script>

<style scoped lang="less">
:deep .fz-pro__table {
  padding: 0;
}
</style>
