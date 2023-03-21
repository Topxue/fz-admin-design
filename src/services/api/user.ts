import request from '@/services/request'
import { ResponseResult } from '../type'

export interface LoginData {
  username: string
  password: string
}

type LoginResponse = {
  /** `token` */
  accessToken: string
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string
  /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
  expiresTime: string
  userId: string
}

export type RefreshTokenResult = {
  code: number
  data: LoginResponse
  msg: string
}

// 个人中心-用户信息接口
export interface IPersonInfo {
  avatar: string
  createTime: string
  dept: {
    id: string
    name: string
  }
  deptId: string
  email: string
  id: string
  loginDate: string
  loginIp: string
  mobile: string
  nickname: string
  postIds: string[]
  posts: Array<{ id: string; name: string }>
  roles: Array<{ id: string; name: string }>
  sex: number
  socialUsers: Array<{ openid: string; type: number }>
  status: number
  username: string
}

/**
 * 登录
 */
export function login(data: LoginData) {
  return request.post<LoginData, ResponseResult<LoginResponse>>(
    '/system/auth/login',
    {
      data
    }
  )
}

/**
 * 退出登录
 */
export const loginOut = () => {
  return request.post<any, ResponseResult<boolean>>('/system/auth/logout')
}

/**
 * 获取用户信息
 * @param {tender_id} 租户编号
 */
export function getUserInfo() {
  return request.get('/system/auth/get-permission-info')
}

/**
 * 获取登录用户的路由菜单列表
 * @param {tender_id} 租户编号
 */
export function getRouteList() {
  return request.get<unknown, ResponseResult<Array<RouteItem>>>(
    '/system/auth/list-menus'
  )
}

/**
 * 刷新令牌
 * @param {refreshToken} 刷新token
 */

type RefreshTokenParams = Pick<LoginResponse, 'refreshToken'>

export const refreshTokenApi = (data: RefreshTokenParams) => {
  return request.post<RefreshTokenParams, RefreshTokenResult>(
    '/system/auth/refresh-token',
    { data }
  )
}

/**
 * 获取登录用户信息（个人中心）
 * @returns
 */
export const getPersonInfo = () => {
  return request.get<any, ResponseResult<IPersonInfo>>(
    '/system/user/profile/get'
  )
}

/**
 * 修改用户信息（个人中心）
 * @param data
 * @returns
 */

export type UpdatePersonParams = Pick<
  IPersonInfo,
  'nickname' | 'mobile' | 'email' | 'sex'
>

export const updatePersonInfo = (data: UpdatePersonParams) => {
  return request.post<UpdatePersonParams, ResponseResult<boolean>>(
    '/system/user/profile/update',
    { data }
  )
}

/**
 * 修改用户密码（个人中心）
 * @param data
 * @returns
 */

export interface IUpdatePasswordParams {
  newPassword: string
  oldPassword: string
}
export const updatePersonPassword = (data: IUpdatePasswordParams) => {
  return request.post<IUpdatePasswordParams, ResponseResult<boolean>>(
    '/system/user/profile/update-password',
    { data }
  )
}

/**
 * 上传用户头像（个人中心）
 * @param data
 * @returns
 */

export const updatePersonAvatar = (data: FormData) => {
  return request.post<FormData, ResponseResult<string>>(
    '/system/user/profile/update-avatar',
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    }
  )
}
