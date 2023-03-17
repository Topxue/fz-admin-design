<template>
  <div class="pd15">
    <fz-table
      :columns="columns"
      :data="state.deptData"
      :pagination="false"
      :loading="loading"
      :default-expand-all-rows="true"
      @search="handleSearch"
      @reset="getDeptList"
    >
      <template #toolbar>
        <a-space>
          <a-dropdown @select="handleCreate">
            <a-button type="primary">
              <icon-plus />
              新增
            </a-button>
            <template #content>
              <a-doption :value="1">新建公司</a-doption>
              <a-doption :value="2">新建部门</a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
      <!-- 排序 -->
      <template #sort="{ record }">
        <a-tag>{{ record.sort }}</a-tag>
      </template>
      <!-- 部门类型 -->
      <template #type="{ record }">
        <a-tag>{{ record.type === 1 ? '公司' : '部门' }}</a-tag>
      </template>
      <!-- 状态 -->
      <template #status="{ record }">
        <a-tag :color="record.status === 1 ? '#01B87A' : '#E03E4B'">
          {{ record.status === 1 ? '启用' : '禁用' }}
        </a-tag>
      </template>
      <!-- 操作 -->
      <template #optional="{ record }">
        <a-button type="text" @click="createOnTargetOrg(record)">
          <icon-plus />
          新增
        </a-button>
        <a-button type="text" status="warning" @click="handleEditOrg(record)">
          <icon-edit />
          编辑
        </a-button>
        <a-popconfirm
          :content="`是否确认删除&quot;${record.name}&quot;组织?`"
          type="warning"
          @ok="handleDeleteOrg(record.id)"
          v-if="record.parentId !== 0"
        >
          <a-button type="text" status="danger">
            <icon-delete />
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </fz-table>

    <create-dept
      v-model:visible="state.visible"
      v-model:active-id="state.activeId"
      :type="state.createType"
      :is-edit="state.isEdit"
      @success="getDeptList"
    />
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted, defineAsyncComponent } from 'vue'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import {
  IQueryDeptListDataItem,
  IQueryDeptListParams,
  deleteOrganization,
  querySystemDeptList
} from '@/services/api/dept'

const CreateDept = defineAsyncComponent(
  () => import('./components/create-dept.vue')
)

const { loading, setLoading } = useLoading()

// 1:企业 2：部门
type TCreatetype = 1 | 2
const state = reactive<{
  isEdit: boolean
  visible: boolean
  createType: TCreatetype
  activeId: string
  deptData: Array<IQueryDeptListDataItem>
}>({
  isEdit: false,
  visible: false,
  createType: 1,
  activeId: '',
  deptData: []
})

const columns = [
  {
    title: '组织名称',
    dataIndex: 'name',
    searchOptions: {
      type: 'Input',
      col: { span: 6 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入组织名称'
      }
    }
  },
  {
    title: '负责人',
    align: 'center',
    dataIndex: 'leaderNickname'
  },
  {
    title: '排序',
    align: 'center',
    dataIndex: 'sort',
    slotName: 'sort'
  },
  {
    title: '部门类型',
    align: 'center',
    dataIndex: 'type',
    slotName: 'type'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    slotName: 'status',
    searchOptions: {
      type: 'Select',
      col: { span: 6 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请选择状态',
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
    align: 'center',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]

const getDeptList = async (params: IQueryDeptListParams = {}) => {
  setLoading(true)
  const [error, res] = await to(querySystemDeptList(params))
  if (error) {
    setLoading(false)
    return
  }

  state.deptData = res.data
  setLoading(false)
}

const handleCreate = (commond: TCreatetype) => {
  state.isEdit = false
  state.visible = true
  state.createType = commond
}

// 在指定组织下创建
const createOnTargetOrg = (record: IQueryDeptListDataItem) => {
  state.activeId = record.id
  handleCreate(record.type)
}

// 编辑
const handleEditOrg = (record: IQueryDeptListDataItem) => {
  state.isEdit = true
  state.visible = true
  state.activeId = record.id
}

// 搜索
const handleSearch = (params: IQueryDeptListParams) => {
  getDeptList(params)
  console.log(params, 'value...')
}

const handleDeleteOrg = async (id: string) => {
  await deleteOrganization({ id })

  Message.success('删除成功')
  getDeptList()
}

onMounted(() => {
  getDeptList()
})
</script>

<style scoped lang="less"></style>
