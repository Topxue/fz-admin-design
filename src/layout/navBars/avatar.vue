<template>
  <a-dropdown @select="handleSelect" trigger="hover">
    <div class="avatar-wrapper">
      <a-avatar :size="30">
        <img :src="userInfo.avatar" />
      </a-avatar>
      <span class="user-name">{{ userInfo.name }}</span>
      <icon-down />
    </div>
    <template #content>
      <a-doption value="personal">个人中心</a-doption>
    </template>
    <template #footer>
      <a-doption value="loginOut">退出登录</a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const handleSelect = (type: string) => {
  if (type === 'loginOut') {
    userStore.loginOut()
  }
}
</script>

<style scoped lang="less">
.avatar-wrapper {
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  .user-name {
    display: inline-block;
    margin: 0 6px;
  }
}
</style>
