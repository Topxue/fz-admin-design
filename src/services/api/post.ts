import request from '../request'
import { ResponseResult } from '../type'

/**
 * 获取岗位列表
 * @description 只包含被开启的岗位，主要用于前端的下拉选项
 * @returns
 */

interface IPostItem {
  id: string
  name: string
}
export const getOpenPostList = () => {
  return request.get<any, ResponseResult<IPostItem[]>>(
    '/system/post/list-all-simple'
  )
}

/**
 * 获取岗位分页列表
 * @param params
 * @returns
 */

export interface IQueryPostParams {
  pageNo: number
  pageSize: number
  code?: string
  name?: string
  status?: number
}

export interface IQueryPostDataItem {
  code: string
  createTime: string
  id: string
  name: string
  remark: string
  sort: number
  status: number
}
export const queryPostData = (params: IQueryPostParams) => {
  return request.get<
    IQueryPostParams,
    ResponseResult<{
      list: IQueryPostDataItem[]
      total: number
    }>
  >('/system/post/page', {
    params
  })
}

/**
 * 创建岗位
 * @param data
 */
type CreatePostParams = Omit<IQueryPostDataItem, 'id' | 'createTime'>
export const createPost = (data: CreatePostParams) => {
  return request.post<CreatePostParams, ResponseResult<boolean>>(
    '/system/post/create',
    { data }
  )
}

/**
 * 获取岗位信息
 * @param params
 * @returns
 */
export const getPostInfo = (params: { id: string }) => {
  return request.get<{ id: string }, ResponseResult<IQueryPostDataItem>>(
    '/system/post/get',
    { params }
  )
}

/**
 * 更新岗位
 * @param data
 * @returns
 */
type UpdatePostParams = Omit<IQueryPostDataItem, 'createTime'>
export const updatePost = (data: UpdatePostParams) => {
  return request.post<UpdatePostParams, ResponseResult<boolean>>(
    '/system/post/update',
    { data }
  )
}

/**
 * 删除岗位
 * @param data
 * @returns
 */
export const deletePost = (data: { id: string }) => {
  return request.post<{ id: string }, ResponseResult<boolean>>(
    '/system/post/delete',
    { data }
  )
}
