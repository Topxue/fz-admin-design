import request from '../request'

// import type { RouteRecordNormalized } from 'vue-router'
// import { UserState } from '@/store/modules/user/types'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}

export function login(data: LoginData) {
  return request.post('/user/login', { data })
}

export function getUserInfo(data: { token: string }) {
  return request.post('/user/info', { data })
}

// export function logout() {
//   return request.post<LoginRes>('/api/user/logout')
// }

export function getRouteList(data: { role: 'admin' | 'user' }) {
  return request.post('/user/menu', { data })
}
