import Main from '@/view/main'
import lazyLoading from './lazyLoading'
export default (routers,data) => {
  // 这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
  // 所以这里要做一些转换
  generaMenu(routers,data)
}
function generaMenu(routers,data){
  data.forEach((item) => {
    if (item.type ===0 &&item.name!=='首页') {
      let menu = {}
      if (item.parentId === null) { // 如果是父节点
        menu.path = item.url
        menu.name = item.permission
        menu.component = lazyLoading('/main')
        let pmeta = {title: item.name, icon: (item.icon === ''|| item.icon === null)?'test_123': item.icon}
        menu.meta = pmeta
      } else {
        let lastWord = item.url.split('/')
        menu.path = lastWord[lastWord.length-1]
        menu.name = item.permission
        let smeta = {icon: (item.icon === ''|| item.icon === null)?'test_456': item.icon, title: item.name, access: [item.permission]}
        menu.meta = smeta
        menu.component = lazyLoading(item.url)
        // let scomponent = { component: () => import(`@/view${item.url}`)}
        // menu.component = scomponent
      }
      if (item.children!== null && item.children.length !==0) {
        if (isAddMenu(item.children)) {
          menu.children = []
          generaMenu(menu.children,item.children)
        }
      }
      routers.push(menu)
    }
  })
}
function isAddMenu (menu) { // 判断是否在菜单下添加children数组 只要item.children中有一个数据的type为0 则可以加 都不为0 则不加
  let isAddMenu = true
  menu.forEach((item) => {
    if (item.type ===0) {
      isAddMenu = true
      return false
    } else {
      isAddMenu = false
      return false
    }
  })
  return isAddMenu
}
