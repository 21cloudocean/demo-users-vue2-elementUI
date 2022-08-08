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

// 日期格式 过滤器
Vue.filter('dateFormat', (dtStr) => {
  const dt = new Date(dtStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 让时间保持两位数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

// 全局配置 axios
// axios.defaults.baseURL = 'https://www.escook.cn'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$http = axios

new Vue({
  // 挂载路由
  router,
  render: (h) => h(App)
}).$mount('#app')
