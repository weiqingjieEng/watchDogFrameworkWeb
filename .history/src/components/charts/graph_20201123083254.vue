<template>
  <div class="graphContent">
    <div class="graph" :id="'graph_'+graphname" :ref="'graph_'+graphname" :style='{width:graphwidth+"%",height:graphheight+"%"}'></div>
    <ul :style='{width:graphwidth+"%",height:graphheight+"%"}' v-show='relation.length !== 0'>
      <li v-for="(item, index) in relation" :key='index'>
        {{item.source}}---->{{item.name}}----->{{item.target}}
      </li>
    </ul>
  </div>
</template>
<script>
import echarts from 'echarts'
import { post } from '@/libs/axios-cfg'
import { randomColor, randomSize } from '@/libs/util'
export default {
  data () {
    return {
      graph: '',
      sourcedata: {},
      graphdata: {},
      relation: []
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
        this.sourcedata = res.data
        this.arrangedata()
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
        series: [{
          type: 'graph',
          layout: 'force',
          symbolSize: 58,
          draggable: true,
          roam: false,
          focusNodeAdjacency: true,
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
          force: {
            repulsion: 2000,
            edgeLength: 120
          },
          data: this.graphdata.nodes,
          links: this.graphdata.links
        }]
      }
      let graphChart = echarts.init(this.graph, { width: this.graphwidth + '%', height: this.graphheight + '%' })
      let _this = this
      graphChart.on('mouseover',function(params){
        _this.showlinks(params)
      })
      graphChart.setOption(option, true)
    },
    arrangedata:function () { // 整理数据 后期还需根据数据进行修改
      let nodes = [] // 定义节点数组
      let links = [] // 定义关系数组
      let category = 0 // 初始化类别为0
      let categories = [] // 定义图例类别
      let companyColor = randomColor()
      let companyNodes = {
        name: this.sourcedata.companyName,
        category: category,
        symbolSize: randomSize(50, 80),
        itemStyle: { color: companyColor.color},
        label: {normal: {color: companyColor.textcolor}} }
      let categoryCompany = {name: '公司', category: category, itemStyle: { color: companyColor.color }}
      nodes.push(companyNodes)
      categories.push(categoryCompany)
      let _this = this
      for (let prop in this.sourcedata){
        if (typeof (_this.sourcedata[prop]) === 'object' && _this.sourcedata[prop] !== null) {
          category++
          let symbolSize = randomSize(50, 80)
          let color = randomColor()
          console.log(color.color +'----->' + color.textcolor)
          let keyName = 'cityName' // 根据不同类型获取不同数组里的name
          let categoryName = '投标区域' // 图例的文字
          if (prop === 'bidDepts') {
            keyName = 'deptName'
            categoryName = '发包单位'
          } else if (prop === 'bidPersons') {
            keyName = 'personName'
            categoryName = '发包人'
          }
          let curveness = Math.round(Math.random()*10)/10
          categories.push({name: categoryName, category: category, itemStyle: { color: color.color }})
          for (let item in _this.sourcedata[prop].datas){
            let nodeitem ={}
            nodeitem.name = _this.sourcedata[prop].datas[item][keyName]
            nodeitem.category = category
            nodeitem.symbolSize = symbolSize
            nodeitem.itemStyle = { color: color.color}
            nodeitem.label = {normal: {color: color.textcolor}}
            nodes.push(nodeitem)
            if (_this.sourcedata[prop].isSource=== 0) {
              links.push({
                source: _this.sourcedata.companyName,
                target: _this.sourcedata[prop].datas[item][keyName],
                name: categoryName ,
                label: { align: 'center', fontSize: 12 },
                lineStyle: { color: color.color, curveness: curveness }
              })
            } else if (_this.sourcedata[prop].isSource=== 1) {
              links.push({
                source: _this.sourcedata[prop].datas[item][keyName],
                target: _this.sourcedata.companyName,
                name: categoryName ,
                label: { align: 'center', fontSize: 12 },
                lineStyle: { color: color.color, curveness: curveness }
              })
            }
          }
        }
      }
      this.graphdata.title = '投标关系图'
      this.graphdata.nodes = nodes
      this.graphdata.links = links
      this.graphdata.categories = categories
    },
    showlinks:function (params) {
      if (this.relation.length!==0) {
        this.relation = []
      }
      if (params.dataType === 'edge') {
        let item = {}
        item.name = params.data.name
        item.source = params.data.source
        item.target = params.data.target
        this.relation.push(item)
      } else if (params.dataType === 'node') {
        this.graphdata.links.forEach((item, index) => {
          if (item.source === params.data.name ||item.target === params.data.name) {
            this.relation.push(item)
          }
        })
      }
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
.graphContent ul {
  display:inline-block;
  font-size: 16px;
}
</style>
