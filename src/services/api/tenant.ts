import { ResponseResult } from '../type'
import request from '@/services/request'

// 获取详情接口
interface IGetOrDeleteParams {
  id: string
}

/**
 * 查询租户分页数据
 * @param params
 * @returns
 */

export interface IQueryTenantParams {
  pageNo: number
  pageSize: number
  contactMobile?: string
  contactName?: string
  name?: string
  status?: number
  createTime?: string[]
}

type OmitQueryParams = Required<Omit<IQueryTenantParams, 'pageNo' | 'pageSize'>>
export interface IQueryTenantDataItem extends OmitQueryParams {
  accountCount: number
  domain: string
  expireTime: string
  id: string
  packageId: string
}
export const queryTenantData = (params: IQueryTenantParams) => {
  return request.get<
    IQueryTenantParams,
    ResponseResult<{
      list: IQueryTenantDataItem[]
      total: number
    }>
  >('/system/tenant/page', { params })
}

/**
 * 获取套餐精简列表
 * @description 只包含被开启的租户套餐，主要用于前端的下拉选项
 * @returns
 */

type ITenantSimpleListResult = Array<{ id: string; name: string }>
export const getTenantSimpleList = () => {
  return request.get<any, ResponseResult<ITenantSimpleListResult>>(
    '/system/tenant-package/get-simple-list'
  )
}

/**
 * 创建租户
 * @param data
 * @returns
 */
type ICreateTenantParams = Omit<IQueryTenantDataItem, 'id'>
export const createTenant = (data: ICreateTenantParams) => {
  return request.post<ICreateTenantParams, ResponseResult<boolean>>(
    '/system/tenant/create',
    { data }
  )
}

/**
 * 更新租户
 * @param data
 * @returns
 */
export const updateTenant = (data: IQueryTenantDataItem) => {
  return request.post<IQueryTenantDataItem, ResponseResult<boolean>>(
    '/system/tenant/update',
    { data }
  )
}

/**
 * 删除租户
 * @param data
 * @returns
 */
export const deleteTenant = (data: IGetOrDeleteParams) => {
  return request.post<IGetOrDeleteParams, ResponseResult<boolean>>(
    '/system/tenant/delete',
    { data }
  )
}

/**
 * 获取租户信息
 * @param params
 * @returns
 */
export const getTenantInfo = (params: IGetOrDeleteParams) => {
  return request.get<IGetOrDeleteParams, ResponseResult<IQueryTenantDataItem>>(
    '/system/tenant/get',
    { params }
  )
}

/**
 * 创建租户套餐
 * @param data
 * @returns
 */
interface ICreateSetMealParams {
  menuIds: string[]
  name: string
  remark: string
  status: number
}
export const createTenantSetMeal = (data: ICreateSetMealParams) => {
  return request.post<ICreateSetMealParams, ResponseResult<boolean>>(
    '/system/tenant-package/create',
    { data }
  )
}

/**
 * 查询租户套餐分页列表
 * @param data
 * @returns
 */

export interface IQuerySetMealParams {
  pageNo: number
  pageSize: number
  name?: string
  status?: number
  createTime?: string[]
}

export interface ISetMealDateItem {
  createTime: string
  id: string
  menuIds: string[]
  name: string
  remark: string
  status: number
}
export const queryTenantSetMealData = (params: IQuerySetMealParams) => {
  return request.get<
    IQuerySetMealParams,
    ResponseResult<{
      list: ISetMealDateItem[]
      total: number
    }>
  >('/system/tenant-package/page', {
    params
  })
}

/**
 * 删除租户套餐
 * @param data
 * @returns
 */

export const deleteTenantSetMeal = (data: IGetOrDeleteParams) => {
  return request.post<IGetOrDeleteParams, ResponseResult<boolean>>(
    '/system/tenant-package/delete',
    { data }
  )
}

/**
 * 获取租户套餐详情
 * @param params
 * @returns
 */
export const getTenantMealInfo = (params: IGetOrDeleteParams) => {
  return request.get<IGetOrDeleteParams, ResponseResult<ISetMealDateItem>>(
    '/system/tenant-package/get',
    { params }
  )
}

/**
 * 更新租户套餐
 * @param data
 * @returns
 */
export const updateSetMeal = (data: ISetMealDateItem) => {
  return request.post<ISetMealDateItem, ResponseResult<boolean>>(
    '/system/tenant-package/update',
    { data }
  )
}
