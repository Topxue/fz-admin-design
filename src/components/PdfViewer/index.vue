<template>
  <a-spin class="loading" :loading="loading" tip="加载中...">
    <div class="pdf-wrapper">
      <div class="pdf-wrapper__header">工具栏</div>
      <div class="pdf-wrapper__content">
        <vue-pdf-embed
          v-if="state.pdfUrl"
          ref="pdfRef"
          :source="state.pdfUrl"
          :page="state.page"
          @password-requested="handlePasswordRequest"
          @rendered="handleDocumentRender"
        />
      </div>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'

const pdfRef = ref()
const loading = ref(true)

const state = reactive({
  page: undefined,
  pageCount: 1,
  pdfUrl:
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
})

const handleDocumentRender = () => {
  console.log('pageCount...')
  loading.value = false
}

const handlePasswordRequest = (callback: Function, retry: any) => {
  console.log(callback, retry, 'callback, retry..')
  // callback(prompt(retry ? 'Enter password again' : 'Enter password'))
}
</script>

<style scoped lang="less">
.loading {
  width: 100%;
}
.pdf-wrapper {
  &__header {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    background-color: red;
    color: var(--color-white);
  }
  &__content {
    width: 100%;
    height: calc(100vh - 270px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
