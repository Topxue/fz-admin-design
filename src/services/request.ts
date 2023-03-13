import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer
} from 'axios'
import {
  FzHttpError,
  RequestMethods,
  FzHttpResponse,
  FzHttpRequestConfig,
  AxiosResponseReturnTypes
} from './type'
import { stringify } from 'qs'
import { useUserStore } from '@/stores'
import NProgress from '@/utils/progress'
import { Message } from '@arco-design/web-vue'

// SUCCESS_CODE
const ERROR_OK = 200
// 登录错误相关状态码
const LOGIN_ERROR_CODE = [401, 403]

/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
const whiteList = ['/system/auth/refresh-token', '/system/auth/login']

const baseURL = import.meta.env.VITE_API_BASE_URL

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL,
  // 请求超时时间
  timeout: 60000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
}

/** 格式化token（jwt格式） */
const formatToken = (token: string): string => {
  return 'Bearer ' + token
}

const setRequestHeaders = (config: FzHttpRequestConfig, token: string) => {
  if (config.headers) {
    config.headers['tenant_id'] = 1
    config.headers['Authorization'] = formatToken(token)
  }
}

class FzHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** token过期后，暂存待执行的请求 */
  private static requests: Array<(token: string) => void> = []

  /** 防止重复刷新token */
  private static isRefreshing = false

  /** 初始化配置对象 */
  private static initConfig: FzHttpRequestConfig = {}

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 重连原始请求 */
  private static retryOriginalRequest(config: FzHttpRequestConfig) {
    return new Promise((resolve) => {
      FzHttp.requests.push((token: string) => {
        // 设置请求headers
        setRequestHeaders(config, token)

        resolve(config)
      })
    })
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    FzHttp.axiosInstance.interceptors.request.use(
      async (config: FzHttpRequestConfig | any) => {
        const users = useUserStore()
        // 设置请求headers
        setRequestHeaders(config, users.getToken)

        // 开启进度条动画
        NProgress.start()
        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config)
          return config
        }
        if (FzHttp.initConfig.beforeRequestCallback) {
          FzHttp.initConfig.beforeRequestCallback(config)
          return config
        }

        if (whiteList.some((v) => config.url.indexOf(v) > -1)) {
          return config
        } else {
          return new Promise((resolve) => {
            if (users.getToken) {
              const now = new Date().getTime()
              const expiredTime = new Date(users.expiresTime)?.getTime() || -1
              const expired = expiredTime - now <= 0

              if (expired) {
                if (!FzHttp.isRefreshing) {
                  FzHttp.isRefreshing = true
                  // token过期刷新
                  useUserStore()
                    .handRefreshToken({ refreshToken: users.refreshToken })
                    .then((res) => {
                      const token = res.data.accessToken
                      setRequestHeaders(config, token)
                      FzHttp.requests.forEach((cb) => cb(token))
                      FzHttp.requests = []
                    })
                    .finally(() => {
                      FzHttp.isRefreshing = false
                    })
                }
                resolve(FzHttp.retryOriginalRequest(config) as any)
              } else {
                setRequestHeaders(config, users.getToken)
                resolve(config)
              }
            } else {
              resolve(config)
            }
          })
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = FzHttp.axiosInstance

    instance.interceptors.response.use(
      (response: FzHttpResponse) => {
        const $config = response.config
        // 关闭进度条动画
        NProgress.done()

        // 优先判断post/get等方法是否传入回掉，否则执行初始化设置等回掉
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data
        }
        if (FzHttp.initConfig.beforeResponseCallback) {
          FzHttp.initConfig.beforeResponseCallback(response)
          return response.data
        }

        if (response.data.code === ERROR_OK) {
          return response.data
        }

        Message.error({
          content: response.data.msg || 'Error',
          duration: 5 * 1000
        })

        // 登录相关错误处理
        if (LOGIN_ERROR_CODE.includes(response.data.code)) {
          useUserStore().logoutCallBack()
        }

        return Promise.reject(response.data)
      },
      (error: FzHttpError) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        // 关闭进度条动画
        NProgress.done()
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      }
    )
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: FzHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as FzHttpRequestConfig

    // 单独处理自定义请求/响应回掉
    return new Promise((resolve, reject) => {
      FzHttp.axiosInstance
        .request(config)
        .then((response: AxiosResponseReturnTypes) => resolve(response))
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: FzHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, config)
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: FzHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('get', url, params, config)
  }
}

export default new FzHttp()
