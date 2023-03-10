<template>
  <a-card title="打印（报表、图表、图片）" class="fz-container">
    <template #extra>
      <div class="extra-wrapper">
        <a-select class="extra-select" v-model="printNode">
          <a-option value=".table">Table</a-option>
          <a-option value=".echart">Echart</a-option>
          <a-option value=".image">Image</a-option>
        </a-select>
        <a-button type="primary" class="print-button" @click="onPrint">
          打印
        </a-button>
      </div>
    </template>
    <h3 class="panel">Table</h3>
    <a-table :columns="columns" :data="data" class="table" />
    <a-divider />
    <h3 class="panel">Echart</h3>
    <div class="echart" style="height: 300px" ref="echartRef"></div>

    <a-divider />
    <h3 class="panel">Image</h3>
    <div>
      <img
        src="https://s2.loli.net/2022/10/31/6SzsNWChtIHkj5b.jpg"
        alt="avatars"
        class="image"
        style="width: 200px; height: 200px; margin: 50px auto"
      />
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Print from '@/utils/print'
import * as echarts from 'echarts'

const echartRef = ref()
const printNode = ref('')

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Salary',
    dataIndex: 'salary'
  },
  {
    title: 'Address',
    dataIndex: 'address'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]
const data = reactive([
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com'
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com'
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com'
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
  }
])

const onPrint = () => {
  if (printNode.value) Print(printNode.value).toPrint
}

onMounted(() => {
  const myChart = echarts.init(echartRef.value)

  myChart.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })
})
</script>

<style scoped lang="less">
.extra-wrapper {
  display: flex;
  justify-content: space-between;

  :deep .extra-select {
    width: 100px;
  }

  .print-button {
    margin-left: 10px;
  }
}
.panel {
  font-weight: 500;
  margin-bottom: 10px;
  color: var(--color-text-1);
}
</style>
