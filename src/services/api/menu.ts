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
 * 获取开启的菜单列表
 * @description 只包含被开启的菜单，用于【角色分配菜单】功能的选项。在多租户的场景下，会只返回租户所在套餐有的菜单
 */
export const queryOpenMenuList = () => {
  return request.get<unknown, ResponseResult<RouteItem>>(
    '/system/menu/list-all-simple'
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
export const deleteMenu = (data?: IDeleteMenuParams) => {
  return request.post<IDeleteMenuParams, ResponseResult<boolean>>(
    '/system/menu/delete',
    { data }
  )
}

/**
 * 创建按钮
 */
interface ICreateButtonParams {
  parentId: string
  permission: string
  sort: number
  status: number
  title: string
}
export const createButton = (data: ICreateButtonParams) => {
  return request.post<ICreateButtonParams, ResponseResult<boolean>>(
    '/system/menu/create-button',
    { data }
  )
}

/**
 * 获取菜单下的按钮列表
 * @param params
 * @returns
 */
interface IMenuButtonListParams {
  menuId: string
}

export interface IMenButtonListData extends ICreateButtonParams {
  createTime: string
  id: string
}

export const getMenuButtonList = (params: IMenuButtonListParams) => {
  return request.get<IMenuButtonListParams, ResponseResult<IMenButtonListData>>(
    '/system/menu/button-list',
    { params }
  )
}

/**
 * 修改按钮
 */

interface IUpdateButtonParams extends ICreateButtonParams {
  id: string
}
export const updateMenuButton = (data: IUpdateButtonParams) => {
  return request.post<IUpdateButtonParams, ResponseResult<boolean>>(
    '/system/menu/update-button',
    { data }
  )
}
