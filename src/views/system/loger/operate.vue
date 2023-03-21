<template>
  <div class="margin-12">
    <fz-table
      :columns="operateColumns"
      :total="state.total"
      :data="state.data"
      :loading="loading"
      @search="getOperateData"
      @reset="getOperateData"
      @pagination="onPagination"
    >
      <!-- 日志编号 -->
      <template #id="{ record }">
        <a-tag>
          <a-typography-paragraph class="copyable" copyable>
            {{ record.id }}
          </a-typography-paragraph>
        </a-tag>
      </template>
      <!-- 操作结果 -->
      <template #resultCode="{ record }">
        <a-tag :color="record.resultCode === 200 ? '#01B87A' : '#E03E4B'">
          {{ record.resultCode === 200 ? '成功' : '失败' }}
        </a-tag>
      </template>
      <!-- 执行时长 -->
      <template #duration="{ record }">
        <a-tag color="#01B87A">{{ record.duration }} ms</a-tag>
      </template>
      <template #optional="{ record }">
        <a-button type="text" @click="handleDetail(record)">
          <icon-eye />
          详细
        </a-button>
      </template>
    </fz-table>

    <OperateDetail v-model:visible="state.visible" :detail="state.detail" />
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted, defineAsyncComponent } from 'vue'

import useLoading from '@/hooks/loading'
import { operateColumns } from './columns'
import {
  IQueryOperateParams,
  IOperateDataItem,
  queryOperateLoger
} from '@/services/api/loger'

const OperateDetail = defineAsyncComponent(
  () => import('./components/operate-detail.vue')
)

const { loading, setLoading } = useLoading()

const state = reactive<{
  total: number
  visible: boolean
  data: IOperateDataItem[]
  detail: Partial<IOperateDataItem>
}>({
  total: 0,
  data: [],
  visible: false,
  detail: {}
})

const searchParams = reactive<IQueryOperateParams>({
  pageNo: 1,
  pageSize: 10
})

// 查看详细
const handleDetail = (record: IOperateDataItem) => {
  state.visible = true
  Object.assign(state.detail, record)
}

const getOperateData = async (params = searchParams) => {
  setLoading(true)
  const [error, res] = await to(queryOperateLoger(params))
  if (error) return setLoading(false)
  setLoading(false)

  state.data = res.data.list
  state.total = res.data.total
}

// 分页查询
const onPagination = (params: IQueryOperateParams) => {
  Object.assign(searchParams, params)
  getOperateData()
}

onMounted(() => {
  getOperateData()
})
</script>

<style scoped lang="less">
.copyable {
  margin: 0;
  line-height: 0;
}
</style>
