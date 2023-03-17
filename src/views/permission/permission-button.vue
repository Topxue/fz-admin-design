<template>
  <div>
    <div class="margin-12">
      <a-alert :show-icon="false" type="error">
        当前用户页面权限：{{ getRole }}，当前用户按钮权限：{{ getPermissions }}
      </a-alert>
    </div>

    <div class="fz-container">
      <a-card title="切换用户演示，前端控制不同用户显示不同页面、按钮权限">
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
    <!-- 组件方式 -->
    <div class="fz-container">
      <a-card title="组件方式">
        <p class="desc">单个权限验证（:value="xxx"）</p>
        <a-space>
          <Auth :value="'system:button:add'">
            <a-button type="primary">
              <icon-plus />
              新增
            </a-button>
          </Auth>
          <Auth :value="'system:button:edit'">
            <a-button type="primary" status="warning">
              <icon-edit />
              编辑
            </a-button>
          </Auth>
          <Auth :value="'system:button:delete'">
            <a-button status="danger">
              <icon-delete />
              删除
            </a-button>
          </Auth>
          <Auth :value="'system:button:link'">
            <a-button type="primary" status="success">
              <icon-link />
              跳转
            </a-button>
          </Auth>
        </a-space>

        <p class="desc">多个权限验证，满足一个则显示（:value="[xxx,xxx]"）</p>
        <a-space>
          <Auths :value="['system:button:add']">
            <a-button type="primary">
              <icon-plus />
              新增
            </a-button>
          </Auths>
          <Auths :value="['system:button:add', 'system:button:edit']">
            <a-button type="primary" status="warning">
              <icon-edit />
              编辑
            </a-button>
          </Auths>
          <Auths :value="['system:button:delete']">
            <a-button status="danger">
              <icon-delete />
              删除
            </a-button>
          </Auths>
          <Auths :value="['system:button:link']">
            <a-button type="primary" status="success">
              <icon-link />
              跳转
            </a-button>
          </Auths>
        </a-space>
        <p class="desc">多个权限验证，全部满足则显示（:value="[xxx,xxx]"）</p>
        <a-space>
          <AuthAll
            :value="[
              'system:button:add',
              'system:button:edit',
              'system:button:delete',
              'system:button:link'
            ]"
          >
            <a-button type="primary">
              <icon-plus />
              新增
            </a-button>
          </AuthAll>
          <AuthAll
            :value="[
              'system:button:add',
              'system:button:edit',
              'system:button:delete',
              'system:button:link'
            ]"
          >
            <a-button type="primary" status="warning">
              <icon-edit />
              编辑
            </a-button>
          </AuthAll>
          <AuthAll
            :value="[
              'system:button:add',
              'system:button:edit',
              'system:button:delete',
              'system:button:link'
            ]"
          >
            <a-button status="danger">
              <icon-delete />
              删除
            </a-button>
          </AuthAll>
          <AuthAll
            :value="[
              'system:button:add',
              'system:button:edit',
              'system:button:delete',
              'system:button:link'
            ]"
          >
            <a-button type="primary" status="success">
              <icon-link />
              跳转
            </a-button>
          </AuthAll>
        </a-space>
      </a-card>
    </div>

    <div class="fz-container">
      <a-card title="指令方式（页面初始化时执行)">
        <p class="desc">单个权限验证（v-auth="xxx"）</p>
        <a-space>
          <a-button type="primary" v-auth="'system:button:add'">
            <icon-plus />
            新增
          </a-button>
          <a-button
            type="primary"
            status="warning"
            v-auth="'system:button:edit'"
          >
            <icon-edit />
            编辑
          </a-button>
        </a-space>
        <p class="desc">
          多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"））
        </p>
        <a-space>
          <a-button type="primary" v-auths="['system:button:add']">
            <icon-plus />
            新增
          </a-button>
          <a-button
            type="primary"
            status="warning"
            v-auths="['system:button:edit']"
          >
            <icon-edit />
            编辑
          </a-button>
          <a-button
            type="primary"
            status="success"
            v-auths="['system:button:edit', 'system:button:add']"
          >
            <icon-link />
            跳转
          </a-button>
        </a-space>
        <p class="desc">
          多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"））
        </p>
        <a-space>
          <a-button
            type="primary"
            v-auth-all="['system:button:edit', 'system:button:add']"
          >
            <icon-plus />
            新增
          </a-button>
          <a-button
            type="primary"
            status="warning"
            v-auth-all="['system:button:edit', 'system:button:add']"
          >
            <icon-edit />
            编辑
          </a-button>
          <a-button
            type="primary"
            status="success"
            v-auth-all="['system:button:edit', 'system:button:add']"
          >
            <icon-link />
            跳转
          </a-button>
        </a-space>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import pinia, { useUserStore } from '@/stores'
import { initBackEndControlRoutes } from '@/router/guard/backEnd'

const userStore = useUserStore(pinia)
const { userInfo } = storeToRefs(userStore)

const getRole = computed(() => userInfo.value.roles)
const getPermissions = computed(() => userInfo.value.permissions)

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
.desc {
  margin-bottom: 15px;
  &:not(:first-child) {
    margin-top: 15px;
  }
}
</style>
