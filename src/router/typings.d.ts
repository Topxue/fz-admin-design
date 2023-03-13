import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
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
  }
}
