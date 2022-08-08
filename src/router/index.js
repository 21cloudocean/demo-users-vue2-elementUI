// 路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由规则中涉及的组件
import UserList from '@/components/UserList.vue'
// 安装路由插件
Vue.use(VueRouter)
// 创建路由实例对象
const router = new VueRouter({
  // 路由规则
  routes: [
    // 路由重定向
    { path: '/', redirect: '/users' },
    // 用户列表的路由规则
    { path: '/users', component: UserList }
  ]
})
// 向外共享路由实例对象
export default router
