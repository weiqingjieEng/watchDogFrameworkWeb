<template>
    <div class="graph" :id="'graph_'+graphname" :ref="'graph_'+graphname" :style='{width:graphwidth+"%",height:graphheight+"%"}'>
        {{graphname}}
    </div>
</template>
<script>
import echarts from 'echarts';
export default {
  data () {
    return {
      graph: '',
      graphdata:{}
    }
  },
  props: ['graphwidth', 'graphheight', 'graphurl', 'graphname'],
  created () {
    this.getdata()
  },
  mounted () {
    this.graph = this.$refs.graph
  },
  methods: {
    async getData(){
        this.setting.loading = true;
        try {
            let res = await post(this.graphurl)
            this.graphdata = res.data;
        } catch (error) {
            this.$throw(error)
        }
        this.setting.loading = false;
    }
  }
}
</script>
<style scoped>

</style>
