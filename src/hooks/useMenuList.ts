import { storeToRefs } from 'pinia'
import pinia, { useRoutesList } from '@/stores'

// 路由过滤递归函数
const filterRoutesFun = <T extends RouteItem>(arr: T[]): T[] => {
  return arr
    .filter((item: T) => !item.meta?.hidden)
    .map((item: T) => {
      item = Object.assign({}, item)
      if (item.children) item.children = filterRoutesFun(item.children)
      return item
    })
}

export default function useMenuList() {
  const useRouteStore = useRoutesList(pinia)
  const { routesList } = storeToRefs(useRouteStore)

  return filterRoutesFun(routesList.value)
}
