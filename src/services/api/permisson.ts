import request from '../request'
import { ResponseResult } from '../type'

/**
 * 创建角色菜单权限
 * @param data
 * @returns
 */

interface ICreateMenuPermissonParams {
  roleId: string
  menuIds: string
}
export const createMenuPermisson = (data: ICreateMenuPermissonParams) => {
  return request.post<ICreateMenuPermissonParams, ResponseResult<boolean>>(
    '/system/permission/assign-role-menu',
    { data }
  )
}

/**
 * 设置用户角色
 * @param data
 * @returns
 */

interface ISetRoleParams {
  roleIds: string
  userId: string
}
export const setRole = (data: ISetRoleParams) => {
  return request.post<ISetRoleParams, ResponseResult<boolean>>(
    '/system/permission/assign-user-role',
    { data }
  )
}

/**
 * 获得用户拥有的角色编号列表
 * @param params
 * @returns
 */

interface IUserRolesParams {
  userId: string
}
export const getUserRoles = (params: IUserRolesParams) => {
  return request.get<IUserRolesParams, ResponseResult<string[]>>(
    '/system/permission/list-user-roles',
    { params }
  )
}

/**
 * 获取角色拥有的菜单编号
 * @param params
 * @returns
 */
interface IRoleMenuParams {
  roleId: string
}
export const getRoleMenuIds = (params: IRoleMenuParams) => {
  return request.get<IRoleMenuParams, ResponseResult<string[]>>(
    '/system/permission/list-role-resources',
    { params }
  )
}

/**
 * 设置角色数据权限
 * @param data
 * @returns
 */
interface IRoleDataPermissonParasm {
  dataScope: number
  dataScopeDeptIds: string[]
  roleId: string
}
export const serRoleDataPermisson = (data: IRoleDataPermissonParasm) => {
  return request.post<IRoleDataPermissonParasm, ResponseResult<boolean>>(
    '/system/permission/assign-role-data-scope',
    { data }
  )
}
