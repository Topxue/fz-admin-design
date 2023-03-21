import request from '../request'
import { ResponseResult } from '../type'

export interface IQueryOperateParams {
  pageNo: number
  pageSize: number
  module?: string
  success?: string
  type?: number
  userNickname?: string
  startTime?: string
}

export interface IOperateDataItem {
  content: string
  duration: number
  exts: string
  id: string
  javaMethod: string
  javaMethodArgs: string
  module: string
  name: string
  requestMethod: string
  requestUrl: string
  resultCode: number
  resultData: string
  resultMsg: string
  startTime: string
  traceId: string
  type: number
  userAgent: string
  userId: string
  userIp: string
  userNickname: string
}

export interface IQueryLoginLogerParams {
  pageNo: number
  pageSize: number
  status?: number
  userIp?: string
  username?: string
  createTime?: string[]
}

export interface ILoginLogerDataItem {
  createTime: string
  id: string
  logType: string
  result: number
  traceId: string
  userAgent: string
  userId: string
  userIp: string
  username: string
}

/**
 * 查询操作日志
 * @param params
 * @returns
 */
export const queryOperateLoger = (params: IQueryOperateParams) => {
  return request.get<
    IQueryOperateParams,
    ResponseResult<{
      list: IOperateDataItem[]
      total: number
    }>
  >('/system/operate-log/page', { params })
}

/**
 * 查询登录日志
 * @param params
 * @returns
 */
export const queryLoginLoger = (params: IQueryLoginLogerParams) => {
  return request.get<
    IQueryLoginLogerParams,
    ResponseResult<{
      list: ILoginLogerDataItem[]
      total: number
    }>
  >('/system/login-log/page', { params })
}
