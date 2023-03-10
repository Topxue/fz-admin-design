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
  return request.get('/system/auth/list-menus')
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
