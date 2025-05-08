import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import api from './api/index.js'
import 'amfe-flexible' // 自动设置html字体大小（网页5动态适配方案）
import 'vant/lib/index.css'
const app = createApp(App)
router.beforeEach((to) => {
  // 返回 false 以取消导航
  if (to.path !== '/login') {
    if (!localStorage.getItem('token')) {
      return '/login'
    }
  }
})
app.use(createPinia())
app.use(router)
app.config.globalProperties.$api = api
app.mount('#app')
