// 声明路由当前项类型
declare type RouteItem<T = any> = {
  path: string
  name?: string | symbol | undefined | null
  redirect?: string
  k?: T
  meta: {
    title: string
    isLink?: string
    isHide?: boolean
    isKeepAlive?: boolean
    isAffix?: boolean
    isIframe?: boolean
    roles?: string[]
    icon?: string
    isDynamic?: boolean
    isDynamicPath?: string
    isIframeOpen?: string
    loading?: boolean
  }
  children: T[]
  query?: { [key: string]: T }
  params?: { [key: string]: T }
  contextMenuClickId?: string | number
  commonUrl?: string
  isFnClick?: boolean
  url?: string
  transUrl?: string
  title?: string
  id?: string | number
}

// 声明路由当前项类型集合
declare type RouteItems<T extends RouteItem = any> = T[]

declare interface RouteToFrom<T = any> extends RouteItem {
  path?: string
  children?: T[]
}

// 声明 HTMLElement
declare type HtmlType = HTMLElement | string | undefined | null

declare module '@arco-design/color'
