// 声明路由当前项类型
declare type RouteItem<T = any> = {
  path: string
  name?: string | symbol | undefined | null
  redirect?: string
  k?: T
  meta: {
    // 菜单标题（国际化写法）
    title?: string
    // 是否外链
    link?: string
    // 外链/内嵌地址
    linkUrl?: string
    // 菜单是否隐藏（菜单不显示在界面，但可以进行跳转）
    hidden?: boolean
    // 菜单是否缓存
    keepAlive?: boolean
    // 菜单是否固定（固定在 tagsView 中，不可进行关闭），右键菜单无 `关闭` 项
    affix?: boolean
    // 是否内嵌
    // 开启条件，`1、iframe: true 2、链接地址不为空（meta.link）`
    iframe?: boolean
    // 当前路由权限标识
    permission?: string
    // 菜单图标
    icon?: string
    // 状态启用禁用
    status?: number
    // 路由权重
    sort?: number
    // 是否动态路由
    isDynamic?: boolean
    // 是否动态路由路径
    isDynamicPath?: string
    iframeOpen?: string
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

// navBars tagsView
declare type TagsViewState<T = any> = {
  routeActive: string | T
  routePath: string | unknown
  tagsRefsIndex: number
  tagsViewList: T[]
  tagsViewRoutesList: T[]
}

// 声明 HTMLElement
declare type HtmlType = HTMLElement | string | undefined | null

// 申明 数组
declare type EmptyArrayType<T = any> = T[]

/**
 * 打包压缩格式的类型声明
 */
type ViteCompression =
  | 'none'
  | 'gzip'
  | 'brotli'
  | 'both'
  | 'gzip-clear'
  | 'brotli-clear'
  | 'both-clear'

declare module '@arco-design/color'
