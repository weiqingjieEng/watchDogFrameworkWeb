import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData, getDragList } from './data'
import { getCompantData } from './company'

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)

// 获取公司信息
Mock.mock('api/get_company_data', 'post', getCompantData)
export default Mock
