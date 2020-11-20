<template>
    <div class="graph" id="`graph_${graphname}`" ref="`graph_${graphname}`" :style='{width:graphwidth+"%",height:graphheight+"%"}'>
        {{graphname}}
    </div>
</template>
<script>
export default {
  data () {
    return {
      graph: ''
    }
  },
  props:['graphwidth','graphheight','graphurl','graphname'],
  created() {
    this.getdata();
  },
  mounted() { 
    this.graph = this.$refs.graph;   
  },
  methods: {
    getdata:function() {

    }
 }
}
</script>
<style scoped>

</style>
