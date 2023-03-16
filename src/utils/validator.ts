import { accountValidate, phoneValidate } from './validate'

type Callback = (error?: string) => void

/**
 * url 处理
 * @param val 当前值字符串
 * @returns 返回 true: url 正确
 */
export function verifyUrl(val: string) {
  // false: url不正确
  if (
    !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      val
    )
  )
    return false
  // true: url正确
  else return true
}

/**
 * 手机号正则校验
 * @param value
 * @param callback
 * @returns
 */
export const phoneValidator = (value: string, callback: Callback) => {
  if (value && !phoneValidate(value)) {
    callback('您输入的手机号有误，请重新输入')
  }
}

/**
 * 校验用户账号
 * @param value
 * @param callback
 */
export const accountValidator = (value: string, callback: Callback) => {
  if (value && !accountValidate(value)) {
    callback('用户账号长度为4-30个字符')
  }
}
