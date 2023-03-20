<template>
  <a-row class="user-wrapper" :gutter="10">
    <a-col :span="4" class="user-wrapper__tree">
      <OrgTree @select="selectedOrigin" />
    </a-col>
    <a-col :span="20">
      <fz-table
        :columns="columns"
        :data="state.userData"
        :total="state.total"
        :loading="loading"
        @search="getUserData"
        @reset="getUserData"
        @pagination="onPagination"
      >
        <template #toolbar>
          <a-button type="primary" @click="state.createUserVisible = true">
            <icon-plus />
            新增
          </a-button>
        </template>
        <template #status="{ record }">
          <a-switch
            v-model="record.status"
            :checked-value="1"
            :unchecked-value="0"
            @click="handleUserId(record.id)"
            :beforeChange="changeUserStatus"
          >
            <template #checked>启用</template>
            <template #unchecked>禁用</template>
          </a-switch>
        </template>

        <template #optional="{ record }">
          <a-button type="text" @click="handleEditUser(record.id)">
            <icon-edit />
            编辑
          </a-button>
          <a-popconfirm
            v-if="!record.superAdmin"
            :content="`是否确认删除用户&quot;${record.username}&quot;?`"
            type="warning"
            @ok="handleDeleteUser(record.id)"
          >
            <a-button type="text" status="danger">
              <icon-delete />
              删除
            </a-button>
          </a-popconfirm>
          <a-dropdown
            trigger="hover"
            @select="handleSelectAction($event, record)"
          >
            <a-button type="text">
              <icon-more />
            </a-button>
            <template #content>
              <a-doption value="password">
                <template #icon>
                  <icon-font icon="fa fa-key" />
                </template>
                <template #default>重置密码</template>
              </a-doption>
              <a-doption value="role">
                <template #icon>
                  <icon-user />
                </template>
                <template #default>分配角色</template>
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </fz-table>
    </a-col>

    <CreateUser
      v-model:visible="state.createUserVisible"
      v-model:edit-id="state.editId"
      @success="getUserData"
    />

    <EditPassword
      v-model:visible="state.editPasdVisible"
      :user="state.userInfo"
    />

    <SetRole
      v-model:visible="state.setRoleVisible"
      :user-info="state.userInfo"
    />
  </a-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import to from 'await-to-js'
import { FzModal } from 'fz-arco-design'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import {
  deleteUser,
  queryUserData,
  updateUserStatus
} from '@/services/api/person'
import type { IQueryUserParams, IUserListItem } from '@/services/api/person'

const OrgTree = defineAsyncComponent(
  () => import('@/components/OrgTree/index.vue')
)
const CreateUser = defineAsyncComponent(
  () => import('./components/create-user.vue')
)
const EditPassword = defineAsyncComponent(
  () => import('./components/edit-password.vue')
)
const SetRole = defineAsyncComponent(() => import('./components/set-role.vue'))

const { loading, setLoading } = useLoading()

const state = reactive<{
  total: number
  editId?: string
  userData: IUserListItem[]
  setRoleVisible: boolean
  editPasdVisible: boolean
  createUserVisible: boolean
  userInfo: {
    id: string
    nickname: string
    username: string
  }
}>({
  total: 0,
  userData: [],
  editId: '',
  setRoleVisible: false,
  editPasdVisible: false,
  createUserVisible: false,
  userInfo: {
    id: '',
    nickname: '',
    username: ''
  }
})

const searchParams = reactive<IQueryUserParams>({
  pageNo: 1,
  pageSize: 10
})

const columns = [
  {
    title: '用户姓名',
    align: 'center',
    dataIndex: 'nickname',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入用户姓名'
      }
    }
  },
  {
    title: '用户账号',
    align: 'center',
    dataIndex: 'username'
  },
  {
    title: '部门',
    align: 'center',
    dataIndex: 'dept.name'
  },
  {
    title: '手机号',
    align: 'center',
    dataIndex: 'mobile',
    searchOptions: {
      type: 'Input',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '请输入手机号'
      }
    }
  },
  {
    title: '状态',
    align: 'center',
    dataIndex: 'status',
    slotName: 'status',
    searchOptions: {
      type: 'Select',
      col: { span: 8 },
      options: {
        value: '',
        allowClear: true,
        placeholder: '用户状态',
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
    dataIndex: 'createTime',
    searchOptions: {
      type: 'RangePicker',
      col: { span: 8 },
      options: {
        value: []
      }
    }
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'optional'
  }
]

const selectedOrigin = (value: string[]) => {
  getUserData({
    pageNo: 1,
    pageSize: 10,
    deptId: value[0]
  })
}

const getUserData = async (params = searchParams) => {
  setLoading(true)
  const [error, res] = await to(queryUserData(params))
  if (error) {
    setLoading(false)
    return
  }

  setLoading(false)

  state.total = res.data.total
  state.userData = res.data.list
}

const onPagination = (params: IQueryUserParams) => {
  Object.assign(searchParams, { ...params })

  getUserData()
}

const userId = ref('')
const handleUserId = (id: string) => {
  userId.value = id
}

const handleEditUser = (id: string) => {
  state.editId = id
  state.createUserVisible = true
}

const handleDeleteUser = async (id: string) => {
  await deleteUser({ id })

  Message.success('删除成功')
  getUserData()
}

const handleSelectAction = (
  commond: 'password' | 'role',
  record: IUserListItem
) => {
  // 重置密码
  if (commond === 'password') {
    state.editPasdVisible = true
  } else {
    // 设置角色
    state.setRoleVisible = true
  }

  Object.assign(state.userInfo, {
    id: record.id,
    nickname: record.nickname,
    username: record.username
  })
}

// 切换用户使用状态 1:启用 0: 禁用
const changeUserStatus = async (status: 1 | 0) => {
  const isOK = await new Promise((resolve, reject) => {
    const text = status === 0 ? '禁用' : '启用'

    FzModal.warning({
      title: '提示',
      content: `确认要"${text}"当前用户吗?`,
      onOk: async () => {
        const { data } = await updateUserStatus({
          status,
          id: userId.value
        })
        if (data) {
          Message.success(`${text} 成功`)
          resolve('ok')
        } else {
          reject('error')
        }
      },
      onCancel: () => {
        resolve('cancel')
      }
    })
  })

  return isOK === 'ok'
}

onMounted(() => {
  getUserData()
})
</script>

<style scoped lang="less">
.user-wrapper {
  height: 100%;
  padding: 15px;

  &__tree {
    height: 100%;
    background: var(--color-bg-2);
    padding: 20px 15px !important;
    border-radius: 4px;
    border: 1px solid var(--color-border-1);
    overflow-y: auto;
  }
}
</style>
