import { App } from 'vue'

import IconFont from './IconFont'
import Auth from './Auth/auth.vue'
import Auths from './Auth/auths.vue'
import AuthAll from './Auth/authAll.vue'
import FzDrawer from './FzDrawer'

export default {
  install(Vue: App) {
    Vue.component('Auth', Auth)
    Vue.component('Auths', Auths)
    Vue.component('AuthAll', AuthAll)
    Vue.component('IconFont', IconFont)
    Vue.component('FzDrawer', FzDrawer)
  }
}
