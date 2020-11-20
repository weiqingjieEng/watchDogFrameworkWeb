import { getParams } from '@/libs/util'
const COMPANY_DATA = [
  { id: '1', name: '上海伦翔电子科技有限公司' },
  { id: '2', name: '上海则旭机械设备有限公司' },
  { id: '3', name: '上海现代科技发展有限公司' },
  { id: '4', name: '上海现代科技有限公司' },
  { id: '5', name: '亿新源电子科技有限公司' },
  { id: '6', name: '大千电子实业公司' },
  { id: '7', name: '大庆市振富科技信息股份有限公司' },
  { id: '8', name: '山东科宝电子有限公司事业部' },
  { id: '9', name: '广东东莞市威杰电子有限公司' },
  { id: '10', name: '广东汕尾创能科技股份有限公司' },
  { id: '11', name: '广东省深圳速杰电子有限公司' },
  { id: '12', name: '广东鼎泰机器人科技有限公司' },
  { id: '13', name: '广东聚广恒自动化设备有限公司' },
  { id: '14', name: '广州市威控计算机科技有限公司' },
  { id: '15', name: '广州市番禺区旧水坑富利电子厂' },
  { id: '16', name: '广州华信电子有限公司' },
  { id: '17', name: '广州华港公司' },
  { id: '18', name: '广州宝创自动化设备有限公司' },
  { id: '19', name: '广州威控电子计算机科技有限公司' },
  { id: '20', name: '广州皇牌自动设备有限公司' },
  { id: '21', name: '广州英钛信息科技有限公司' },
  { id: '22', name: '广州煌牌自动设备有限公司' },
  { id: '23', name: '飞新科技电子有限公司' },
  { id: '24', name: '中山市东区锦源电子厂' },
  { id: '25', name: '中山市坦洲镇友创电子贴片厂' },
  { id: '26', name: '云龙科技有限公司' },
  { id: '27', name: '天励电子科技（深圳）有限公司'},
  { id: '28', name: '天来国际发展集团有限公司' },
  { id: '29', name: '幻星数码科技有限公司' },
  { id: '30', name: '日东电子设备有限公司' },
  { id: '31', name: '日东电子科技(深圳)有限公司销售部' }
]
export const getCompantData = req => {
  const params = getParams(req.url)
  const companyData = []
  COMPANY_DATA.forEach(function(item,index){
    if(item.name.toLowerCase().indexOf(params.value.toLowerCase())>0) {
      companyData.push(item)
    }
  })
  return companyData
}