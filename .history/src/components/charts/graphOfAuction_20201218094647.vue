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
            console.log('test')
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
        detailData: this.getDetailData(this.sourcedata,this.graphparam.searchByKey==='auctionName'?'标案':'公司')
        }
      let firCategory = {
        name: this.graphparam.searchByKey==='auctionName'?'标案':'公司',
        category: category,
        itemStyle: { color: Color[category] }}
      nodes.push(firNodes)
      categories.push(firCategory)
      let _this = this
      for (let prop in this.sourcedata){
        if (typeof (_this.sourcedata[prop]) === 'object' && _this.sourcedata[prop] !== null) {
          category++
          let symbolSize = randomSize(50, 60)
          let keyName = 'companyName' // 根据不同类型获取不同数组里的name
          let categoryName = this.graphparam.searchByKey==='auctionName'?'公司':'合作公司' // 图例的文字
          let linkName = '合作次数' // 关系文字 因为关系是可扩展，需重新定义变量以保证后续开发
          let curveness = Math.round(Math.random()*10)/10
          categories.push({name: categoryName, category: category, itemStyle: { color: Color[category] }})
          // for (let item in _this.sourcedata[prop].datas){
          //   let nodeitem = {}
          //   nodeitem.name = _this.sourcedata[prop].datas[item][keyName]
          //   nodeitem.category = category
          //   nodeitem.symbolSize = symbolSize
          //   nodeitem.itemStyle = { color: Color[category]}
          //   nodeitem.detailData = this.getDetailData(_this.sourcedata[prop].datas[item],categoryName)
          //   nodes.push(nodeitem)
          // }
          this.getNodeAndLinks(nodes, category, Color, symbolSize, keyName, categoryName, linkName, curveness,_this.sourcedata[prop])
        }
      }
      this.graphdata.title = '转让关系图'
      this.graphdata.nodes = nodes
      this.graphdata.links = links
      this.graphdata.categories = categories
      console.log(this.graphdata)
    },
    getNodeAndLinks:function(nodes, category, Color, symbolSize, keyName, categoryName, linkName, curveness, obj){
      for (let prop in obj) {
        if (obj[prop] instanceof Array && obj[prop] !== null) {
          for (let item in obj[prop]) {
            let nodeitem = {}
            nodeitem.name = obj[prop][item][keyName]
            nodeitem.category = category
            nodeitem.symbolSize = symbolSize
            nodeitem.itemStyle = { color: Color[category]}
            nodeitem.detailData = this.getDetailData(obj[prop][item],categoryName)
            nodes.push(nodeitem)
            for (let prop in obj[prop][item]){
              if (typeof (item[prop]) === 'object' && item[prop] !== null) {
                this.getNodeAndLinks(nodes, category, Color, symbolSize, keyName, categoryName, linkName, curveness, item[prop])
              }
            }
          }
        }
      }
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
