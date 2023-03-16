/**
 * 手机号正则校验
 * @param value
 * @returns Boolean
 */
export const phoneValidate = (value: string) => {
  return /^[1][3,4,5,7,8,2,6,9][0-9]{9}$/.test(value)
}

/**
 * 用户账号由 数字、字母 组成 | 4-30位
 * @param value
 * @returns
 */
export const accountValidate = (value: string) => {
  return /^[a-zA-Z0-9]{4,30}$/.test(value)
}
