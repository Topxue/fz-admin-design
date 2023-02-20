import useClipboard from 'vue-clipboard3'
import { Message } from '@arco-design/web-vue'

// 通用函数
export default function () {
  const { toClipboard } = useClipboard()
  // 点击复制文本
  const copyText = (text: string) => {
    return new Promise((resolve, reject) => {
      try {
        toClipboard(text)
        Message.success('复制成功！')
        resolve(text)
      } catch (e) {
        Message.error('复制失败！')
        reject(e)
      }
    })
  }

  return {
    copyText
  }
}
