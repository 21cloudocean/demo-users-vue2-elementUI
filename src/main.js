import Vue from 'vue'
import App from './App.vue'

// 导入路由模块
import router from './router'
// 导入axios
import axios from 'axios'
// 导入element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// 添加element UI插件
Vue.use(ElementUI)

// 全局配置 axios
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

new Vue({
  // 挂载路由
  router,
  render: (h) => h(App)
}).$mount('#app')
