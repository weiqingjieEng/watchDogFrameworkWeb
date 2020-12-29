<template>
  <div class="graphcontainer">
    <searchinput :selectitem="selectitem" @getReturnSearch ="getSearch"></searchinput>
    <div class="grapcontent">
      <graph :graphwidth="graphwidth" :graphheight="graphheight" :graphname="graphname" :graphparam="graphparam"></graph>
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
          selectData: '/graph/bidCompany/getBasicData', // input模糊查询url
          searchData: '/graph/bidCompany/get', // 需要返回的图表的url
          selectParam: 'sysBidCompanyDTO', // 模糊查询所需参数
          searchParam: 'bidCompanyDTO', // 获取图表数据所需参数
          isSelected: true // 是否是默认选择的
        },{
          selectValue: 'bidPersons',
          selectText: '发包人',
          selectData: '/graph/bidPerson/getBasicData',
          searchData: '/graph/bidPerson/get',
          selectParam: 'sysBidPersonDTO',
          searchParam: 'bidPersonDTO',
          isSelected: false
        },{
          selectValue: 'bidDepts',
          selectText: '发包单位',
          selectData: '/graph/bidDepts/getBasicData',
          searchData: '/graph/bidDepts/get',
          selectParam: 'sysBidDeptDTO',
          searchParam: 'bidDeptDTO',
          isSelected: false
        }
      ],
      graphwidth: 50,
      graphheight: 100,
      graphname: 'graphmodal',
      graphparam: {},
    }
  },
  components: {
    graph,
    searchinput
  },
  methods: {
    getSearch: function(urlParam) {
      this.graphparam = urlParam
    }
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
