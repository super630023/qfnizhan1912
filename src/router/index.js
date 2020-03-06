import Vue from 'vue'
import VueRouter from 'vue-router' // 路由核心模块
import Film from '@/views/Film'
// import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Login from '@/views/Login'
import ErrorComponent from '@/views/ErrorComponent'

Vue.use(VueRouter) // 注册路由插件
// 路由映射表
const routes = [
  {
    path: '/film',
    component: Film
  },
  {
    path: '/cinema',
    // component: Cinema
    component: () => import(/* webpackChunkName:'kerwincinema' */'@/views/Cinema') // webpack 代码分割
  },

  {
    path: '/center',
    component: Center
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/film' // 重定向
  },

  {
    path: '*',
    component: ErrorComponent
  }

]

const router = new VueRouter({
  mode: 'hash', // history  hash
  routes
})

// 配置全局路由守卫（拦截）

// router.beforeEach((to,from,next)=>{
//   // console.log(to) //跳转的是center才拦截
//   if(to.path=== '/center'){
//     // console.log("被拦截")
//     if(localStorage.getItem("token")){
//       next()
//     }else{
//       console.log('重定向到 login页面')
//       next("/login")
//     }
//   }else{
//     next()
//   }
// })

export default router
