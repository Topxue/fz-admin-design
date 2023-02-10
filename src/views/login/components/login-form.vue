<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">登录</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '请输入账号' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.username" placeholder="请输入用户名">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          placeholder="请输入密码"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions"></div>
        <a-button type="primary" html-type="submit" long>登录</a-button>
        <a-button type="text" long class="login-form-register-btn">
          注册
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { ValidatedError } from '@arco-design/web-vue/es/form/interface'

import { useUserStore } from '@/stores'
import { formatAxis } from '@/utils/formatTime'
import { initBackEndControlRoutes } from '@/router/guard/backEnd'

const store = useUserStore()
const route = useRoute()
const router = useRouter()

const errorMessage = ref('')

const userInfo = reactive({
  username: 'admin',
  password: 'admin'
})

// 时间获取
const currentTime = computed(() => {
  return formatAxis(new Date())
})

const handleSubmit = async ({
  errors,
  values
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) => {
  if (!errors) {
    const data = await store.login(values as typeof userInfo)
    if (!data) return

    // 添加完动态路由，再进行 router 跳转
    const isNoPower = await initBackEndControlRoutes()
    // 执行完 initBackEndControlRoutes，再执行 signInSuccess
    signInSuccess(isNoPower)
  }
}

// 登录成功后的跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
  if (isNoPower) {
    Message.warning('抱歉，您没有登录权限')
    store.resetInfo()
  } else {
    // 初始化登录成功时间问候语
    let currentTimeInfo = currentTime.value
    // 登录成功，跳到转首页
    // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
    if (route.query?.redirect) {
      router.push({
        path: <string>route.query?.redirect,
        query:
          Object.keys(<string>route.query?.params).length > 0
            ? JSON.parse(<string>route.query?.params)
            : ''
      })
    } else {
      router.push('/')
    }
    // 登录成功提示
    Message.success(`${currentTimeInfo}，欢迎回来👏🏻`)
  }
}
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-3);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
