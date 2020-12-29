// import Vue from 'vue'
// import Router from 'vue-router'
// import routes from './routers'
// import store from '@/store'
// import iView from 'iview'
// import { constantRoutes, resetRouter } from "./router"
// import { getToken, canTurnTo } from '@/libs/util'

// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// const LOGIN_PAGE_NAME = 'login'

// router.beforeEach((to, from, next) => {
//   try {
//     document.title = to.meta.title
//   } catch (e) { console.warn('load title warning!') }
//   iView.LoadingBar.start()
//   const token = getToken()
//   // 针对自定义路由页面刷新的情况(刷新时to.name为null)
//   if (!to.name) {
//     store.commit('collectDirectory/updateAddedRoute',res.data)
//     let asyncRoute = store.getters['collectDirectory/asyncRoute']
//     resetRouter()
//     router.addRoutes(asyncRoute)
//     next({ ...to, replace: true })
//   } else {
//     if (!token && to.name !== LOGIN_PAGE_NAME) {
//       // 未登录且要跳转的页面不是登录页
//       next({
//         name: LOGIN_PAGE_NAME // 跳转到登录页
//       })
//     } else if (!token && to.name === LOGIN_PAGE_NAME) {
//       // 未登陆且要跳转的页面是登录页
//       next() // 跳转
//     } else if (token && to.name === LOGIN_PAGE_NAME) {
//       // 已登录且要跳转的页面是登录页
//       next({
//         name: 'home' // 跳转到home页
//       })
//     } else {
//       store.dispatch('getUserInfo').then(user => {
//         // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
//         console.log(to.name + '----' + canTurnTo(to.name, user.access, routes))
//         if (canTurnTo(to.name, user.access, routes)) next() // 有权限，可访问
//         else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
//       })
//     }
//   }
// })

// router.afterEach(to => {
//   iView.LoadingBar.finish()
//   window.scrollTo(0, 0)
// })

// export default router

import Main from '@/view/main'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export const constantRoutes =[
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/login')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: () => import('@/view/main'),
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/view/home/index')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  }
]
const createRouter = () => new Router({
  mode: 'history',
  routes: constantRoutes
})

export const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}