import { App } from 'vue'

import IconFont from './IconFont/index.tsx'

export default {
  install(Vue: App) {
    Vue.component('IconFont', IconFont)
  }
}
