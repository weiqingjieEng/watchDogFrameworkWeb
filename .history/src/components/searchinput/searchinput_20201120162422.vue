<template>
  <div class="searchInput">
    <Row>
      <Col span="8" push="8">
        <Input v-model="searchText" @keyup.native='show($event)' @keydown.down.prevent.native='down()' @keydown.up.prevent.native='up()'>
          <Select v-model="selectText" slot="prepend" style="width: 120px">
              <Option v-for="(item,index) in selectitem" :value="item.selectValue" :key="index">{{item.selectText}}</Option>
          </Select>
          <Button slot="append" type="primary" @click="handleSubmit()">查询</Button>
        </Input>
        <ul class="inputUl">
          <li v-for="(item, index) in result" :class='{bg: index==nowIndex}' :key='index' @mouseover="changebg($event)" @click="getClickData($event)">
              {{item.name}}
          </li>
        </ul>
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
       selectParam: '',
       searchParam: '',
       nowIndex: -1,
       text: '',
       result: []
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
           _this.selectParam = element.selectParam
           _this.searchParam = element.searchParam
         }
       });
     },
     async show (ev) {
      if (ev.keyCode === 38 || ev.keyCode === 40) {
        if (this.nowIndex < -1){
          return
        }
        if (this.nowIndex != this.result.length && this.nowIndex != -1) {
          this.searchText = this.result[this.nowIndex][this.selectValue]
        }
        return
      }
      if (ev.keyCode === 13) {
        this.searchText = this.result[this.nowIndex][this.selectValue]
        return
      }
      if (ev.keyCode === 8 &&this.searchText=== '') {
        this.result =[]
      }
      this.text = this.searchText;
      let selectParamKey = this.selectParam
      try {
        let res = post(this.selectData,{selectParamKey: this.searchText}) // 获取模糊查询的数据
        console.log(res)
        this.result = res.data;
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
        if (item[_this.selectValue] === ev.srcElement.innerText) {
          _this.nowIndex = index
        }
      })
    },
    getClickData: function(ev) { // 下拉li被点击时
      let _this = this
      this.result.forEach((item, index) => {
        if (item[_this.selectValue] === ev.srcElement.innerText) {
          _this.searchText = _this.result[index][_this.selectValue]
          return false
        }
      })
    },
    handleSubmit: function () { // 点击查询时，根据输入框searchText遍历 result获取图表参数对应的值 生成object 返回至父组件
      let searchDTO = ''
      let searchKey = this.searchParam
      this.result.forEach((item, index) => {
        if (this.searchText === item.name) {
          searchDTO = item.DTO
        }
      })
      let param = {}
      param[this.searchParam] = searchDTO
      this.$emit('getReturnSearch',{ 'url': this.searchData, 'param': param })
    }
   },
   watch: {
     selectText:function(val){
       let _this = this
       this.selectitem.forEach(element => {
         if (val === element.selectValue) {
           _this.selectData = element.selectData
           _this.searchData = element.searchData
            _this.selectParam = element.selectParam
           _this.searchParam = element.searchParam
         }
       })
     }
   }
}
</script>
<style scoped>
.inputUl {
   position: absolute;
   background: #ffffff;
   width: 300px;
   z-index: 50;
   list-style: none;
   border: 1px solid #ededed;
 }
.inputUl li {
  margin-left: 10px;
}
.inputUl li.bg {
  background: #2d8cf0;
  color: #ffffff;
}
</style>
