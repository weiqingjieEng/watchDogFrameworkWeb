<template>
  <div class="graphContent">
    <div class="graph" :id="'graph_'+graphname" :ref="'graph_'+graphname" :style='{width:graphwidth+"%",height:graphheight+"%"}'></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { post } from '@/libs/axios-cfg'
import iView from 'iview'
import { randomColor, randomSize } from '@/libs/util'
export default {
  data () {
    return {
      graph: '',
      sourcedata: {},
      graphdata: {},
      relation: [],
      detailData: {}
    }
  },
  props: ['graphwidth', 'graphheight', 'graphparam', 'graphname'],
  mounted () {
    this.graph = this.$refs[ 'graph_' + this.graphname ]
  },
  methods: {
    async getdata () {
      try {
        let res = await post(this.graphparam.url, this.graphparam.param)
        if (res.status === 1) {
          this.sourcedata = res.data
          this.arrangedata()
        } else {
          iView.Message.error(res.msg)
        }
      } catch (error) {
        this.$throw(error)
      }
      let option = {
        title: {
          text: this.graphdata.title
        },
        grid: {
          x: '0',
          y: '40',
          x1: '0',
          y1: '0'
        },
        legend: [{
          data: this.graphdata.categories.map(x => x.name),
          left: 'left',
          top: '40',
          orient: 'vertical'
        }],
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if(params.dataType === 'edge') {
              return params.data.source + '---->'+ params.data.name +'---->'+params.data.target
            } else if (params.dataType === 'node'){
              let tipsHtml =''
              if (params.data.detailData.type=== '投标方') {
                tipsHtml = '投标方名称:&nbsp;'+ params.data.detailData.companyName
                if ('companyAddress' in params.data.detailData) {
                  tipsHtml+= '<br>'+ '&nbsp;&nbsp;&nbsp;投标方地址:&nbsp;'+params.data.detailData.companyAddress
                }
              } else if(params.data.detailData.type=== '投标区域') {
                tipsHtml = '投标区域:&nbsp;' + params.data.detailData.country
                if (params.data.detailData.provinceName!==params.data.detailData.cityName) {
                  tipsHtml += '·'+ params.data.detailData.provinceName
                }
                tipsHtml += '·'+ params.data.detailData.cityName
              } else if(params.data.detailData.type=== '发包单位') {
                tipsHtml = '发包单位:&nbsp;' + params.data.detailData.company + '·'+ params.data.detailData.deptName
              } else if(params.data.detailData.type=== '发包人') {
                tipsHtml ='发包人:&nbsp;' + params.data.detailData.personName
                if ('tel' in params.data.detailData) {
                  tipsHtml+= '<br>'+ '&nbsp;&nbsp;&nbsp;联系方式:&nbsp;' + params.data.detailData.tel
                }
                tipsHtml+= '<br>'+ '&nbsp;&nbsp;&nbsp;邮箱:&nbsp;' + params.data.detailData.email
              }
              return params.data.detailData.type +'的详细信息:<br>'+'&nbsp;&nbsp;&nbsp;' + tipsHtml
            }
          }
        },
        series: [{
          type: 'graph',
          layout: 'force',
          symbolSize: 58,
          draggable: true,
          roam: 'scale',
          focusNodeAdjacency: true,
          force: {
            layoutAnimation: true,
            friction: 0.1,
            repulsion: 1200,
            edgeLength: [60, 80]
          },
          categories: this.graphdata.categories,
          edgeSymbol: ['', 'arrow'],
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 20
              },
              formatter (x) {
                return x.data.name
              }
            }
          },
          label: {
            show: true
          },
          data: this.graphdata.nodes,
          links: this.graphdata.links
        }]
      }
      let graphChart = echarts.init(this.graph, { width: this.graphwidth + '%', height: this.graphheight + '%' })
      graphChart.on('mouseup',function(params){
      var option=graphChart.getOption();
      option.series[0].data[params.dataIndex].x=params.event.offsetX;
      option.series[0].data[params.dataIndex].y=params.event.offsetY;
      option.series[0].data[params.dataIndex].fixed=true;
      graphChart.setOption(option);
      });
      graphChart.setOption(option, true)
    },
    arrangedata:function () { // 整理数据 后期还需根据数据进行修改
      let nodes = [] // 定义节点数组
      let links = [] // 定义关系数组
      let category = 0 // 初始化类别为0
      let categories = [] // 定义图例类别
      let Color = ['#f07050', '#6090e0', '#001529', '#d070d0']
      let firNodes = {
        name: this.sourcedata[this.graphparam.searchByKey],
        category: category,
        symbolSize: randomSize(50, 60),
        itemStyle: { color: Color[category]},
        detailData: this.getDetailData(this.sourcedata,this.graphparam.searchByKey==='personName'?'发包人':(this.graphparam.searchByKey==='deptName'?'发包单位':(this.graphparam.searchByKey==='companyName'?'投标方':'')))
        }
      let firCategory = {
        name: this.graphparam.searchByKey==='personName'?'发包人':(this.graphparam.searchByKey==='deptName'?'发包单位':(this.graphparam.searchByKey==='companyName'?'投标方':'')),
        category: category,
        itemStyle: { color: Color[category] }}
      nodes.push(firNodes)
      categories.push(firCategory)
      let _this = this
      for (let prop in this.sourcedata){
        if (typeof (_this.sourcedata[prop]) === 'object' && _this.sourcedata[prop] !== null) {
          category++
          let symbolSize = randomSize(50, 60)
          let keyName = 'cityName' // 根据不同类型获取不同数组里的name
          let categoryName = '投标区域' // 图例的文字
          let linkName = '投标区域' // 关系文字 因为关系是可扩展，需重新定义变量以保证后续开发
          if (prop === 'bidDepts') {
            keyName = 'deptName'
            categoryName = '发包单位'
            linkName = this.graphparam.searchByKey==='companyName'?'发包单位':'投标'
          } else if (prop === 'bidPersons') {
            keyName = 'personName'
            categoryName = '发包人'
            linkName = this.graphparam.searchByKey==='companyName'?'邀请':'投标'
          } else if (prop === 'bidCompanys') {
            keyName = 'companyName'
            categoryName = '投标方'
            linkName = this.graphparam.searchByKey==='personName'?'邀请':'发包单位'
          }
          let curveness = Math.round(Math.random()*10)/10
          categories.push({name: categoryName, category: category, itemStyle: { color: Color[category] }})
          for (let item in _this.sourcedata[prop].datas){
            let nodeitem = {}
            nodeitem.name = _this.sourcedata[prop].datas[item][keyName]
            nodeitem.category = category
            nodeitem.symbolSize = symbolSize
            nodeitem.itemStyle = { color: Color[category]}
            nodeitem.detailData = this.getDetailData(_this.sourcedata[prop].datas[item],categoryName)
            nodes.push(nodeitem)
            if (_this.sourcedata[prop].isSource=== 0) {
              links.push({
                source: _this.sourcedata[_this.graphparam.searchByKey],
                target: _this.sourcedata[prop].datas[item][keyName],
                name: linkName ,
                label: { align: 'center', fontSize: 12 },
                lineStyle: { color: Color[category], curveness: curveness }
              })
            } else if (_this.sourcedata[prop].isSource=== 1) {
              links.push({
                source: _this.sourcedata[prop].datas[item][keyName],
                target: _this.sourcedata[_this.graphparam.searchByKey],
                name: linkName ,
                label: { align: 'center', fontSize: 12 },
                lineStyle: { color: Color[category], curveness: curveness }
              })
            }
          }
        }
      }
      this.graphdata.title = '投标关系图'
      this.graphdata.nodes = nodes
      this.graphdata.links = links
      this.graphdata.categories = categories
      console.log(this.graphdata)
    },
    getDetailData:function (obj, type){
      let datailData = {}
      datailData.type = type
      for (let prop in obj){
        if (typeof (obj[prop]) !== 'object' && obj[prop] !== null && obj[prop] !== '') {
          datailData[prop] = obj[prop]
        }
      }
      return datailData
    }
  },
  watch: {
    graphparam:function(val) { // 监听参数变化 变化则获取图表数据方法 getdata
      this.getdata()
    }
  }
}
</script>
<style scoped>
.graphContent {
  height: 100%;
  width: 100%;
}
.graph {
  float: left;
}
.graphContent ul{
  display:inline-block;
  font-size: 16px;
}
</style>
