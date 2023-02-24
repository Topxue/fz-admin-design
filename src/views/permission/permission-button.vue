<template>
  <div>
    <div class="mr15">
      <a-alert :show-icon="false" type="error">
        当前用户页面权限：[{{
          getRole
        }}]，当前用户按钮权限：[btn.add,btn.del,btn.edit,btn.link]
      </a-alert>
    </div>

    <div class="fz-container">
      <a-card title="切换用户演示，前端控制不同用户显示不同页面、按钮权限">
        <a-row>
          <a-col :span="4">
            <a-select :default-value="getRole" @change="changeRole">
              <a-option value="admin">管理员角色</a-option>
              <a-option value="user">普通角色</a-option>
            </a-select>
          </a-col>
        </a-row>
      </a-card>
    </div>
    <!-- 组件方式 -->
    <div class="fz-containe">
      <a-card title="组件方式">
        <a-space>
          <div>
            <p class="mb-2.5 text-red-1">单个权限验证（:value="xxx"）</p>

            <Auth :value="'system:user:add'">
              <a-button>21312</a-button>
            </Auth>
          </div>
        </a-space>
      </a-card>
    </div>

    <div class="fz-container">
      <a-card title="指令方式（页面初始化时执行)">
        <a-button v-auth="'system:user:add'">21312</a-button>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import pinia, { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { initBackEndControlRoutes } from '@/router/guard/backEnd'

const userStore = useUserStore(pinia)
const { userInfo } = storeToRefs(userStore)

const getRole = computed(() => userInfo.value.role)

const changeRole = async (role: string) => {
  const data = await userStore.login({ username: role, password: '123456' })
  if (data) {
    // 刷新处理
    // window.location.reload()
    // 无刷新处理
    await initBackEndControlRoutes()
  }
}
</script>

<style scoped lang="less">
.mr15 {
  // color: var(--text-)
}
</style>
