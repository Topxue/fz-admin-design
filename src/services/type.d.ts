import { Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

export type resultType = {
  accessToken?: string
  refreshToken?: string
}

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface FzHttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface FzHttpResponse extends AxiosResponse {
  config: FzHttpRequestConfig
}

export interface FzHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: FzHttpRequestConfig) => void
  beforeResponseCallback?: (response: FzHttpResponse) => void
}

export type AxiosResponseReturnTypes =
  | Promise<AxiosResponse>
  | Promise<HttpResponse>
  | any

export default class FzHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: FzHttpRequestConfig
  ): Promise<T>
  post<T, P>(url: string, params?: T, config?: FzHttpRequestConfig): Promise<P>
  get<T, P>(url: string, params?: T, config?: FzHttpRequestConfig): Promise<P>
}

export type ResponseResult<T> = {
  code: number
  data: T
  msg: string
}
