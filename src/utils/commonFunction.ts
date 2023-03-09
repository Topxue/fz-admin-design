import { Message } from '@arco-design/web-vue'
import useClipboard from 'vue-clipboard3'
import { formatDate } from './formatTime'

// 通用函数
export default function () {
  const { toClipboard } = useClipboard()

  // 百分比格式化
  const percentFormat = (
    row: EmptyArrayType,
    column: number,
    cellValue: string
  ) => {
    return cellValue ? `${cellValue}%` : '-'
  }
  // 列表日期时间格式化
  const dateFormatYMD = (
    row: EmptyArrayType,
    column: number,
    cellValue: string
  ) => {
    if (!cellValue) return '-'
    return formatDate(new Date(cellValue), 'YYYY-mm-dd')
  }
  // 列表日期时间格式化
  const dateFormatYMDHMS = (
    row: EmptyArrayType,
    column: number,
    cellValue: string
  ) => {
    if (!cellValue) return '-'
    return formatDate(new Date(cellValue), 'YYYY-mm-dd HH:MM:SS')
  }
  // 列表日期时间格式化
  const dateFormatHMS = (
    row: EmptyArrayType,
    column: number,
    cellValue: string
  ) => {
    if (!cellValue) return '-'
    let time = 0
    if (typeof row === 'number') time = row
    if (typeof cellValue === 'number') time = cellValue
    return formatDate(new Date(time * 1000), 'HH:MM:SS')
  }
  // 小数格式化
  const scaleFormat = (value = '0', scale = 4) => {
    return Number.parseFloat(value).toFixed(scale)
  }
  // 小数格式化
  const scale2Format = (value = '0') => {
    return Number.parseFloat(value).toFixed(2)
  }

  // 字符串 'true' | 'false'转 true | false
  const stringToBool = (value: string) => {
    return /^true$/i.test(value)
  }

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
    copyText,
    percentFormat,
    dateFormatYMD,
    dateFormatYMDHMS,
    dateFormatHMS,
    scaleFormat,
    scale2Format,
    stringToBool
  }
}
