<template>
  <div class="graphcontainer">
    <searchinput :selectitem="selectitem"></searchinput>
    <div class="grapcontent">
      <graph :graphwidth="graphwidth1" :graphheight="graphheight1" :graphname="graphname1" :graphurl="graphurl1"></graph>
    </div>
  </div>
</template>
<script>
import graph from '@/components/charts/graph'
import searchinput from '@/components/searchinput/searchinput'
import { post } from '@/libs/axios-cfg'
export default {
  data () {
    return {
      selectitem: [
        { // 定义输入框组件基本数据
          selectValue: 'companyName',
          selectText: '公司名称',
          selectData: '/bidCompany/get', // input模糊查询url
          searchData: '/graph/bidCompany/get', // 需要返回的图表的url
          selectParam: 'companyName', // 模糊查询所需参数
          searchParam: 'bidCompanyDTO', // 获取图表数据所需参数
          isSelected: true // 是否是默认选择的
        },{
          selectValue: 'bidPersons',
          selectText: '发包人',
          selectData: '/bidPerson/get',
          searchData: '/graph/bidPerson/get',
          selectParam: 'personName',
          searchParam: 'bidPersonDTO',
          isSelected: false
        },{
          selectValue: 'bidDepts',
          selectText: '发包单位',
          selectData: '/bidDepts/get',
          searchData: '/graph/bidDepts/get',
          selectParam: 'deptName',
          searchParam: 'bidDeptDTO',
          isSelected: false
        }
      ],
      graphwidth1: 50,
      graphheight1: 100,
      graphname1: 'company',
      graphurl1: '/graph/bidCompany/get',
    }
  },
  components: {
    graph,
    searchinput
  }
}
</script>
<style scoped>
 .graphcontainer {
   width: 100%;
   height: 100%;
 }
 .formcontainer {
   width: 100%;
   height: 10%;
 }
 .grapcontent {
   width: 100%;
   height: 90%;
 }
 .ivu-form-item-content {
   float: left;
 }
</style>
