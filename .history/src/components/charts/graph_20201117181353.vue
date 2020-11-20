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
export default {
  data () {
    return {
      graph: '',
      sourcedata: {},
      graphdata: {},
      relation: []
    }
  },
  props: ['graphwidth', 'graphheight', 'graphurl', 'graphname'],
  created () {
    // 暂时无url故先注释
  },
  mounted () {
    this.graph = this.$refs[ 'graph_' + this.graphname ]
    this.getdata()
  },
  methods: {
    async getdata () {
      try {
        let res = await post(this.graphurl,{'companyName': '東莞正陽電子有限公司'})
        this.sourcedata = res.data
        this.arrangedata()
      } catch (error) {
        this.$throw(error)
      }
      // 模拟数据
      // this.graphdata = {
      //   title: '知识图谱',
      //   nodes: [{
      //     name: '操作系统集团',
      //     category: 0,
      //     symbolSize: 100,
      //     itemStyle: { color: '#006acc' }
      //   }, {
      //     name: '浏览器有限公司',
      //     category: 0,
      //     symbolSize: 100,
      //     itemStyle: { color: '#006acc' }
      //   }, {
      //     name: 'HTML科技',
      //     category: 0,
      //     symbolSize: 100,
      //     itemStyle: { color: '#006acc' }
      //   }, {
      //     name: 'JavaScript科技',
      //     category: 0,
      //     symbolSize: 100,
      //     itemStyle: { color: '#006acc' }
      //   }, {
      //     name: 'CSS科技',
      //     category: 0,
      //     symbolSize: 100,
      //     itemStyle: { color: '#006acc' }
      //   }, {
      //     name: 'Chrome',
      //     category: 1,
      //     symbolSize: 50,
      //     itemStyle: { color: '#ff7d18' }
      //   }, {
      //     name: 'IE',
      //     category: 1,
      //     symbolSize: 50,
      //     itemStyle: { color: '#ff7d18' }
      //   }, {
      //     name: 'Firefox',
      //     category: 1,
      //     symbolSize: 50,
      //     itemStyle: { color: '#ff7d18' }
      //   }, {
      //     name: 'Safari',
      //     category: 1,
      //     symbolSize: 50,
      //     itemStyle: { color: '#ff7d18' }
      //   }],
      //   links: [{
      //     source: '浏览器有限公司',
      //     target: '操作系统集团',
      //     name: '参股',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#ff7d18', curveness: 0.5 }
      //   }, {
      //     source: 'HTML科技',
      //     target: '浏览器有限公司',
      //     name: '参股',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#ff7d18', curveness: 0.5 }
      //   }, {
      //     source: 'CSS科技',
      //     target: '浏览器有限公司',
      //     name: '参股',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#ff7d18', curveness: 0.5 }
      //   }, {
      //     source: 'JavaScript科技',
      //     target: '浏览器有限公司',
      //     name: '参股',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#ff7d18', curveness: 0.5 }
      //   }, {
      //     source: 'Chrome',
      //     target: '浏览器有限公司',
      //     name: '董事',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#10a050', curveness: 0.8 }
      //   }, {
      //     source: 'IE',
      //     target: '浏览器有限公司',
      //     name: '董事',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#10a050', curveness: 0.8 }
      //   }, {
      //     source: 'Firefox',
      //     target: '浏览器有限公司',
      //     name: '董事',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#10a050', curveness: 0.8 }
      //   }, {
      //     source: 'Safari',
      //     target: '浏览器有限公司',
      //     name: '董事',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#10a050', curveness: 0.8 }
      //   }, {
      //     source: 'Chrome',
      //     target: 'JavaScript科技',
      //     name: '法人',
      //     label: { align: 'center', fontSize: 12 },
      //     lineStyle: { color: '#006acc', curveness: 0.3 }
      //   }],
      //   categories: [{
      //     name: '公司',
      //     category: 0,
      //     itemStyle: { color: '#006acc' }
      //   }, {
      //     name: '董事',
      //     category: 1,
      //     itemStyle: { color: '#ff7d18' }
      //   }]
      // }
      // let option = {
      //   title: {
      //     text: this.graphdata.title
      //   },
      //   grid: {
      //     x: '0',
      //     y: '40',
      //     x1: '0',
      //     y1: '0'
      //   },
      //   legend: [{
      //     data: this.graphdata.categories.map(x => x.name)
      //   }],
      //   series: [{
      //     type: 'graph',
      //     layout: 'force',
      //     symbolSize: 58,
      //     draggable: true,
      //     roam: false,
      //     focusNodeAdjacency: true,
      //     categories: this.graphdata.categories,
      //     edgeSymbol: ['', 'arrow'],
      //     edgeLabel: {
      //       normal: {
      //         show: true,
      //         textStyle: {
      //           fontSize: 20
      //         },
      //         formatter (x) {
      //           return x.data.name
      //         }
      //       }
      //     },
      //     label: {
      //       show: true
      //     },
      //     force: {
      //       repulsion: 2000,
      //       edgeLength: 120
      //     },
      //     data: this.graphdata.nodes,
      //     links: this.graphdata.links
      //   }]
      // }
      // let graphChart = echarts.init(this.graph, { width: this.graphwidth + '%', height: this.graphheight + '%' })
      // let _this = this
      // graphChart.on('mouseover',function(params){
      //   _this.showlinks(params)
      // })
      // graphChart.setOption(option, true)
    },
    arrangedata:function () {
      let _this = this
      for(let prop in this.sourcedata){
        if (typeof(_this.sourcedata[prop]) === 'object') {
          console.log(prop)
        }
      }
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
