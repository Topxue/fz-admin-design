import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import Fzui from 'fz-arco-design'

import './style/main.less'
import 'fz-arco-design/dist/style.css'
import '@arco-themes/vue-fzui-theme/css/arco.css'

import globalComponents from '@/components'
import { directive } from './directives'

import App from './App.vue'
import store from '@/stores'
import router from './router'

const app = createApp(App)

directive(app)
app.use(createPinia())
app.use(ArcoVue, {})
app.use(Fzui)
app.use(globalComponents)
app.use(ArcoVueIcon)
app.use(router)
app.use(store)

app.mount('#app')
