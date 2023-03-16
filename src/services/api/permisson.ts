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
