import { defineStore } from 'pinia'

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setTagsViewList 设置 TagsView 显示列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
const useTagsViewRoutes = defineStore('tagsViewRoutes', {
  state: (): TagsViewRoutesState => ({
    tagsViewList: [
      {
        path: '/home',
        name: 'home',
        component: 'home',
        meta: {
          title: '首页',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: true,
          isIframe: false,
          roles: ['admin', 'common'],
          icon: 'iconfont icon-shouye'
        },
        children: []
      }
    ],
    tagsViewRoutes: [],
    isTagsViewCurrenFull: false
  }),
  actions: {
    async setTagsViewRoutes(data: Array<RouteItem>) {
      this.tagsViewRoutes = data
    },
    setCurrenFullscreen(bool: Boolean) {
      this.isTagsViewCurrenFull = bool
    },
    setTagsViewList(data: Array<RouteItem>) {
      this.tagsViewList = data
    },
    clearTagsVieList() {
      this.tagsViewList = []
      this.tagsViewRoutes = []
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: '__TAGS_VIEW__',
        storage: window.localStorage,
        paths: ['tagsViewList', 'isTagsViewCurrenFull']
      }
    ]
  }
})

export default useTagsViewRoutes
