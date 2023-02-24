<template>
  <div class="icon-selector-warp-row">
    <a-row v-if="props.list.length > 0">
      <a-col :span="3" v-for="(v, k) in list" :key="k" @click="onColClick(v)">
        <div
          class="icon-selector-warp-item"
          :class="{ 'icon-selector-active': prefix === v }"
        >
          <IconFont :icon="v" />
        </div>
      </a-col>
    </a-row>
    <a-empty
      :image-size="100"
      v-if="list.length <= 0"
      :description="empty"
    ></a-empty>
  </div>
</template>

<script setup lang="ts" name="iconSelectorList">
// 定义父组件传过来的值
const props = defineProps({
  // 图标列表数据
  list: {
    type: Array,
    default: () => []
  },
  // 自定义空状态描述文字
  empty: {
    type: String,
    default: () => '无相关图标'
  },
  // 高亮当前选中图标
  prefix: {
    type: String,
    default: () => ''
  }
})

// 定义子组件向父组件传值/事件
const emit = defineEmits(['get-icon'])

// 当前 icon 图标点击时
const onColClick = (v: unknown | string) => {
  emit('get-icon', v)
}
</script>

<style scoped lang="less">
.icon-selector-warp-row {
  height: 230px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 3px;
  .el-row {
    padding: 15px;
  }
  .el-scrollbar__bar.is-horizontal {
    display: none;
  }
  .icon-selector-warp-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-border-3);
    border-radius: 5px;
    margin: 0 10px 10px 10px;
    width: 30px;
    height: 30px;
    transition: all 0.3s;
    i {
      font-size: 20px;
      color: var(--color-text-2);
    }
    &:hover {
      transform: scale(1.05);
      cursor: pointer;
      border: 1px solid rgb(var(--primary-6));
      :deep i {
        color: rgb(var(--primary-6));
      }
    }
  }
  .icon-selector-active {
    border: 1px solid rgb(var(--primary-6));
    :deep i {
      color: rgb(var(--primary-6));
    }
  }
}
</style>
