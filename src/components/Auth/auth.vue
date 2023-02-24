<template>
  <slot v-if="getUserAuthBtnList" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'

defineOptions({
  name: 'Auth'
})

// 定义父组件传过来的值
const props = withDefaults(
  defineProps<{
    value: string
  }>(),
  {
    value: ''
  }
)

// 定义变量内容
const { userInfo } = storeToRefs(useUserStore())

// 获取 pinia 中的用户权限
const getUserAuthBtnList = computed(() => {
  return userInfo.value.permissions.some((v: string) => v === props.value)
})
</script>
