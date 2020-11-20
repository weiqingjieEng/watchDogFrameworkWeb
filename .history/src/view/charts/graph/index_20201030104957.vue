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
      graphheight1: 100,
      graphname1: 'company',
      graphurl1: '',
      graphwidth2: 50,
      graphheight2: 100,
      graphname2: 'family',
      graphurl2: ''
    }
  },
  components: {
    graph
  }
}
</script>
<style scoped>
 .graphcontainer {
   width: 100%;
   height: 100%;
 }
</style>
