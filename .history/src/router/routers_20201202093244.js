// import Main from '@/view/main'
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)
// /**
//  * iview-admin中meta除了原生参数外可配置的参数:
//  * meta: {
//  *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
//  *  notCache: (false) 设为true后页面不会缓存
//  *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
//  *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
//  * }
//  */

// export const constantRoutes =[
//   {
//     path: '/login',
//     name: 'login',
//     meta: {
//       title: '登录',
//       hideInMenu: true
//     },
//     component: () => import('@/view/login')
//   },
//   {
//     path: '/',
//     name: '_home',
//     redirect: '/home',
//     component: () => import('@/view/main'),
//     meta: {
//       hideInMenu: true,
//       notCache: true
//     },
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         meta: {
//           hideInMenu: true,
//           title: '首页',
//           notCache: true
//         },
//         component: () => import('@/view/home/index')
//       }
//     ]
//   },
//   {
//     path: '/401',
//     name: 'error_401',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/401.vue')
//   },
//   {
//     path: '/500',
//     name: 'error_500',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/500.vue')
//   }
// ]
// const createRouter = () => new Router({
//   mode: 'history',
//   routes: constantRoutes
// })

// const router = createRouter()

// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }
// export default router
