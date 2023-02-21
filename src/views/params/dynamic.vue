<template>
  <div>动态路由</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const name = ref('Ives-xue')
onMounted(() => {
  console.log(name.value)
})
</script>
<style scoped lang="less"></style>
