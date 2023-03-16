<template>
  <div class="margin-15">
    <fz-table
      :columns="columns"
      :data="state.data"
      :total="state.total"
      :loading="loading"
    >
      <!-- toolbar -->
      <template #toolbar>
        <a-button type="primary" @click="state.createRoleVisible = true">
          <icon-plus />
          新增
        </a-button>
      </template>
      <!-- 角色类型 -->
      <template #type="{ record }">
        <a-tag :color="record.type === 1 ? '#F36D78' : '#01B87A'">
          {{ record.type === 1 ? '内置' : '自定义' }}
        </a-tag>
      </template>
      <!-- 状态 -->
      <template #status="{ record }">
        <a-switch
          v-model="record.status"
          :checked-value="1"
          :unchecked-value="0"
          :beforeChange="changeRoleStatus"
          @click="handleRoleId(record.id)"
        >
          <template #checked>启用</template>
          <template #unchecked>禁用</template>
        </a-switch>
      </template>
      <!-- 操作 -->
      <template #optional="{ record }">
        <a-button type="text" @click="handleEditRole(record.id)">
          <icon-edit />
          编辑
        </a-button>
        <a-button type="text" @click="handleMenuPermisson(record.id)">
          <icon-down-circle />
          菜单权限
        </a-button>
        <a-button type="text">
          <icon-down-circle />
          数据权限
        </a-button>
        <a-popconfirm
          :content="`是否确认删除&quot;${record.name}&quot;角色?`"
          type="warning"
          @ok="handleDeleteRole(record.id)"
        >
          <a-button type="text" status="danger">
            <icon-delete />
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </fz-table>

    <CreateRole
      v-model:visible="state.createRoleVisible"
      v-model:edit-id="state.editId"
      @success="getRoleData"
    />

    <MenuPermisson
      v-model:visible="state.menuPermissonVisible"
      v-model:edit-id="state.editId"
    />
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted, defineAsyncComponent } from 'vue'
import { FzModal } from 'fz-arco-design'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import type { IQueryRoleParams, IRoleDataItem } from '@/services/api/role'
import {
  deleteRole,
  queryRoleData,
  updateRoleStatus
} from '@/services/api/role'

const CreateRole = defineAsyncComponent(
  () => import('./components/create-role.vue')
)
const MenuPermisson = defineAsyncComponent(
  () => import('./components/menu-permisson.vue')
)

const { loading, setLoading } = useLoading()

const state = reactive<{
  total: number
  data: IRoleDataItem[]
  roleId: string
  editId: string
  createRoleVisible: boolean
  menuPermissonVisible: boolean
}>({
  total: 0,
  data: [],
  roleId: '',
  editId: '',
  createRoleVisible: false,
  menuPermissonVisible: false
})

const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
    align: 'center',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入角色名称'
      }
    }
  },
  {
    title: '角色标识',
    dataIndex: 'code',
    align: 'center',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入角色标识'
      }
    }
  },
  {
    title: '角色类型',
    align: 'center',
    dataIndex: 'type',
    slotName: 'type'
  },
  {
    title: '显示顺序',
    align: 'center',
    dataIndex: 'sort'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    slotName: 'status',
    searchOptions: {
      type: 'Select',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '角色状态',
        options: [
          {
            label: '启用',
            value: 1
          },
          {
            label: '禁用',
            value: 0
          }
        ]
      }
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    searchOptions: {
      type: 'RangePicker',
      col: { span: 8 },
      options: {
        value: []
      }
    }
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]

const handleRoleId = (id: string) => {
  state.roleId = id
}
// 切换角色使用状态 1:启用 0: 禁用
const changeRoleStatus = async (status: 1 | 0) => {
  const isOK = await new Promise((resolve) => {
    const text = status === 0 ? '禁用' : '启用'

    FzModal.warning({
      title: '提示',
      content: `确认要"${text}"当前角色吗?`,
      onOk: async () => {
        const [error] = await to(
          updateRoleStatus({
            status,
            id: state.roleId
          })
        )

        if (error) return resolve('error')

        Message.success(`${text} 成功`)
        resolve('ok')
      },
      onCancel: () => {
        resolve('cancel')
      }
    })
  })

  return isOK === 'ok'
}

// 编辑角色
const handleEditRole = (id: string) => {
  state.editId = id
  state.createRoleVisible = true
}

// 编辑菜单权限
const handleMenuPermisson = (id: string) => {
  console.log('menuPermissonForm...')
  state.editId = id
  state.menuPermissonVisible = true
}

// 删除角色
const handleDeleteRole = async (id: string) => {
  await deleteRole({ id })

  state.data = state.data.filter((item) => item.id !== id)
  Message.success('删除成功')
}

const getRoleData = async (
  params: IQueryRoleParams = {
    pageNo: 1,
    pageSize: 10
  }
) => {
  setLoading(true)

  const [error, res] = await to(queryRoleData(params))
  if (error) return setLoading(false)

  setLoading(false)

  state.data = res.data.list
  state.total = res.data.total
}

onMounted(() => {
  getRoleData()
})
</script>

<style scoped lang="less"></style>
