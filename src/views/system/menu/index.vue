<template>
  <a-card title="菜单管理" class="fz-container">
    <fz-table
      row-key="path"
      :columns="columns"
      :data="routesList"
      :total="routesList.length"
    >
      <template #toolbar>
        <div class="toolbar">
          <a-button type="primary" @click="createVisible = true">
            <icon-plus />
            新建菜单
          </a-button>
        </div>
      </template>

      <template #icon="{ record }">
        <icon-font v-if="record.meta.icon" :icon="record.meta.icon" />
      </template>
      <template #roles="{ record }">
        <a-tag color="#01B87A">{{ record.meta.roles?.join() }}</a-tag>
      </template>
      <template #path="{ record }">
        <a-tag>{{ record.path }}</a-tag>
      </template>
      <template #isHide="{ record }">
        <a-tag :color="record.meta.isHide ? '#E03E4B' : '#01B87A'">
          {{ record.meta.isHide ? '隐藏' : '正常' }}
        </a-tag>
      </template>
    </fz-table>

    <create-menu v-model:visible="createVisible" />
  </a-card>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoutesList } from '@/stores'

const CreateMenu = defineAsyncComponent(
  () => import('./components/create-menu.vue')
)

const { routesList } = storeToRefs(useRoutesList())

const createVisible = ref(false)

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'meta.title'
  },
  {
    title: '图标',
    dataIndex: 'meta.icon',
    slotName: 'icon',
    align: 'center'
  },
  {
    title: '权重',
    align: 'center',
    dataIndex: 'rank'
  },
  {
    title: '权限标识',
    dataIndex: 'meta.roles',
    slotName: 'roles',
    align: 'center'
  },
  {
    title: '组件路径',
    dataIndex: 'path',
    align: 'center',
    slotName: 'path'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'meta.isHide',
    slotName: 'isHide'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'optional'
  }
]
</script>

<style scoped lang="less">
.toolbar {
  display: flex;
  justify-content: flex-end;
}
</style>
