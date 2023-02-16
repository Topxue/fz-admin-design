import { defineStore } from 'pinia'

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 */
const useRoutesList = defineStore('routesList', {
  state: (): RoutesListState => ({
    routesList: [],
    isColumnsMenuHover: false,
    isColumnsNavHover: false
  }),
  actions: {
    async setRoutesList(data: Array<string>) {
      this.routesList = data
    },

    clearRoutesList() {
      this.routesList = []
    }
  }
})

export default useRoutesList
