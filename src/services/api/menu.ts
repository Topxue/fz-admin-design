import request from '@/services/request'
import { ResponseResult } from '../type'

interface IMenuParams {
  status: number
  title: string
}

interface ICreateMenuParams {
  affix: string
  component: string
  hidden: boolean
  icon: string
  iframe: boolean
  keepAlive: boolean
  link: boolean
  linkUrl: string
  name: string
  parentId: number
  path: string
  permission: string
  sort: number
  status: number
  title: string
}

/**
 * 获取菜单列表
 * @param {data}
 */
export const getMenuList = (data?: IMenuParams) => {
  return request.get<IMenuParams, ResponseResult<RouteItem>>(
    '/system/menu/menu-list',
    { data }
  )
}

/**
 * 新增菜单
 * @param data
 * @returns
 */
export const newlyIncreasedMenu = (data: ICreateMenuParams) => {
  return request.post<ICreateMenuParams, ResponseResult<Array<RouteItem>>>(
    '/system/menu/create-menu',
    { data }
  )
}

/**
 * 获取菜单详情
 * @param data
 * @returns
 */

interface IMenuDetailParams {
  menuId: string
}
export const getMenuDetail = (params: IMenuDetailParams) => {
  return request.get<IMenuDetailParams, ResponseResult<ICreateMenuParams>>(
    '/system/menu/get',
    {
      params
    }
  )
}

/**
 * 修改菜单
 */
export const editMenu = (data: ICreateMenuParams) => {
  return request.post<ICreateMenuParams, ResponseResult<boolean>>(
    '/system/menu/update-menu',
    { data }
  )
}

/**
 * 删除菜单
 */

interface IDeleteMenuParams {
  id: string
}
export const deleteMenu = (data: IDeleteMenuParams) => {
  return request.post<IDeleteMenuParams, ResponseResult<boolean>>(
    '/system/menu/delete',
    { data }
  )
}
