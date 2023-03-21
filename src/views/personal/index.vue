<template>
  <a-row>
    <a-col class="fz-container" :span="6" :xs="24" :lg="24" :xl="24" :xxl="6">
      <a-card class="card-wrapper" title="用户信息" hoverable>
        <div class="user-info">
          <a-avatar class="user-info__avatar" trigger-type="mask">
            <img alt="" :src="user.avatar" />
            <template #trigger-icon>
              <a-upload
                class="upload-trigger"
                accept="image/png, image/jpeg"
                :show-file-list="false"
                :custom-request="uploadAvatar"
              >
                <template #upload-button>
                  <IconEdit />
                </template>
              </a-upload>
            </template>
          </a-avatar>
          <div class="user-info__item">
            <span>
              <icon-user />
              用户名称
            </span>
            <span>{{ user.nickname }}</span>
          </div>
          <div class="user-info__item">
            <span>
              <icon-phone />
              手机号码
            </span>
            <span>{{ user.mobile }}</span>
          </div>
          <div class="user-info__item">
            <span>
              <icon-email />
              用户邮箱
            </span>
            <span>{{ user.email }}</span>
          </div>
          <div class="user-info__item">
            <span>
              <icon-font :size="13" icon="iconfont icon-OAbangong" />
              所属部门
            </span>
            <span>{{ user.dept.name }}</span>
          </div>
          <div class="user-info__item">
            <span>
              <icon-idcard />
              所属岗位
            </span>
            <span>
              <a-space size="mini">
                <a-tag
                  style="background-color: rgb(var(--success-6)); color: #fff"
                  v-for="item in user.posts"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-tag>
              </a-space>
            </span>
          </div>
          <div class="user-info__item">
            <span>
              <icon-user-group />
              所属角色
            </span>
            <span>
              <a-space size="mini">
                <a-tag
                  style="background-color: rgb(var(--success-6)); color: #fff"
                  v-for="item in user.roles"
                  :key="item.id"
                >
                  {{ item.name }}
                </a-tag>
              </a-space>
            </span>
          </div>
          <div class="user-info__item">
            <span>
              <icon-calendar-clock />
              创建日期
            </span>
            <span>{{ user.createTime }}</span>
          </div>
        </div>
      </a-card>
    </a-col>
    <a-col class="fz-container" :span="17" :lg="24" :xl="24" :xxl="17">
      <a-card class="card-wrapper" title="基本资料" hoverable>
        <a-tabs>
          <a-tab-pane key="1">
            <template #title>
              <icon-user />
              基本资料
            </template>
            <div class="tab-content">
              <fz-form
                ref="baseFormRef"
                :options="baseInfoForm"
                @reset="onReset"
                @submit="onSbumit"
              />
            </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #title>
              <icon-lock />
              修改密码
            </template>
            <fz-form
              ref="passwordFormRef"
              :options="passwordForm"
              @reset="onReset"
              @submit="onPasswordSbumit"
            />
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref, onMounted } from 'vue'
import { Message, RequestOption } from '@arco-design/web-vue'

import router from '@/router'
import { useUserStore } from '@/stores'
import { baseInfoForm, passwordForm } from './form'
import {
  IPersonInfo,
  UpdatePersonParams,
  IUpdatePasswordParams,
  getPersonInfo,
  updatePersonInfo,
  updatePersonAvatar,
  updatePersonPassword
} from '@/services/api/user'

interface IEditPasswordModel extends IUpdatePasswordParams {
  confirmPassword: string
}

const userStore = useUserStore()

const baseFormRef = ref()
const passwordFormRef = ref()

const user = ref<IPersonInfo>({
  avatar: '',
  createTime: '',
  dept: {
    id: '',
    name: ''
  },
  deptId: '',
  email: '',
  id: '',
  loginDate: '',
  loginIp: '',
  mobile: '',
  nickname: '',
  postIds: [],
  posts: [],
  roles: [],
  sex: 1,
  socialUsers: [],
  status: 1,
  username: ''
})

const uploadAvatar = async (option: RequestOption) => {
  const { onError, onSuccess, fileItem } = option

  const formData = new FormData()
  formData.append('avatarFile', fileItem.file as File)

  const [error, res] = await to(updatePersonAvatar(formData))
  if (error) return onError(error.message)

  user.value.avatar = res.data
  userStore.setInfo({
    userInfo: {
      user: {
        avatar: res.data
      }
    }
  })
  onSuccess(res)
  Message.success('头像上传成功')
}

// 修改用户资料
const onSbumit = async (model: UpdatePersonParams) => {
  await updatePersonInfo(model)

  getPersonInfos()
  Message.success('基本资料更新成功')
}

// 修改密码
const onPasswordSbumit = async (model: IEditPasswordModel) => {
  const { confirmPassword, ...reset } = model

  if (confirmPassword !== reset.newPassword) {
    passwordFormRef.value.setFields({
      confirmPassword: {
        status: 'error',
        message: '两次密码不一致'
      }
    })

    return
  }

  await updatePersonPassword(reset)
  Message.success('密码修改成功')
  passwordFormRef.value.setModelValues({
    newPassword: '',
    oldPassword: '',
    confirmPassword: ''
  })
}

const onReset = () => {
  router.back()
}

const getPersonInfos = async () => {
  const { data } = await getPersonInfo()
  if (data) {
    user.value = data

    baseFormRef.value.setModelValues({
      nickname: data.nickname,
      mobile: data.mobile,
      email: data.email,
      sex: data.sex
    })
  }
}

onMounted(() => {
  getPersonInfos()
})
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }
  &__item {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--color-border-1);
    padding: 0 10px;
    &:last-child {
      border-bottom: 1px solid var(--color-border-1);
    }
    span:last-child {
      color: var(--color-text-1);
    }
  }
}

.tab-content {
  margin-top: 15px;
}
.card-wrapper {
  height: 460px;
}

.upload-trigger {
  text-align: center;
}

.fz-container:last-child {
  margin: 12px 0;
}
</style>
