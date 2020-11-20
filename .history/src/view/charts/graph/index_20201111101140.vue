<template>
  <div class="graphcontainer">
    <div class="formcontainer">
      <Form ref="formInline" :model="formInline" :label-width="100" inline>
        <Row>
          <Col span="7">
            <FormItem label="公司名称">
                <Input type="text" v-model="formInline.company" @keyup.native='show($event)' @keydown.native='down()' @keydown.up.prevent.native='up()' placeholder="请输入公司名称...." style="width:300px"/>
                <ul class="inputUl" style="width:300px">
                  <li v-for="(item, index) in result" :class='{bg: index==nowIndex}'>
                      {{item.name}}
                  </li>
                </ul>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="发包人">
                <Input type="text" v-model="formInline.user" placeholder="请输入发包人" style="width:300px"/>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="发包单位">
                <Input type="text" v-model="formInline.pdu" placeholder="请输入发包单位" style="width:300px"/>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="grapcontent">
      <graph :graphwidth="graphwidth1" :graphheight="graphheight1" :graphname="graphname1" :graphurl="graphurl1"></graph>
    </div>
  </div>
</template>
<script>
import graph from '@/components/charts/graph'
import { post } from '@/libs/axios-cfg'
export default {
  data () {
    return {
      graphwidth1: 50,
      graphheight1: 100,
      graphname1: 'company',
      graphurl1: '',
      formInline: {
        company: '',
        user: '',
        pdu: ''
      },
      nowIndex: -1,
      text: '',
      result: [],
      allcompany: [
        { id: '1', name: '上海伦翔电子科技有限公司' },
        { id: '2', name: '上海则旭机械设备有限公司' },
        { id: '3', name: '上海现代科技发展有限公司' },
        { id: '4', name: '上海现代科技有限公司' },
        { id: '5', name: '亿新源电子科技有限公司' },
        { id: '6', name: '大千电子实业公司' },
        { id: '7', name: '大庆市振富科技信息股份有限公司' },
        { id: '8', name: '山东科宝电子有限公司事业部' },
        { id: '9', name: '广东东莞市威杰电子有限公司' },
        { id: '10', name: '广东汕尾创能科技股份有限公司' },
        { id: '11', name: '广东省深圳速杰电子有限公司' },
        { id: '12', name: '广东鼎泰机器人科技有限公司' },
        { id: '13', name: '广东聚广恒自动化设备有限公司' },
        { id: '14', name: '广州市威控计算机科技有限公司' },
        { id: '15', name: '广州市番禺区旧水坑富利电子厂' },
        { id: '16', name: '广州华信电子有限公司' },
        { id: '17', name: '广州华港公司' },
        { id: '18', name: '广州宝创自动化设备有限公司' },
        { id: '19', name: '广州威控电子计算机科技有限公司' },
        { id: '20', name: '广州皇牌自动设备有限公司' },
        { id: '21', name: '广州英钛信息科技有限公司' },
        { id: '22', name: '广州煌牌自动设备有限公司' },
        { id: '23', name: '飞新科技电子有限公司' },
        { id: '24', name: '中山市东区锦源电子厂' },
        { id: '25', name: '中山市坦洲镇友创电子贴片厂' },
        { id: '26', name: '云龙科技有限公司' },
        { id: '27', name: '天励电子科技(深圳)有限公司'},
        { id: '28', name: '天来国际发展集团有限公司' },
        { id: '29', name: '幻星数码科技有限公司' },
        { id: '30', name: '日东电子设备有限公司' },
        { id: '31', name: '日东电子科技(深圳)有限公司销售部' }
      ]
    }
  },
  components: {
    graph
  },
  mounted () {
    // this.getCompanyData()
  },
  methods: {
    async getCompanyData () { 
      let res = await post('api/get_company_data',{
          value: '广州'
      })
      console.log(res)
    },
    show: function(ev) {
      if (ev.keyCode === 38 || ev.keyCode === 40) {
        if (this.nowIndex < -1){
          return
        }
        if (this.nowIndex != this.result.length && this.nowIndex != -1) {
          this.formInline.company = this.result[this.nowIndex]
        }
        return
      }
      if (ev.keyCode === 13) {
        this.formInline.company = this.result[this.nowIndex]
        this.result =[]
      }
      this.text = this.formInline.company;
      // this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
      //     params: {
      //         wd: this.inputText
      //     },
      //     jsonp: 'cb'
      // }).then(res => {
      //     this.result = res.data.s;
      // })
      let _this = this
      let companyData =[]
      this.allcompany.forEach(function (item, index) {
        if (item.name.toLowerCase().indexOf(_this.formInline.company.toLowerCase()) > -1) {
          companyData.push(item)
        }
      })
      this.result = companyData
    },
    down: function() {
        this.nowIndex++;
        if (this.nowIndex === this.result.length) {
            this.nowIndex = -1;
            this.formInline.company = this.text;
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
            this.formInline.company = this.text;
        }
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
