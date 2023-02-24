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
  return request.post('/api/user/login', { data })
}

export function getUserInfo(data: { username: 'admin' | 'user' }) {
  return request.post('/api/user/info', { data })
}

// export function logout() {
//   return request.post<LoginRes>('/api/user/logout')
// }

export function getRouteList(data: { role: 'admin' | 'user' }) {
  return request.post('/api/user/menu', { data })
}
