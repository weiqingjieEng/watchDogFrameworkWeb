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
   created(){
      this.defaultDta()
    },
   mounted: {
   },
   methods: {
     defaultDta: function() {
       let _this = this
       this.selectitem.forEach(element => {
         if (element.isSelected) {
           _this.selectText = element.selectValue
         }
       });
     }
   },
   watch: {
     selectText: (val) => {
       console.log(val)
     }
   }
}
</script>
<style scoped>
</style>
