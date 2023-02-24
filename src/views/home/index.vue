<template>
  <div class="container">
    <a-row :gutter="15" class="home-card-one mb15">
      <a-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        v-for="(v, k) in state.homeOne"
        :key="k"
        :class="{ 'home-media home-media-lg': k > 1, 'home-media-sm': k === 1 }"
      >
        <a-card class="item-card" hoverable>
          <div class="item-card__body">
            <div class="info">
              <span>{{ v.num1 }}</span>
              <span :style="{ color: v.color1 }">{{ v.num2 }}%</span>
              <div>{{ v.num3 }}</div>
            </div>
            <div :style="{ background: `rgb(var(${v.color2}))` }">
              <i :class="v.num4" :style="{ color: `var(${v.color3})` }" />
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  global: {
    homeChartOne: null,
    homeChartTwo: null,
    homeCharThree: null,
    dispose: [null, '', undefined]
  } as any,
  homeOne: [
    {
      num1: '125,12',
      num2: '-12.32',
      num3: '成交金额',
      num4: 'fa fa-meetup',
      color1: '#FF6462',
      color2: '--primary-6-lighter',
      color3: '--primary-6'
    },
    {
      num1: '653,33',
      num2: '+42.32',
      num3: '月度计划信息',
      num4: 'iconfont icon-morentouxiang',
      color1: '#6690F9',
      color2: '--next-color-success-lighter',
      color3: '--success-1'
    },
    {
      num1: '125,65',
      num2: '+17.32',
      num3: '年度计划信息',
      num4: 'iconfont icon-zaosheng',
      color1: '#6690F9',
      color2: '--next-color-warning-lighter',
      color3: '--el-color-warning'
    },
    {
      num1: '520,43',
      num2: '-10.01',
      num3: '访问统计信息',
      num4: 'fa fa-github-alt',
      color1: '#FF6462',
      color2: '--next-color-danger-lighter',
      color3: '--el-color-danger'
    }
  ],
  homeThree: [
    {
      icon: 'iconfont icon-yangan',
      label: '浅粉红',
      value: '2.1%OBS/M',
      iconColor: '#F72B3F'
    },
    {
      icon: 'iconfont icon-wendu',
      label: '深红(猩红)',
      value: '30℃',
      iconColor: '#91BFF8'
    },
    {
      icon: 'iconfont icon-shidu',
      label: '淡紫红',
      value: '57%RH',
      iconColor: '#88D565'
    },
    {
      icon: 'iconfont icon-shidu',
      label: '弱紫罗兰红',
      value: '107w',
      iconColor: '#88D565'
    },
    {
      icon: 'iconfont icon-zaosheng',
      label: '中紫罗兰红',
      value: '57DB',
      iconColor: '#FBD4A0'
    },
    {
      icon: 'iconfont icon-zaosheng',
      label: '紫罗兰',
      value: '57PV',
      iconColor: '#FBD4A0'
    },
    {
      icon: 'iconfont icon-zaosheng',
      label: '暗紫罗兰',
      value: '517Cpd',
      iconColor: '#FBD4A0'
    },
    {
      icon: 'iconfont icon-zaosheng',
      label: '幽灵白',
      value: '12kg',
      iconColor: '#FBD4A0'
    },
    {
      icon: 'iconfont icon-zaosheng',
      label: '海军蓝',
      value: '64fm',
      iconColor: '#FBD4A0'
    }
  ],
  myCharts: [] as EmptyArrayType,
  charts: {
    theme: '',
    bgColor: '',
    color: '#303133'
  }
})
</script>

<style scoped lang="less">
.container {
  padding: 10px;

  .item-card {
    padding: 10px;
    box-sizing: border-box;
    &__body {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .info {
      span:first-child {
        font-size: 22px;
        font-weight: 500;
      }
    }
  }
}
</style>
