<template>
  <div class="searchInput">
    <Row>
      <Col span="8" push="8">
        <Input v-model="searchText" @keyup.native='show($event)' @keydown.down.prevent.native='down()' @keydown.up.prevent.native='up()'>
          <Select v-model="selectText" slot="prepend" style="width: 120px">
              <Option v-for="(item,index) in selectitem" :value="item.selectValue" :key="index">{{item.selectText}}</Option>
          </Select>
          <Button slot="append" type="primary" @click="handleSubmit('searchText')">查询</Button>
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
    this.defaultDta()
   },
   methods: {
     defaultDta: function() {
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
     show: function(ev) {
      if (ev.keyCode === 38 || ev.keyCode === 40) {
        if (this.nowIndex < -1){
          return
        }
        if (this.nowIndex != this.result.length && this.nowIndex != -1) {
          this.searchText = this.result[this.nowIndex].name
        }
        return
      }
      if (ev.keyCode === 13) {
        this.searchText = this.result[this.nowIndex].name
        this.result =[]
        return
      }
      if (ev.keyCode === 8 &&this.searchText=== '') {
        this.result =[]
      }
      this.text = this.searchText;
      let selectParamKey = this.selectParam
      this.$http.jsonp(this.selectData, { // 模糊查询
          params: {
            selectParamKey: this.searchText
          },
      }).then(res => {
          this.result = res.data;
      })
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
    changebg: function (ev) {
      let _this = this
      this.result.forEach((item, index) => {
        if (item.name === ev.srcElement.innerText) {
          _this.nowIndex = index
        }
      })
    },
    getClickData: function(ev) { // 下拉li被点击时
      let _this = this
      this.result.forEach((item, index) => {
        if (item.name === ev.srcElement.innerText) {
          _this.searchText = _this.result[index].name
          _this.result =[]
          return false
        }
      })
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
