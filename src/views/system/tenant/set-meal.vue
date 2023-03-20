<template>
  <div class="margin-12">
    <fz-table
      :columns="tenantMealColumns"
      :data="state.data"
      :total="state.total"
      :loading="loading"
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
      <template #status="{ record }">
        <a-tag :color="record.status === 1 ? '#01B87A' : '#E03E4B'">
          {{ record.status === 1 ? '启用' : '禁用' }}
        </a-tag>
      </template>
      <template #optional="{ record }">
        <a-button type="text" @click="handleEditMeal(record.id)">
          <icon-edit />
          编辑
        </a-button>
        <a-popconfirm
          :content="`是否确认删除&quot;${record.name}&quot;套餐?`"
          type="warning"
          @ok="handleDeleteMeal(record.id)"
        >
          <a-button type="text" status="danger">
            <icon-delete />
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </fz-table>

    <CreateSetMeal
      v-model:visible="state.createVisible"
      v-model:edit-id="state.editId"
      @success="getSetMealData"
    />
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted, defineAsyncComponent } from 'vue'

import useLoading from '@/hooks/loading'
import { tenantMealColumns } from './columns'
import {
  ISetMealDateItem,
  IQuerySetMealParams,
  deleteTenantSetMeal,
  queryTenantSetMealData
} from '@/services/api/tenant'
import { Message } from '@arco-design/web-vue'

const CreateSetMeal = defineAsyncComponent(
  () => import('./components/create-set-meal.vue')
)

const { loading, setLoading } = useLoading()

const state = reactive<{
  total: number
  data: ISetMealDateItem[]
  editId: string
  createVisible: boolean
}>({
  total: 0,
  data: [],
  editId: '',
  createVisible: false
})

const searchParams = reactive<IQuerySetMealParams>({
  pageNo: 1,
  pageSize: 10
})

// 编辑套餐
const handleEditMeal = (id: string) => {
  state.editId = id
  state.createVisible = true
}

// 删除套餐
const handleDeleteMeal = async (id: string) => {
  await deleteTenantSetMeal({ id })

  getSetMealData()
  Message.success('删除成功')
}

const getSetMealData = async (params = searchParams) => {
  setLoading(true)
  const [error, res] = await to(queryTenantSetMealData(params))
  if (error) return setLoading(false)

  setLoading(false)
  state.data = res.data.list
  state.total = res.data.total
}

onMounted(() => {
  getSetMealData()
})
</script>

<style scoped lang="less"></style>
