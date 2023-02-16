import { storeToRefs } from 'pinia'
import { useRoutesList } from '@/stores'

// 路由过滤递归函数
const filterRoutesFun = <T extends RouteItem>(arr: T[]): T[] => {
  return arr
    .filter((item: T) => !item.meta?.isHide)
    .map((item: T) => {
      item = Object.assign({}, item)
      if (item.children) item.children = filterRoutesFun(item.children)
      return item
    })
}

export default function useMenuList() {
  const useRouteStore = useRoutesList()
  const { routesList } = storeToRefs(useRouteStore)

  return filterRoutesFun(routesList.value)
}
