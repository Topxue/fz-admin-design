import request from '../request'
import { ResponseResult } from '../type'

/**
 * 查询角色列表数据
 * @param params
 * @returns
 */

export interface IQueryRoleParams {
  pageNo: number
  pageSize: number
  code?: string
  name?: string
  status?: number
  createTime?: string[]
}

export interface IRoleDataItem {
  code: string
  createTime: string
  creator: string
  dataScope: number
  dataScopeDeptIds: string[]
  deleted: boolean
  id: string
  name: string
  remark: string
  sort: number
  status: number
  type: number
  updateTime: string
  updater: string
}

export const queryRoleData = (params: IQueryRoleParams) => {
  return request.get<
    IQueryRoleParams,
    ResponseResult<{
      list: IRoleDataItem[]
      total: number
    }>
  >('/system/role/page', { params })
}

/**
 * 获取角色精简列表
 * @description 只包含被开启的角色，主要用于前端的下拉选项
 */
export const queryOpenRoleList = () => {
  return request.get<any, ResponseResult<any>>('/system/role/list-all-simple')
}

/**
 * 修改角色状态
 * @param data
 * @returns
 */
interface IUpdateRoleStatus {
  id: string
  status: 1 | 0
}
export const updateRoleStatus = (data: IUpdateRoleStatus) => {
  return request.post<IUpdateRoleStatus, ResponseResult<boolean>>(
    '/system/role/update-status',
    { data }
  )
}

/**
 * 创建角色
 * @param data
 * @returns
 */

interface ICreateRoleParams {
  code: string
  name: string
  remark: string
  sort: number
}
export const createRole = (data: ICreateRoleParams) => {
  return request.post<ICreateRoleParams, ResponseResult<boolean>>(
    '/system/role/create',
    { data }
  )
}

/**
 * 获取角色详情
 * @param params
 * @returns
 */

interface IRoleInfoParams {
  id: string
}
export const getRoleInfo = (params: IRoleInfoParams) => {
  return request.get<IRoleInfoParams, ResponseResult<IRoleDataItem>>(
    '/system/role/get',
    {
      params
    }
  )
}

/**
 * 更新角色
 * @param data
 * @returns
 */

interface IUpdateRoleParams extends ICreateRoleParams {
  id: string
}
export const updateRoleInfo = (data: IUpdateRoleParams) => {
  return request.post<IUpdateRoleParams, ResponseResult<boolean>>(
    '/system/role/update',
    { data }
  )
}

/**
 * 删除角色
 * @param data
 * @returns
 */
interface IDeleteRoleParams {
  id: string
}
export const deleteRole = (data: IDeleteRoleParams) => {
  return request.post<IDeleteRoleParams, ResponseResult<boolean>>(
    '/system/role/delete',
    { data }
  )
}
