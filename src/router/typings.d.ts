import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 菜单标题（国际化写法）
    title?: string
    isLink?: string
    // 菜单是否隐藏（菜单不显示在界面，但可以进行跳转）
    isHide?: boolean
    // 菜单是否缓存
    isKeepAlive?: boolean
    // 菜单是否固定（固定在 tagsView 中，不可进行关闭），右键菜单无 `关闭` 项
    isAffix?: boolean
    // 是否内嵌
    // 开启条件，`1、isIframe: true 2、链接地址不为空（meta.isLink）`
    isIframe?: boolean
    // 当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
    // 之前 auth 取用户（角色下有多个用户）
    roles?: string[]
    // 菜单图标
    icon?: string
    // 路由权重
    order?: number
  }
}
