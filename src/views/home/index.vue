<template>
  <a-card class="fz-container" hoverable>Home</a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const name = ref('Ives-xue')
onMounted(() => {
  console.log(name.value)
})
</script>
<style scoped lang="less"></style>
