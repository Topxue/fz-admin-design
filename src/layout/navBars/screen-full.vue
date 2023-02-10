<template>
  <a-tooltip :content="isScreenfull ? '取消全屏' : '全屏'">
    <a-button shape="circle" @click="onScreenfullClick">
      <icon-fullscreen size="15" v-if="!isScreenfull" />
      <icon-fullscreen-exit size="15" v-else />
    </a-button>
  </a-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import screenfull from 'screenfull'
import { Message } from '@arco-design/web-vue'

const isScreenfull = ref(false)

const onScreenfullClick = () => {
  if (!screenfull.isEnabled) {
    Message.warning('暂不不支持全屏')
    return false
  }

  screenfull.toggle()
  screenfull.on('change', () => {
    isScreenfull.value = screenfull.isFullscreen
  })
}
</script>

<style scoped lang="less"></style>
