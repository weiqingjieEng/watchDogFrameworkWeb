<template>
  <div class="searchInput">
    <Row>
      <Col span="8" push="8">
        <Input v-model="searchText" @keyup.native='show($event)' @keydown.down.prevent.native='down()' @keydown.up.prevent.native='up()'>
          <Select v-model="selectText" slot="prepend" style="width: 120px">
              <Option v-for="(item,index) in selectitem" :value="item.selectValue" :key="index">{{item.selectText}}</Option>
          </Select>
          <Button slot="append" type="primary" @click="handleSubmit('formInline')">查询</Button>
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
</style>
