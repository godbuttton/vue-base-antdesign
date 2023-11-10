import './assets/reset.css'
import 'ant-design-vue/dist/reset.css'

import './assets/main.css'
import './style/index.less'
import Antd from 'ant-design-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n  from './lang'
import App from './App.vue'
import router from './router'
import routerGuid from '@/router/routerGurd'

const app = createApp(App)
app.use(i18n)
app.use(createPinia()).use(router).use(Antd)

app.mount('#app')
