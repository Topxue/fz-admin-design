<template>
  <div class="margin-12">
    <fz-table
      :columns="loginLogerColumns"
      :data="state.data"
      :total="state.total"
      :loading="loading"
    >
      <!-- 日志编号 -->
      <template #id="{ record }">
        <a-tag>
          <a-typography-paragraph class="copyable" copyable>
            {{ record.id }}
          </a-typography-paragraph>
        </a-tag>
      </template>
      <!-- 用户ip -->
      <template #userIp="{ record }">
        <a-tag>{{ record.userIp }}</a-tag>
      </template>
      <!-- 登录结果 -->
      <template #result="{ record }">
        <a-tag :color="record.result === 0 ? '#01B87A' : '#E03E4B'">
          {{ record.result === 0 ? '成功' : '失败' }}
        </a-tag>
      </template>
    </fz-table>
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted } from 'vue'

import useLoading from '@/hooks/loading'
import { loginLogerColumns } from './columns'
import {
  ILoginLogerDataItem,
  IQueryLoginLogerParams,
  queryLoginLoger
} from '@/services/api/loger'

const { loading, setLoading } = useLoading()

const state = reactive<{
  total: number
  data: ILoginLogerDataItem[]
}>({
  total: 0,
  data: []
})

const searchParams = reactive<IQueryLoginLogerParams>({
  pageNo: 1,
  pageSize: 10
})

const getLoginLogerData = async (params = searchParams) => {
  setLoading(true)
  const [error, res] = await to(queryLoginLoger(params))
  if (error) return setLoading(false)
  setLoading(false)

  state.data = res.data.list
  state.total = res.data.total
}

onMounted(() => {
  getLoginLogerData()
})
</script>
<style scoped lang="less">
.copyable {
  margin: 0;
  line-height: 0;
}
</style>
