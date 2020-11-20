<template>
  <div class="graphcontainer">
    <graph :graphwidth="graphwidth1" :graphheight="graphheight1" :graphname="graphname1" :graphurl="graphurl1"></graph>
    <graph :graphwidth="graphwidth2" :graphheight="graphheight2" :graphname="graphname2" :graphurl="graphurl2"></graph>
  </div>
</template>
<script>
import graph from '@/components/charts/graph' 
export default {
  data () {
    return {
      graphwidth1: 50,
      graphheight1: 50,
      graphname1: 'company',
      graphurl1:'',
      graphwidth2: 50,
      graphheight2: 50,
      graphname2: 'family',
      graphurl2:''
    }
  },
  components: {
    graph
  }
}
</script>
<style scoped>

</style>
