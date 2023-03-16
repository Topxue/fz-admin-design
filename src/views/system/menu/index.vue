<template>
  <div class="fz-container">
    <fz-table
      row-key="path"
      :columns="columns"
      :data="state.menuList"
      :pagination="false"
      :loading="loading"
    >
      <template #toolbar>
        <div class="toolbar">
          <a-button type="primary" @click="state.createVisible = true">
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
      <template #sort="{ record }">
        <a-tag>{{ record.sort }}</a-tag>
      </template>
      <template #status="{ record }">
        <a-tag :color="record.meta.status === 1 ? '#01B87A' : '#E03E4B'">
          {{ record.meta.status === 1 ? '启用' : '禁用' }}
        </a-tag>
      </template>

      <template #optional="{ record }">
        <a-button type="text" @click="createMenu(record.id)">
          <icon-plus />
          新增
        </a-button>
        <a-button
          type="text"
          @click="createButton(record.id)"
          v-if="isBtnPermisson(record)"
        >
          <icon-plus />
          按钮
        </a-button>
        <a-button type="text" status="warning" @click="handleEditMenu(record)">
          <icon-edit />
          编辑
        </a-button>
        <a-popconfirm
          :content="`是否确认删除&quot;${record.meta.title}&quot;菜单?`"
          type="warning"
          @ok="handleDeleteMenu(record.id)"
        >
          <a-button type="text" status="danger">
            <icon-delete />
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </fz-table>

    <!-- 创建菜单 -->
    <CreateMenu
      v-model:visible="state.createVisible"
      v-model:id="state.menuId"
      v-model:active-menu-id="state.activeMenuId"
      @success="createSuccess"
    />

    <!-- 按钮权限 -->
    <ButtonPermisson
      v-model:visible="state.btnVisible"
      v-model:menu-id="state.menuId"
    />
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted, computed, defineAsyncComponent } from 'vue'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { getMenuList, deleteMenu } from '@/services/api/menu'

const CreateMenu = defineAsyncComponent(
  () => import('./components/create-menu.vue')
)
const ButtonPermisson = defineAsyncComponent(
  () => import('./components/button-permisson.vue')
)

const { loading, setLoading } = useLoading()

const state = reactive<{
  menuId: string
  activeMenuId: string
  menuList: any
  createVisible: boolean
  btnVisible: boolean
}>({
  menuId: '',
  activeMenuId: '',
  menuList: [],
  createVisible: false,
  btnVisible: false
})

// TODO: 负责人缺少中文字段
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
    dataIndex: 'meta.status',
    slotName: 'status'
  },
  {
    title: '权重',
    align: 'center',
    dataIndex: 'sort',
    slotName: 'sort'
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

// 是否显示按钮权限按钮
const isBtnPermisson = computed(() => {
  return (record: any) => {
    if (record.meta.link || record.meta.iframe) {
      return false
    }

    return (
      (record.parentId === 0 && !record.children?.length) ||
      record.parentId !== 0
    )
  }
})

// 创建菜单
const createMenu = (id: string) => {
  state.activeMenuId = id
  state.createVisible = true
}

// 创建按钮
const createButton = (id: string) => {
  state.menuId = id
  state.btnVisible = true
}

const handleEditMenu = (record: any) => {
  state.menuId = record.id
  state.createVisible = true
}

const handleDeleteMenu = async (id: string) => {
  const [error] = await to(deleteMenu({ id }))
  if (error) return

  Message.success('删除成功')
  queryMenuList()
}

const queryMenuList = async () => {
  setLoading(true)
  const [error, res] = await to(getMenuList())
  if (error) {
    setLoading(false)
    return
  }

  state.menuList = res.data
  setLoading(false)
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
