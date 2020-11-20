<template>
  <div class="searchInput">
    <Row>
      <Col span="8" push="8">
        <Input v-model="searchText">
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
         }
       });
     }
   },
   watch: {
     selectText: (val) => {
       this.selectitem.forEach(element => {
         if (val === element.selectValue) {
           this.selectData = element.selectData
           this.searchData = element.searchData
         }
       })
       console.log(this.selectData + '-----' + this.searchData)
     }
   }
}
</script>
<style scoped>
</style>
