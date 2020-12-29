// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import Router from 'vue-router'
import config from '@/config'
import importDirective from '@/directive'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import './libs/iview-cfg'
import { constantRoutes, resetRouter } from "./router"
import { getToken, canTurnTo } from '@/libs/util'
// import '@/mock'
// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

let isLoadNodes = sessionStorage.getItem('isLoadNodes')
if (isLoadNodes) {
  store.commit('collectDirectory/updateAddedRoute',res.data)
  let asyncRoute = store.getters['collectDirectory/asyncRoute']
  resetRouter()
  router.addRoutes(asyncRoute)
  window.sessionStorage.removeItem('isLoadNodes')
}
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  try {
    document.title = to.meta.title
  } catch (e) { console.warn('load title warning!') }
  iView.LoadingBar.start()
  const token = getToken()
  // 针对自定义路由页面刷新的情况(刷新时to.name为null)
  if (!to.name) {
    store.commit('collectDirectory/updateAddedRoute',res.data)
    let asyncRoute = store.getters['collectDirectory/asyncRoute']
    resetRouter()
    router.addRoutes(asyncRoute)
    next({ ...to, replace: true })
  } else {
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: 'home' // 跳转到home页
      })
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        console.log(to.name + '----' + canTurnTo(to.name, user.access, router.options.routes))
        if (canTurnTo(to.name, user.access, router.options.routes)) next() // 有权限，可访问
        else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
      })
    }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
