<template>
  <div>
    <div class="margin-15">
      <a-alert :show-icon="false" type="error">
        模拟后台根据不同角色返回对应路由，观察左侧菜单变化（管理员角色可查看系统管理菜单、普通角色不可查看系统管理菜单）
      </a-alert>
    </div>

    <div class="fz-container">
      <a-card :title="`当前角色：${getRole}`">
        <a-row>
          <a-col :span="4">
            <a-select :default-value="getRole" @change="changeRole">
              <a-option value="super_admin">超级管理员角色</a-option>
              <a-option value="user">普通角色</a-option>
            </a-select>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'
import { initBackEndControlRoutes } from '@/router/guard/backEnd'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const getRole = computed(() => userInfo.value.roles[0])

const changeRole = async (role: string) => {
  const data = await userStore.login({ username: role, password: '123456' })
  if (data) {
    // 刷新处理
    // window.location.reload()
    // 无感刷新处理
    await initBackEndControlRoutes()
  }
}
</script>

<style scoped lang="less"></style>
