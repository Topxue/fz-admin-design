/*
 * @Author: caohao
 * @Date: 2022-04-21 10:20:47
 * @LastEditors: caohao
 * @LastEditTime: 2022-05-03 10:35:03
 * @Description:
 */
import HttpRequest from './http'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const request = new HttpRequest(BASE_URL)

export default request
