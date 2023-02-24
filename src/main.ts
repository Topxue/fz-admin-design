import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-themes/vue-fzui-theme/css/arco.css'

import globalComponents from '@/components'

import App from './App.vue'
import store from '@/stores'
import router from './router'

import './assets/style/main.less'

const app = createApp(App)

app.use(createPinia())
app.use(ArcoVue, {})
app.use(globalComponents)
app.use(ArcoVueIcon)
app.use(router)
app.use(store)

app.mount('#app')
