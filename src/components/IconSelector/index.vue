<template>
  <a-input disabled v-model="state.iconValue">
    <template #append>
      <a-popover
        trigger="click"
        position="br"
        :content-style="{ width, padding: 0 }"
      >
        <IconFont :icon="state.iconValue" />
        <template #content>
          <div class="select-content">
            <div class="select-content__search">
              <a-input
                placeholder="请输入内容搜索图标或选择图标"
                v-model="state.fontIconSearch"
              />
            </div>

            <a-tabs
              v-model:active-key="state.fontIconTabActive"
              default-active-key="ali"
              animation
              lazy-load
              @tab-click="onTabClick"
            >
              <a-tab-pane key="ali" title="ali">
                <IconList
                  :list="fontIconSheetsFilterList"
                  :prefix="state.fontIconPrefix"
                  @get-icon="onIconClick"
                />
              </a-tab-pane>
              <a-tab-pane key="arco" title="arco">
                <IconList
                  :list="fontIconSheetsFilterList"
                  :prefix="state.fontIconPrefix"
                  @get-icon="onIconClick"
                />
              </a-tab-pane>
              <a-tab-pane key="awe" title="awe">
                <IconList
                  :list="fontIconSheetsFilterList"
                  :prefix="state.fontIconPrefix"
                  @get-icon="onIconClick"
                />
              </a-tab-pane>
            </a-tabs>

            <div class="page-wrapper">
              <a-pagination
                :total="pages.total"
                v-model:current="pages.page"
                :page-size="pages.limit"
                @change="changePage"
              />
            </div>
          </div>
        </template>
      </a-popover>
    </template>
  </a-input>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed, watch } from 'vue'

import IconList from './list.vue'
import { deepClone } from '@/utils'
import initIconfont from '@/utils/getStyleSheets'

defineOptions({
  name: 'IconSelector'
})

type IconType = 'ali' | 'arco' | 'awe'

type IState<T> = {
  iconValue: string
  fontIconSearch: string
  fontIconPrefix: string
  fontIconTabActive: IconType
  fontIconList: {
    ali: T[]
    arco: T[]
    awe: T[]
  }
}

const state = reactive<IState<string>>({
  iconValue: 'fa fa-hand-o-up',
  fontIconSearch: '',
  fontIconPrefix: '',
  fontIconTabActive: 'ali',
  fontIconList: {
    ali: [],
    arco: [],
    awe: []
  }
})

const cloneIconList = reactive<IState<string>['fontIconList']>({
  ali: [],
  arco: [],
  awe: []
})

const pages = reactive({
  page: 1,
  limit: 49,
  total: 0
})

// 定义父组件传过来的值
const props = defineProps({
  width: {
    type: String,
    default: '390px'
  },
  modelValue: String
})

// 定义子组件向父组件传值/事件
const emit = defineEmits(['update:modelValue'])

// 图标搜索及图标数据显示
const fontIconSheetsFilterList = computed(() => {
  const list = fontIconTabNameList()

  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  pages.total = cloneIconList[state.fontIconTabActive].length

  if (!state.fontIconSearch) return list.slice(1, pages.limit)

  let search = state.fontIconSearch.trim().toLowerCase()
  return cloneIconList[state.fontIconTabActive].filter((item: string) => {
    if (item.toLowerCase().indexOf(search) !== -1) return item
  })
})

// 根据 tab name 类型设置图标
const fontIconTabNameList = () => {
  let iconList: string[] = []
  if (state.fontIconTabActive === 'ali') iconList = state.fontIconList.ali
  else if (state.fontIconTabActive === 'arco')
    iconList = state.fontIconList.arco
  else if (state.fontIconTabActive === 'awe') iconList = state.fontIconList.awe

  return iconList
}

// 处理 icon 类型，用于回显时，tab 高亮与初始化数据
const initFontIconName = () => {
  let name: any = 'ali'
  if (props.modelValue!.indexOf('iconfont') > -1) name = 'ali'
  else if (props.modelValue!.indexOf('fa') > -1) name = 'awe'
  else name = 'arco'
  // 初始化 tab 高亮回显
  state.fontIconTabActive = name
  return name
}

// 处理 icon 双向绑定数值回显
const initModeValueEcho = () => {
  ;(<string | undefined>state.fontIconPrefix) = props.modelValue
  return ((<string | undefined>state.iconValue) = props.modelValue
    ? props.modelValue
    : 'fa fa-hand-o-up')
}

// 初始化数据
const initFontIconData = async (name: IconType) => {
  if (name === 'ali') {
    // 阿里字体图标使用 `iconfont xxx`
    if (state.fontIconList.ali.length > 0) return
    await initIconfont.ali().then((res: any) => {
      state.fontIconList.ali = res.map((i: string) => `iconfont ${i}`)
    })
  } else if (name === 'arco') {
    // arco design 图标
    if (state.fontIconList.arco.length > 0) return
    await initIconfont.arco().then((res: any) => {
      state.fontIconList.arco = res
    })
  } else if (name === 'awe') {
    if (state.fontIconList.awe.length > 0) return
    await initIconfont.awe().then((res: any) => {
      state.fontIconList.awe = res.map((i: string) => `fa ${i}`)
    })
  }

  state.iconValue = props.modelValue as string
  // 深度clone FontList
  cloneIconList[name] = deepClone(state.fontIconList[name])
  // 初始化双向绑定回显
  initModeValueEcho()
}

// 切换分页
const changePage = (page: number) => {
  const iconList = cloneIconList[state.fontIconTabActive]

  const pageData = iconList.slice(
    (page - 1) * pages.limit,
    pages.limit * (page - 1) + pages.limit
  )

  state.fontIconList[state.fontIconTabActive] = pageData
}

// 图标点击切换
const onTabClick = (panName: string | number) => {
  pages.page = 1
  changePage(1)
  initFontIconData(panName as IconType)
}

const onIconClick = (iconName: string) => {
  state.iconValue = iconName
  state.fontIconPrefix = iconName
  emit('update:modelValue', state.iconValue)
}

// 页面加载时
onMounted(() => {
  initFontIconData('ali')
})

// 监听双向绑定 modelValue 的变化
watch(
  () => props.modelValue,
  () => {
    initModeValueEcho()
    initFontIconName()
  }
)
</script>

<style scoped lang="less">
.select-content {
  padding: 10px 0;
  &__search {
    padding: 0 10px 10px 10px;
    border-bottom: 1px dashed var(--color-neutral-3);
  }
  .icon-content {
    height: 300px;
    padding: 0 15px;
    &__item {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--color-border-3);
      padding: 5px;
      cursor: pointer;
      &:hover {
        color: rgb(var(--primary-6));
        border-color: rgb(var(--primary-6));
      }
      transition: all 0.3s;
    }
  }
}

.content-wrapper {
  width: 100%;
}

.page-wrapper {
  display: flex;
  justify-content: center;
  width: 390px;
  overflow: hidden;
  padding: 10px 20px 0 20px;
}
</style>
