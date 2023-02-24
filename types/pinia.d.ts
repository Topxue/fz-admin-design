/**
 * pinia 类型定义
 */

// 路由缓存列表
declare interface KeepAliveNamesState {
  keepAliveNames: string[]
  cachedViews: string[]
}

// 后端返回原始路由(未处理时)
declare interface RequestOldRoutesState {
  requestOldRoutes: string[]
}

// TagsView 路由列表
declare interface TagsViewRoutesState<T = any> {
  tagsViewRoutes: T[]
  isTagsViewCurrenFull: Boolean
}

// 路由列表
declare interface RoutesListState<T = any> {
  routesList: T[]
}

// AppConfig全局配置
declare interface AppState {
  appConfig: {
    // 默认 primary 主题颜色
    primary: string
    // 是否开启深色模式
    isDark: boolean
    /**
     * 界面显示
     */
    // 是否开启侧边栏 Logo
    isShowLogo: boolean
    // 初始化变量，用于 el-scrollbar 的高度更新，请勿删除
    isShowLogoChange: boolean
    // 是否开启 Breadcrumb，强制经典、横向布局不显示
    isBreadcrumb: boolean
    // 是否开启 Tagsview
    isTagsview: boolean
    // 是否开启 Breadcrumb 图标
    isBreadcrumbIcon: boolean
    // 是否开启 TagsView 缓存
    isCacheTagsView: boolean
    // 是否开启 Footer 底部版权信息
    isFooter: boolean
    // 是否开启灰色模式
    isGrayscale: boolean
    // 是否开启色弱模式
    isInvert: boolean
    // 是否开启水印
    isWartermark: boolean
    // 水印文案
    wartermarkText: string
    menuBgColor: string
    /**
     * 布局切换
     * 注意：为了演示，切换布局时，颜色会被还原成默认，代码位置：/@/layout/navBars/breadcrumb/setings.vue
     * 中的 `initSetLayoutChange(设置布局切换，重置主题样式)` 方法
     */
    // 布局切换：可选值"<defaults|classic|transverse|columns>"，默认 defaults
    layout: string
    menuWidth: number
    collapsedWidth: number

    /**
     * 后端控制路由
     */
    // 是否开启后端控制路由
    isRequestRoutes: boolean
    /**
     * 其它设置
     */
    // Tagsview 风格：可选值"<tags-style-one|tags-style-four|tags-style-five>"，默认 tags-style-five
    // 定义的值与 `/src/layout/navBars/tagsView/tagsView.vue` 中的 class 同名
    tagsStyle: string
    animation: string
    // 分栏高亮风格：可选值"<columns-round|columns-card>"，默认 columns-round
    columnsAsideStyle: string
    // 分栏布局风格：可选值"<columns-horizontal|columns-vertical>"，默认 columns-horizontal
    columnsAsideLayout: string
    globalTitle: string
    globalComponentSize: string
    isCollapse: boolean
  }
}

// 用户信息
declare interface UserState {
  userInfo: {
    name: string
    avatar: string
    job: string
    organization: string
    location: string
    email: string
    introduction: string
    personalWebsite: string
    jobName: string
    organizationName: string
    locationName: string
    phone: string
    registrationDate: string
    accountId: string
    certification: string
    role: 'admin' | 'user'
  }
  token: string
}
