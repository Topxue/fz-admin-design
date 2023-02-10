import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import useAppStore from './modules/useAppStore'
import useUserStore from './modules/useUserStore'
import useRoutesList from './modules/useRoutesList'
import useKeepALiveNames from './modules/useKeepALiveNames'
import useTagsViewRoutes from './modules/useTagsViewRoutes'

const pinia = createPinia()
pinia.use(piniaPersist)

export {
  useAppStore,
  useUserStore,
  useKeepALiveNames,
  useRoutesList,
  useTagsViewRoutes
}

export default pinia
