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

    <a-divider orientation="center">布局模式</a-divider>
    <ul class="layout-model">
      <a-tooltip
        :content="item.text"
        position="bottom"
        v-for="item in layoutModel"
        :key="item.model"
      >
        <li
          :class="gloablConfig.layout === item.model ? 'is-select' : ''"
          @click="changeLayout(item.model)"
        >
          <div />
          <div />
        </li>
      </a-tooltip>
    </ul>

    <a-divider orientation="center">主题色</a-divider>
    <ul class="theme-color">
      <li
        v-for="(item, index) in defaultThemeColors"
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
import { layoutModel, defaultThemeColors } from './config'

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
  primary: appConfig.value.primary,
  layout: appConfig.value.layout
})

const getThemeColorStyle = computed(() => {
  return (color: string) => {
    return { background: color }
  }
})

const changeTheme = (value: boolean) => {
  appStore.changeThemeColor(value)
}

// 切换布局
const changeLayout = (model: 'vertical' | 'horizontal' | 'mix') => {
  appStore.changeLayout(model)
}
// 切换主题
const changeThemeColor = (item: { color: string; themeColor: string }) => {
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

.is-select {
  border: 2px solid rgb(var(--primary-6));
}

.layout-model {
  margin-top: 25px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  li {
    width: 18%;
    height: 45px;
    background: #f0f2f5;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &:nth-child(1) {
      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          background: #1b2a47;
        }

        &:nth-child(2) {
          width: 70%;
          height: 30%;
          top: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }

    &:nth-child(2) {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }
      }
    }

    &:nth-child(3) {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }

        &:nth-child(2) {
          width: 30%;
          height: 70%;
          bottom: 0;
          left: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }
  }
}
</style>
