<template>
  <div class="graphcontainer">
    <searchinput :selectitem="selectitem" @getReturnSearch ="getSearch"></searchinput>
    <div class="grapcontent">
      <graph :graphwidth="graphwidth" :graphheight="graphheight" :graphname="graphname" :graphparam="graphparam"></graph>
    </div>
  </div>
</template>
<script>
import graph from '@/components/charts/graphOfAuction'
import searchinput from '@/components/searchinput/searchinput'
import { post } from '@/libs/axios-cfg'
export default {
  data () {
    return {
      selectitem: [
        { // 定义输入框组件基本数据
          selectValue: 'companyName',
          selectText: '参与公司',
          selectData: '/graph/auctionCompany/getBasicData', // input模糊查询url
          searchData: '/graph/auctionCompany/get', // 需要返回的图表的url
          searchParam: 'creditCode', // 获取图表数据所需参数
          isSelected: true // 是否是默认选择的
        },{
          selectValue: 'auctionName',
          selectText: '转让标案',
          selectData: '/graph/auction/getBasicData',
          searchData: '/graph/auction/get',
          searchParam: 'auctionNo',
          isSelected: false
        }
      ],
      graphwidth: 100,
      graphheight: 100,
      graphname: 'graphOfAuction',
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
   height: 100%;
 }
 .ivu-form-item-content {
   float: left;
 }
</style>
