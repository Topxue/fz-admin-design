export default {
  // 默认 primary 主题颜色
  primary: '#115CDD',
  // 是否开启深色模式
  isDark: false,
  /**
   * 界面显示
   */
  isShowLogo: true,
  // 是否开启 Breadcrumb，强制经典、横向布局不显示
  isBreadcrumb: true,
  // 是否开启 Tagsview
  isTagsview: true,
  // 是否开启 TagsView 缓存
  isCacheTagsView: false,
  // 是否开启 Footer 底部版权信息
  isFooter: false,
  // 是否开启灰色模式
  isGrayscale: false,
  // 是否开启色弱模式
  isInvert: false,
  // 是否开启水印
  isWartermark: false,
  // 水印文案
  wartermarkText: 'FZ-ADMIN',
  /**
   * 布局切换
   * 注意：为了演示，切换布局时，颜色会被还原成默认，代码位置：/@/layout/navBars/breadcrumb/setings.vue
   * 中的 `initSetLayoutChange(设置布局切换，重置主题样式)` 方法
   */
  // 布局切换：可选值"<vertical|horizontal|classic>"，默认 vertical
  layout: 'vertical',

  /**
   * 界面设置
   */
  // 菜单宽度
  menuWidth: 220,
  // 收缩菜单宽度
  collapsedWidth: 48,
  /**
   * 菜单设置
   */
  // 默认菜单导航背景颜色
  menuBgColor: '#545c64',
  // 默认菜单导航字体颜色
  // menuBarColor: '#eaeaea',
  // 默认菜单高亮背景色
  // menuBarActiveColor: 'rgba(0, 0, 0, 0.2)',
  // 是否开启菜单背景颜色渐变
  // isMenuBarColorGradual: false,

  // 是否开启后端控制路由
  isRequestRoutes: false,
  /**
   * 其它设置
   */
  // 主页面切换动画：可选值"<slide-right|slide-left|opacitys>"，默认 slide-right
  animation: 'slide-right',

  /**
   * 全局网站标题 / 副标题
   */
  // 网站主标题（菜单导航、浏览器当前网页标题）
  globalTitle: 'FZADMIN',
  // 默认全局组件大小，可选值"<large|'default'|small>"，默认 'large'
  globalComponentSize: 'large'
}
