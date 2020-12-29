import router from "../../router"
import { constantRoutes, resetRouter } from "../../router"
import { post } from '@/libs/axios-cfg'
import MenuUtils from '@/libs/MenuUtils'

const state = {
  addedRoute: [], // 从后端获取的用户自定义的内容
  allRoute: []
}

const getters = {
  // 根据addedRoute处理过后的要添加到所有路由中的异步路由
  asyncRoute: (state) => {

    let asyncRouteData = state.addedRoute
    let asyncRouteList = []
    MenuUtils(asyncRouteList,asyncRouteData)
    // {path:'*'....}不能放在静态路由里，否则刷新的时候即便获取到了异步路由数据也会直接跳转到首页
    asyncRouteList.push({ path: '*', redirect: '/', hidden: true })
    resetRouter()
    // 此处不使用addRoutes()添加一次，只在路由守卫方法中addRoutes()的话，初次点击自定义路由页面会有问题
    router.addRoutes(asyncRouteList)
    return asyncRouteList
  },

  // 包含最初定义的静态路由和异步路由的最终路由
  lastRoute(state, getters){
      let allRoute = constantRoutes.concat(getters.asyncRoute())
      return allRoute
  },
}

const mutations = {
  updateAddedRoute: (state, data) => {
    state.addedRoute = data
  }
}
const actions = {
  getAddedRoute({commit}){
    return new Promise((resolve, reject) => {
      post('/account/current').then((res) => {
          commit('updateAddedRoute', res.data.resources)
          resolve()
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
