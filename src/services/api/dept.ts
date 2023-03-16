import request from '@/services/request'
import { ResponseResult } from '../type'

/**
 * 获取部门列表
 */

export interface IQueryDeptListParams {
  name?: string
  status?: number
}
type IOpenDeptDataItem = Omit<IOpenDeptData, 'children'>
export interface IQueryDeptListDataItem extends IOpenDeptDataItem {
  createTime: string
  leaderUserId?: string
  status: number
  children?: Array<IQueryDeptListDataItem>
}
export const querySystemDeptList = (params?: IQueryDeptListParams) => {
  return request.get<
    IQueryDeptListParams,
    ResponseResult<Array<IQueryDeptListDataItem>>
  >('/system/dept/list', { params })
}

/**
 * 获取部门精简信息列表
 * @param {onlyCompany} 是否只包含企业
 * @description 只包含被开启的部门，主要用于前端的下拉选项
 */

export interface IOpenDeptData {
  children?: Array<IOpenDeptData>
  id: string
  name: string
  parentId: string
  sort: number
  type: 1 | 2
}

export const queryOpenDeptList = (params: { onlyCompany: boolean }) => {
  return request.get<
    { onlyCompany: boolean },
    ResponseResult<Array<IOpenDeptData>>
  >('/system/dept/list-all-simple', {
    params
  })
}

/**
 * 创建组织
 * @description 创建部门/公司
 */
interface ICreateOrgParams {
  leaderUserId: string
  name: string
  parentId: string
  sort: number
  status: number
  type: number
}
export const createOrganization = (data: ICreateOrgParams) => {
  return request.post<ICreateOrgParams, ResponseResult<boolean>>(
    '/system/dept/create',
    { data }
  )
}

/**
 * 删除组织
 */

interface IDeleteOrgParams {
  id: string
}
export const deleteOrganization = (data: IDeleteOrgParams) => {
  return request.post<IDeleteOrgParams, ResponseResult<boolean>>(
    '/system/dept/delete',
    { data }
  )
}

/**
 * 获取组织信息
 * @param params
 * @returns
 */

interface IOrgInfoParams {
  id: string
}

export const getOrgInfo = (params: IOrgInfoParams) => {
  return request.get<IOrgInfoParams, ResponseResult<IQueryDeptListDataItem>>(
    '/system/dept/get',
    { params }
  )
}

/**
 * 更新组织信息
 * @param data
 * @returns
 */

interface IUpdateOrgPrams extends ICreateOrgParams {
  id: string
}
export const updateOrgInfo = (data: IUpdateOrgPrams) => {
  return request.post<IUpdateOrgPrams, ResponseResult<boolean>>(
    '/system/dept/update',
    { data }
  )
}
