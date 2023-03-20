<template>
  <div class="margin-12">
    <fz-table
      :columns="tenantListColumns"
      :data="state.data"
      :total="state.total"
      :loading="loading"
      @search="getTenantData"
      @reset="getTenantData"
      @pagination="onPagination"
    >
      <template #toolbar>
        <a-button type="primary" @click="state.createVisible = true">
          <icon-plus />
          新增
        </a-button>
      </template>
      <template #id="{ record }">
        <a-tag>{{ record.id }}</a-tag>
      </template>
      <template #systemTenant="{ record }">
        <a-tag :color="record.systemTenant ? '#E03E4B' : '#01B87A'">
          {{ record.systemTenant ? '系统套餐' : '普通套餐' }}
        </a-tag>
      </template>
      <template #accountCount="{ record }">
        <a-tag color="#01B87A">{{ record.accountCount }}</a-tag>
      </template>
      <template #status="{ record }">
        <a-tag :color="record.status === 1 ? '#01B87A' : '#E03E4B'">
          {{ record.status === 1 ? '启用' : '禁用' }}
        </a-tag>
      </template>

      <template #optional="{ record }">
        <div v-if="!record.systemTenant">
          <a-button type="text" @click="handleEditTenant(record.id)">
            <icon-edit />
            编辑
          </a-button>
          <a-popconfirm
            :content="`是否确认删除&quot;${record.name}&quot;租户?`"
            type="warning"
            @ok="handleDeleteTenant(record.id)"
          >
            <a-button type="text" status="danger">
              <icon-delete />
              删除
            </a-button>
          </a-popconfirm>
        </div>
        <span v-else>--</span>
      </template>
    </fz-table>

    <CreateTenant
      v-model:visible="state.createVisible"
      v-model:edit-id="state.editId"
      @success="getTenantData"
    />
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted, defineAsyncComponent } from 'vue'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { tenantListColumns } from './columns'
import { queryTenantData, deleteTenant } from '@/services/api/tenant'
import type {
  IQueryTenantParams,
  IQueryTenantDataItem
} from '@/services/api/tenant'

const CreateTenant = defineAsyncComponent(
  () => import('./components/create-tenant.vue')
)

const { loading, setLoading } = useLoading()

const state = reactive<{
  total: number
  editId: string
  createVisible: boolean
  data: IQueryTenantDataItem[]
}>({
  total: 0,
  data: [],
  editId: '',
  createVisible: false
})

const searchParams = reactive<IQueryTenantParams>({
  pageNo: 1,
  pageSize: 10
})

// 编辑租户
const handleEditTenant = (id: string) => {
  state.editId = id
  state.createVisible = true
}

const handleDeleteTenant = async (id: string) => {
  await deleteTenant({ id })

  getTenantData()
  Message.success('删除成功')
}

const onPagination = (params: IQueryTenantParams) => {
  Object.assign(searchParams, { ...params })
  getTenantData()
}

const getTenantData = async (params = searchParams) => {
  setLoading(true)

  const [error, res] = await to(queryTenantData(params))
  if (error) return setLoading(false)

  setLoading(false)

  state.data = res.data.list
  state.total = res.data.total
}

onMounted(() => {
  getTenantData()
})
</script>

<style scoped lang="less"></style>
