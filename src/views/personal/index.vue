<template>
  <div class="fz-container">
    <div class="header">
      <a-space :size="12" direction="vertical" align="center">
        <a-avatar :size="64">
          <template #trigger-icon>
            <icon-camera />
          </template>
          <img :src="userInfo.user.avatar" />
        </a-avatar>
        <a-typography-title :heading="6" style="margin: 0">
          {{ userInfo.user.nickname }}
        </a-typography-title>
      </a-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'

defineOptions({
  name: 'personal'
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>

<style scoped lang="less">
.fz-container {
  padding: 0;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 204px;
  color: var(--gray-10);
  background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
    no-repeat;
  background-size: cover;
  border-radius: 4px;

  :deep(.arco-avatar-trigger-icon-button) {
    color: rgb(var(--arcoblue-6));

    :deep(.arco-icon) {
      vertical-align: -1px;
    }
  }
  .user-msg {
    .arco-icon {
      color: rgb(var(--gray-10));
    }
    .arco-typography {
      margin-left: 6px;
    }
  }
}
</style>
