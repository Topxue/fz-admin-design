import request from '../request'
import { ResponseResult } from '../type'

/**
 * 获取精简用户列表
 * @description 只包含被开启的用户，主要用于前端的下拉选项
 * @returns
 */

interface IUserList {
  id: string
  nickname: string
}
export const querySimpleUserList = () => {
  return request.get<any, ResponseResult<Array<IUserList>>>(
    '/system/user/list-all-simple'
  )
}

/**
 * 查询用户分页列表
 * @param params
 * @returns
 */

export interface IQueryUserParams {
  pageNo: number
  pageSize: number
  deptId?: string
  mobile?: string
  status?: number
  username?: string
}

export interface IUserListItem {
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
  postIds: string
  sex: number
  status: number
  username: string
}

export const queryUserData = (params: IQueryUserParams) => {
  return request.get<
    IQueryUserParams,
    {
      data: {
        list: IUserListItem[]
        total: number
      }
    }
  >('/system/user/page', {
    params
  })
}

/**
 * 更新用户状态
 * @param data
 * @returns
 */

interface IUpdateUserStatusParams {
  id: string
  status: 1 | 0
}
export const updateUserStatus = (data: IUpdateUserStatusParams) => {
  return request.post<IUpdateUserStatusParams, ResponseResult<boolean>>(
    '/system/user/update-status',
    { data }
  )
}

export interface ICreateUserParasm {
  avatar: string
  deptId: string
  email: string
  mobile: string
  nickname: string
  password: string
  postIds: string[]
  sex: number
  username: string
}

/**
 * 创建用户
 * @param data
 * @returns
 */
export const createUser = (data: ICreateUserParasm) => {
  return request.post<ICreateUserParasm, ResponseResult<boolean>>(
    '/system/user/create',
    { data }
  )
}

/**
 * 获取用户详情
 * @param params
 * @returns
 */

interface IUserInfoParams {
  id: string
}

export const getUserInfo = (params: IUserInfoParams) => {
  return request.get<IUserInfoParams, ResponseResult<IUserListItem>>(
    '/system/user/get',
    {
      params
    }
  )
}

/**
 * 修改用户信息
 * @param data
 * @returns
 */

type OmitPassword = Omit<ICreateUserParasm, 'password'>
interface IUpdateUserParams extends OmitPassword {
  id: string
}

export const updateUserInfo = (data: IUpdateUserParams) => {
  return request.post('/system/user/update', { data })
}

/**
 * 修改用户密码
 * @param data
 * @returns
 */

interface IEditUserPasswordParams {
  id: string
  password: string
}

export const editUserPassword = (data: IEditUserPasswordParams) => {
  return request.post<IEditUserPasswordParams, ResponseResult<boolean>>(
    '/system/user/update-password',
    { data }
  )
}

/**
 * 删除用户
 * @param data
 * @returns
 */

interface IdeleteUserParams {
  id: string
}
export const deleteUser = (data: IdeleteUserParams) => {
  return request.post<IdeleteUserParams, ResponseResult<boolean>>(
    '/system/user/delete',
    { data }
  )
}
