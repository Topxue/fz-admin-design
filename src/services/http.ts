import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message } from '@arco-design/web-vue'

export interface HttpResponse {
  status: number
  data?: any
  msg?: string
}

type AxiosResponseReturnTypes =
  | Promise<AxiosResponse>
  | Promise<HttpResponse>
  | any

class HttpRequest {
  #instance: any = {}
  #config = {
    baseURL: '',
    timeout: 60000
  }

  constructor(baseURL: string) {
    this.initInstance(baseURL)
  }

  initInstance(baseURL: string) {
    const config = {
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000
    }

    this.#config = config

    const instance = axios.create(config)
    this.interceptors(instance)
    this.#instance = instance
  }

  // 拦截器
  interceptors(service: AxiosInstance) {
    // 请求拦截器
    service.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        console.log(error)
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    service.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        console.log('err' + error)
        Message.error({
          content: error.message || 'Error',
          duration: 5 * 1000
        })

        return Promise.reject(error)
      }
    )
  }

  request(options: any) {
    return this.#instance(options)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosResponseReturnTypes {
    return this.request({
      method: 'get',
      url,
      ...config
    })
  }

  post(url: any, config?: AxiosRequestConfig): AxiosResponseReturnTypes {
    return this.request({
      method: 'post',
      url,
      ...config
    })
  }
}

export default HttpRequest
