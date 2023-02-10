<template>
  <a-drawer
    title="布局配置"
    :width="340"
    :visible="visible"
    unmountOnClose
    @cancel="handleCancel"
  >
    <a-divider orientation="center">主题</a-divider>
    <div class="setting-item">
      <a-switch
        type="round"
        @change="changeTheme"
        v-model="gloablConfig.isDark"
      >
        <template #checked-icon>
          <icon-moon-fill />
        </template>
        <template #unchecked-icon>
          <icon-sun-fill />
        </template>
      </a-switch>
    </div>

    <a-divider orientation="center">主题色</a-divider>
    <ul class="theme-color">
      <li
        v-for="(item, index) in DEFAULT_THEME_COLORS"
        :key="index"
        :style="getThemeColorStyle(item.color)"
        @click="changeThemeColor(item)"
      >
        <icon-check
          class="checked"
          v-show="gloablConfig.primary === item.color"
        />
      </li>
    </ul>
    <template #footer>
      <a-space direction="vertical" fill>
        <a-button type="primary" long>
          <template #icon>
            <icon-copy />
          </template>
          一键复制配置
        </a-button>
        <a-button long>
          <template #icon>
            <icon-undo />
          </template>
          一键恢复默认
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'

import { useAppStore } from '@/stores'
import { DEFAULT_THEME_COLORS } from './config'

withDefaults(
  defineProps<{
    visible: boolean
  }>(),
  {
    visible: false
  }
)

const emits = defineEmits<{
  (e: 'update:visible', state: boolean): void
}>()

const appStore = useAppStore()
const { appConfig } = storeToRefs(appStore)

const gloablConfig = reactive({
  isDark: appConfig.value.isDark,
  primary: appConfig.value.primary
})

const getThemeColorStyle = computed(() => {
  return (color: string) => {
    return { background: color }
  }
})

const changeTheme = (value: boolean) => {
  appStore.changeThemeColor(value)
}

// 切换主题
const changeThemeColor = (item: { color: string; themeColor: string }) => {
  console.log(item, 'item..')
  gloablConfig.primary = item.color
  appStore.changePrimaryColor(item.color)
}

const handleCancel = () => {
  emits('update:visible', false)
}
</script>

<style scoped lang="less">
.theme-color {
  display: flex;
  align-items: center;
  li {
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    &:not(:first-child) {
      margin-left: 10px;
    }

    .checked {
      color: #fff;
    }
  }
}

.setting-item {
  text-align: center;
}
</style>
