import router from "../../router"
import { constantRoutes, resetRouter } from "../../router"
import { post } from '@/libs/axios-cfg'
import MenuUtils from '@/libs/MenuUtils'

export default {
  state: {
    addedRoute: [], // 从后端获取的用户自定义的内容
    allRoute: []
  },
  getters: {
  },
  mutations: {
    updateAddedRoute: (state, data) => {
      state.addedRoute = data
    },
    // 包含最初定义的静态路由和异步路由的最终路由
    lastRoute: (state) => { //生成菜单用
      let allRouteData = state.addedRoute
      let allRouteList = []
      if (allRouteData.length !== 0) {
        MenuUtils(allRouteList,allRouteData)
      }
      allRouteList = constantRoutes.concat(allRouteList)
      router.options.routes = allRouteList
      router.addRoutes(allRouteList)
      state.allRoute = allRouteList
    } 
  },
  actions: {
    getAddedRoute({commit}){
      return new Promise((resolve, reject) => {
        post('/account/current').then((res) => {
            commit('updateAddedRoute', res.data.resources)
            commit('lastRoute')
            resolve()
        })
      })
    },
    getLastRoute(state) {
      return state.allRoute
    }
  }
}
