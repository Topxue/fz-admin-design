<template>
  <div class="margin-12">
    <fz-table
      :columns="columns"
      :data="state.data"
      :total="state.total"
      :loading="loading"
      @search="getPostData"
      @reset="getPostData"
      @pagination="onPagination"
      :scroll="{ y: 600 }"
    >
      <template #toolbar>
        <a-button type="primary" @click="state.createPostVisible = true">
          <icon-plus />
          新增
        </a-button>
      </template>
      <template #sort="{ record }">
        <a-tag>{{ record.sort }}</a-tag>
      </template>
      <template #status="{ record }">
        <a-tag :color="record.status === 1 ? '#01B87A' : '#E03E4B'">
          {{ record.status === 1 ? '启用' : '禁用' }}
        </a-tag>
      </template>
      <template #optional="{ record }">
        <a-button type="text" @click="editPost(record.id)">
          <icon-edit />
          编辑
        </a-button>
        <a-popconfirm
          :content="`是否确认删除&quot;${record.name}&quot;组织?`"
          type="warning"
          @ok="handleDeletePost(record.id)"
        >
          <a-button type="text" status="danger">
            <icon-delete />
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </fz-table>

    <CreatePost
      v-model:visible="state.createPostVisible"
      v-model:edit-id="state.editId"
      @success="getPostData"
    />
  </div>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { reactive, onMounted, defineAsyncComponent } from 'vue'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { deletePost, queryPostData } from '@/services/api/post'
import type { IQueryPostParams, IQueryPostDataItem } from '@/services/api/post'

const CreatePost = defineAsyncComponent(
  () => import('./components/create-post.vue')
)

const { loading, setLoading } = useLoading()

const state = reactive<{
  total: number
  editId: string
  data: IQueryPostDataItem[]
  createPostVisible: boolean
}>({
  total: 0,
  data: [],
  editId: '',
  createPostVisible: false
})

const searchParams = reactive<IQueryPostParams>({
  pageNo: 1,
  pageSize: 10,
  name: '',
  code: ''
})

const columns = [
  {
    title: '岗位编码',
    dataIndex: 'code',
    align: 'center',
    searchOptions: {
      type: 'Input',
      allowClear: true,
      col: { span: 8 },
      options: {
        value: '',
        placeholder: '请输入岗位编码'
      }
    }
  },
  {
    title: '岗位名称',
    dataIndex: 'name',
    align: 'center',
    searchOptions: {
      type: 'Input',
      allowClear: true,
      col: { span: 8 },
      options: {
        value: '',
        placeholder: '请输入岗位名称'
      }
    }
  },
  {
    title: '岗位排序',
    dataIndex: 'sort',
    align: 'center',
    slotName: 'sort'
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
        placeholder: '岗位状态',
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
    align: 'center'
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]

const editPost = (id: string) => {
  state.editId = id
  state.createPostVisible = true
}

const handleDeletePost = async (id: string) => {
  await deletePost({ id })
  await getPostData()

  Message.success('删除成功')
}

const onPagination = (params: IQueryPostParams) => {
  Object.assign(searchParams, { ...params })
  getPostData()
}

const getPostData = async (params = searchParams) => {
  setLoading(true)

  const [error, res] = await to(queryPostData(params))
  if (error) return setLoading(false)

  setLoading(false)
  state.data = res.data.list
  state.total = res.data.total
}

onMounted(() => {
  getPostData()
})
</script>

<style scoped lang="less"></style>
