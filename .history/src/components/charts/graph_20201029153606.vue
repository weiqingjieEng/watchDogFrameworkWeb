<template>
    <div class="graph" id="graph" ref="graph" :style='{width:graphwidth+"%",height:graphheight+"%"}'></div>
</template>
<script>
export default {
  data () {
    return {
        graph: ''
    }
  },
  props:['graphwidth','graphheight','graphurl','graphname'],
  created(){
    this.getdata();
  },
  mounted(){ 
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


