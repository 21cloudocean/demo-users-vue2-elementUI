import Vue from 'vue'
import App from './App.vue'

// 导入路由模块
import router from './router'
// 导入axios
import axios from 'axios'

Vue.config.productionTip = false

// 全局配置 axios
axios.defaults.baseURL = 'https://www.escook.cn'
Vue.prototype.$http = axios

new Vue({
  // 挂载路由
  router,
  render: (h) => h(App)
}).$mount('#app')
