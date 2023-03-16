<template>
  <a-spin class="tree-wrapper" :loading="loading" tip="加载中...">
    <a-input-search
      class="tree-wrapper__search"
      v-model="state.searchKey"
      allow-clear
      placeholder="请输入部门名称"
    />
    <a-tree
      v-if="treeData.length"
      :data="treeData"
      v-bind="$attrs"
      :fieldNames="{
        key: 'id',
        title: 'name'
      }"
    >
      <template #icon="{ node }">
        <icon-font
          icon="iconfont icon-OAbangong"
          :size="13"
          v-if="node.type === 1"
        />
        <icon-font v-else icon="IconIdcard" :size="14" />
      </template>

      <template #title="nodeData">
        <template v-if="((index = getMatchIndex(nodeData.name)), index < 0)">
          {{ nodeData.name }}
        </template>
        <span v-else>
          {{ nodeData.name.substr(0, index) }}
          <span style="color: rgb(var(--primary-6))">
            {{ nodeData.name.substr(index, state.searchKey.length) }}
          </span>
          {{ nodeData.name.substr(index + state.searchKey.length) }}
        </span>
      </template>
    </a-tree>

    <a-empty description="暂无组织架构" v-else />
  </a-spin>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'

import useLoading from '@/hooks/loading'

import {
  IQueryDeptListDataItem,
  querySystemDeptList
} from '@/services/api/dept'

type OriginTreeData = Array<IQueryDeptListDataItem>

const { loading, setLoading } = useLoading()

const state = reactive<{
  searchKey: string
  originTreeData: OriginTreeData
}>({
  searchKey: '',
  originTreeData: []
})

const treeData = computed(() => {
  if (!state.searchKey) return state.originTreeData

  return searchData(state.searchKey)
})

const searchData = (keyword: string) => {
  const loop = (data: OriginTreeData) => {
    const result: OriginTreeData = []

    data.forEach((item) => {
      if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        result.push({ ...item })
      } else if (item.children) {
        const filterData = loop(item.children)
        if (filterData.length) {
          result.push({
            ...item,
            children: filterData
          })
        }
      }
    })

    return result
  }

  return loop(state.originTreeData)
}

const getMatchIndex = (title: string) => {
  if (!state.searchKey) return -1
  return title.toLowerCase().indexOf(state.searchKey.toLowerCase())
}

onMounted(async () => {
  setLoading(true)
  const { data } = await querySystemDeptList()
  setLoading(false)

  if (!data) return

  state.originTreeData = data
})
</script>

<style scoped lang="less">
.tree-wrapper {
  width: 100%;
  &__search {
    margin-bottom: 10px;
  }
}
</style>
