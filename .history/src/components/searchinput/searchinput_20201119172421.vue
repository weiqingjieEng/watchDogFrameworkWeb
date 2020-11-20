<template>
  <div class="searchInput">
    <Row>
      <Col span="8" push="8">
        <Input v-model="searchText">
            <Select v-model="selectText" slot="prepend" style="width: 120px">
                <!-- <Option value="companyName">公司名称</Option>
                <Option value="bidPersons">发包人</Option>
                <Option value="bidDepts">发包单位</Option> -->
                <Option v-for="(item,index) in selectitem" :value="item.selectValue" :key="index">{{item.selectText}}</Option>
            </Select>
            <Button slot="append" type="primary" @click="handleSubmit('formInline')">查询</Button>
        </Input>
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
     }
   },
   props:['selectitem']
}
</script>
<style scoped>
</style>
