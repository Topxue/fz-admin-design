import { defineStore } from 'pinia'

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setTagsViewList 设置 TagsView 显示列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
const useTagsViewRoutes = defineStore('tagsViewRoutes', {
  state: (): TagsViewRoutesState => ({
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
    clearTagsVieList() {
      this.tagsViewRoutes = []
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: '__TAGS_VIEW__',
        storage: window.localStorage,
        paths: ['isTagsViewCurrenFull']
        // paths: ['tagsViewList', 'isTagsViewCurrenFull']
      }
    ]
  }
})

export default useTagsViewRoutes
