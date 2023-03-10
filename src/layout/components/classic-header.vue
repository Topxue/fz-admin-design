<template>
  <a-layout-header class="layout-header" v-show="!isTagsViewCurrenFull">
    <div class="layout-header__optional">
      <div class="classic-logo" v-if="appConfig.isShowLogo">
        <img src="@/assets/images/logo.jpg" class="layout-logo-medium-img" />
        <span>{{ appConfig.globalTitle }}</span>
      </div>
      <NavbarIndex />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore, useTagsViewRoutes } from '@/stores'

const NavbarIndex = defineAsyncComponent(
  () => import('@/layout/navBars/index.vue')
)

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes()

const { appConfig } = storeToRefs(useAppStore())
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes)
</script>

<style scoped lang="less">
@import '@/style/variable.less';

.layout-header {
  position: relative;
  z-index: 9999;
  background: var(--color-bg-2);

  &__optional {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: @layoutHeader;
    padding-right: 10px;
    box-sizing: border-box;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .classic-logo {
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 20px;
    img {
      display: inline-block;
      margin-right: 10px;
      border-radius: 4px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
