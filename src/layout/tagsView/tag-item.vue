<template>
  <a-dropdown
    trigger="contextMenu"
    :popup-max-height="false"
    @select="actionSelect"
  >
    <slot></slot>
    <template #content>
      <a-doption :value="Eaction.reload">
        <template #icon>
          <icon-refresh />
        </template>
        重新加载
      </a-doption>
      <a-doption
        :value="Eaction.current"
        class="sperate-line"
        :disabled="disabledCurrent"
      >
        <template #icon>
          <icon-close />
        </template>
        <span>关闭当前标签页</span>
      </a-doption>
      <!-- <a-doption :disabled="disabledLeft" :value="Eaction.left">
        <template #icon>
          <icon-to-left />
        </template>
        <span>关闭左侧标签页</span>
      </a-doption>
      <a-doption
        class="sperate-line"
        :disabled="disabledRight"
        :value="Eaction.right"
      >
        <template #icon>
          <icon-to-right />
        </template>
        <span>关闭右侧标签页</span>
      </a-doption> -->
      <a-doption :value="Eaction.others">
        <template #icon>
          <icon-swap />
        </template>
        关闭其他标签页
      </a-doption>
      <a-doption :value="Eaction.all" class="sperate-line">
        <template #icon>
          <icon-folder-delete />
        </template>
        关闭全部标签页
      </a-doption>
      <a-doption :value="Eaction.screenFull">
        <template #icon>
          <icon-fullscreen />
        </template>
        当前页全屏
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// import { storeToRefs } from 'pinia'
import { Eaction, TEaction } from './types'
// import { useTagsViewRoutes } from '@/stores'

const props = withDefaults(
  defineProps<{
    index: number
    tagData: RouteItem
  }>(),
  {
    index: 0
  }
)

const disabledCurrent = computed(() => {
  return props.index === 0
})

// const disabledLeft = computed(() => {
//   return [0, 1].includes(props.index)
// })

// const disabledRight = computed(() => {
//   const { tagsViewList } = storeToRefs(useTagsViewRoutes())

//   return props.index === tagsViewList.value.length - 1
// })

const emits = defineEmits<{
  (
    e: 'eaction',
    payloade: {
      type: TEaction
      index: number
    }
  ): void
}>()

const actionSelect = (value: TEaction) => {
  emits('eaction', {
    type: value,
    index: props.index
  })
}
</script>

<style scoped lang="less">
.sperate-line {
  border-bottom: 1px solid var(--color-neutral-3);
}
</style>
