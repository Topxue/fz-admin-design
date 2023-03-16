<template>
  <fz-modal
    :width="400"
    title="重置密码"
    :visible="visible"
    :ok-loading="loading"
    @cancel="handleCancle"
    @ok="handleOK"
    draggable
  >
    <template #content>
      <p class="title">请输入"{{ user.username }}"新密码</p>
      <a-input v-model="password" placeholder="请输入新密码" allow-clear />
    </template>
  </fz-modal>
</template>

<script setup lang="ts">
import to from 'await-to-js'
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

import useLoading from '@/hooks/loading'
import { editUserPassword } from '@/services/api/person'

const { loading, setLoading } = useLoading()

const props = withDefaults(
  defineProps<{
    visible: boolean
    user: {
      id: string
      username: string
    }
  }>(),
  {
    visible: false,
    user: () => ({
      id: '',
      username: ''
    })
  }
)

const emits = defineEmits<{
  (e: 'update:visible', state: boolean): void
}>()

const password = ref('')

const handleCancle = () => {
  password.value = ''
  emits('update:visible', false)
}

const handleOK = async () => {
  if (!password.value) {
    return Message.warning('请输入新密码')
  }

  setLoading(true)

  const [error] = await to(
    editUserPassword({
      id: props.user.id,
      password: password.value
    })
  )

  if (error) {
    return setLoading(false)
  }

  handleCancle()
  setLoading(false)
  Message.success('密码重置成功')
}
</script>

<style scoped lang="less">
.title {
  margin-bottom: 10px;
}
</style>
