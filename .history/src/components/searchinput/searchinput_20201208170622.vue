<template>
  <div class="searchInput">
    <Row>
      <Col span="8" push="4">
        <Input v-model="searchText" @keyup.native='show($event)' @keydown.down.prevent.native='down()' @keydown.up.prevent.native='up()' placeholder="请输入搜索条件...">
          <Select v-model="selectText" slot="prepend" style="width: 120px">
              <Option v-for="(item,index) in selectitem" :value="item.selectValue" :key="index">{{item.selectText}}</Option>
          </Select>
        </Input>
        <ul class="inputUl" v-if="result.length!==0">
          <li v-for="(item, index) in result" :class='{bg: index==nowIndex}' :key='index' @mouseover="changebg($event)" @click="getClickData($event)">
              {{item[getselectValue()]}}
          </li>
        </ul>
      </Col>
      <Col span="4" push="5">
        <Select v-model="pageSize" style="width:80px;float:left" class="pageSize">
            <Option v-for="(item,index) in pageSizeArr" :value="item" :key="index">{{item}}</Option>
        </Select>
        <div class="searchBtn" @click="handleSubmit()">查询</div>
      </Col>
    </Row>
  </div>
</template>
<script>
import { post } from '@/libs/axios-cfg'
export default {
   data () {
     return {
       searchText: '',
       selectText: '',
       selectData: '',
       searchData: '',
       searchParam: {},
       searchParamKey: '',
       nowIndex: -1,
       text: '',
       result: [],
       pageSize: 10,
       pageSizeArr:[10,20,50,80,100,120,150,200]
     }
   },
   props:['selectitem'],
   mounted() {
    this.defaultData()
   },
   methods: {
     defaultData: function() {
       let _this = this
       this.selectitem.forEach(element => {
         if (element.isSelected) {
           _this.selectText = element.selectValue
           _this.selectData = element.selectData
           _this.searchData = element.searchData
           _this.searchParamKey = element.searchParam
         }
       });
     },
     show: function (ev) {
      if (ev.keyCode === 38 || ev.keyCode === 40) {
        if (this.nowIndex < -1){
          return
        }
        if (this.nowIndex != this.result.length && this.nowIndex != -1) {
          this.searchText = this.result[this.nowIndex][this.selectText]
          this.searchParam[this.searchParamKey] = this.result[this.nowIndex][this.searchParamKey]
        }
        return
      }
      if (ev.keyCode === 13) {
        this.searchText = this.result[this.nowIndex][this.selectText]
        this.searchParam[this.searchParamKey] = this.result[this.nowIndex][this.searchParamKey]
        this.result =[]
        return
      }
      if (ev.keyCode === 8 && this.searchText=== '') {
        this.result =[]
      }
      this.text = this.searchText;
      let selectParamKey = this.selectText
      let param = {}
      param[this.selectText] = this.searchText
      console.log('input的值'+ this.searchText)
      try {
      post(this.selectData,param).then((res) => {
        if (res.status ===1 && res.data.length!== 0) {
          this.result = res.data
        }
      })
      } catch (error) {
        this.$throw(error)
        }
    },
    down: function() {
      this.nowIndex++;
      if (this.nowIndex === this.result.length) {
        this.nowIndex = -1;
        this.searchText = this.text
      }
    },
    up: function() {
      this.nowIndex--;
      if (this.nowIndex < -1){
        this.nowIndex = -1;
        return;
      }
      if (this.nowIndex === -1) {
        this.nowIndex = this.result.length;
        this.searchText = this.text
      }
    },
    changebg: function (ev) { // 鼠标移入ul li 上时 改变其背景颜色
      let _this = this
      this.result.forEach((item, index) => {
        if (item[_this.selectText] === ev.srcElement.innerText) {
          _this.nowIndex = index
        }
      })
    },
    getClickData: function(ev) { // 下拉li被点击时
      let _this = this
      this.result.forEach((item, index) => {
        if (item[_this.selectText] === ev.srcElement.innerText) {
          _this.searchText = _this.result[index][_this.selectText]
          _this.searchParam[_this.searchParamKey] = _this.result[_this.nowIndex][_this.searchParamKey]
          _this.result =[]
          return false
        }
      })
    },
    handleSubmit: function () { // 点击查询时，根据输入框searchText遍历 result获取图表参数对应的值 生成object 返回至父组件
      this.searchParam["pageSize"] = this.pageSize
      this.$emit('getReturnSearch',{ 'url': this.searchData, 'param': this.searchParam, 'searchByKey':this.selectText })
    },
    getselectValue: function (){
      return this.selectText
    }
   },
   watch: {
     selectText:function(val){
       let _this = this
       this.selectitem.forEach(element => {
         if (val === element.selectValue) {
           _this.selectData = element.selectData
           _this.searchData = element.searchData
           _this.searchParamKey = element.searchParam
         }
       })
     },
     pageSize:function(val){
       this.handleSubmit()
     }
   }
}
</script>
<style scoped>
.inputUl {
   position: absolute;
   background: #ffffff;
   width: 385px;
   z-index: 50;
   list-style: none;
   border: 1px solid #ededed;
   margin-left: 120px;
   margin-top: 5px;
 }
.inputUl li {
  padding-left: 10px;
  line-height: 25px;
}
.inputUl li.bg {
  background: #2d8cf0;
  color: #ffffff;
}
.searchBtn {
    cursor: pointer;
    float: left;
    height: 32px;
    line-height: 32px;
    width: 40px;
    text-align: center;
    border: 1px solid #dcdee2;
    margin-left: 8px;
    background: #fff;
}
</style>
