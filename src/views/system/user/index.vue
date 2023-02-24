<template>
  <div class="fz-container">
    <a-card title="用户管理"></a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const name = ref('Ives-xue')
onMounted(() => {
  console.log(name.value)
})
</script>
<style scoped lang="less"></style>
