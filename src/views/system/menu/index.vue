<template>
  <a-card title="菜单管理" class="fz-container">
    <fz-table
      row-key="path"
      :columns="columns"
      :data="menuList"
      :total="menuList.length"
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
        <icon-font
          v-if="record.meta.icon && record.meta.icon !== '#'"
          :icon="record.meta.icon"
        />
      </template>
      <template #permission="{ record }">
        <a-tag color="#01B87A" v-if="record.meta.permission">
          {{ record.meta.permission }}
        </a-tag>
      </template>
      <template #path="{ record }">
        <a-tag>{{ record.path }}</a-tag>
      </template>
      <template #hidden="{ record }">
        <a-tag :color="record.meta.hidden ? '#E03E4B' : '#01B87A'">
          {{ record.meta.hidden ? '隐藏' : '正常' }}
        </a-tag>
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button type="text" @click="createMenu(record.id)">
            <icon-plus />
            新增
          </a-button>
          <a-button type="text" @click="handleEditMenu(record)">
            <icon-edit />
            编辑
          </a-button>
          <a-popconfirm
            :content="`是否确认删除&quot;${record.meta.title}&quot;菜单?`"
            type="warning"
            @ok="handleDeleteMenu(record.id)"
          >
            <a-button type="text">
              <icon-delete />
              删除
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </fz-table>

    <CreateMenu
      v-model:visible="createVisible"
      v-model:id="menuId"
      v-model:active-menu-id="activeMenuId"
      :menu-list="menuList"
      @success="createSuccess"
    />
  </a-card>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { Message } from '@arco-design/web-vue'

import { getMenuList, deleteMenu } from '@/services/api/menu'

const CreateMenu = defineAsyncComponent(
  () => import('./components/create-menu.vue')
)

const menuId = ref('')
const activeMenuId = ref('')
const menuList = ref<any>([])
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
    dataIndex: 'sort'
  },
  {
    title: '权限标识',
    dataIndex: 'meta.permission',
    slotName: 'permission',
    align: 'center'
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    align: 'center',
    slotName: 'path'
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'meta.hidden',
    slotName: 'hidden'
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

// 创建菜单
const createMenu = (id: string) => {
  activeMenuId.value = id
  createVisible.value = true
}

const handleEditMenu = (record: any) => {
  menuId.value = record.id
  createVisible.value = true
}

const handleDeleteMenu = async (id: string) => {
  const [error] = await to(deleteMenu({ id }))
  if (error) return

  Message.success('删除成功')
  queryMenuList()
}

const queryMenuList = async () => {
  const [error, res] = await to(getMenuList())
  if (error) return

  menuList.value = res.data
}

const createSuccess = () => {
  queryMenuList()
}

onMounted(() => {
  queryMenuList()
})
</script>

<style scoped lang="less">
.toolbar {
  display: flex;
  justify-content: flex-end;
}
</style>
