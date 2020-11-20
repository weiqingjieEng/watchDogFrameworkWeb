<template>
    <div class="graph" id="graph" ref="graph" :style='{width:mapwidth+"%",height:mapheight+"%"}'></div>
</template>
<script>
export default {
    data () {
        return {
            graph: ''
        }
    },
    props:['mapwidth','mapheight','mapurl'],
    created(){
        this.getdata();
    },
    mounted(){ 
        this.graph = this.$refs.graph;   
    },
    methods: {
        getdata:function(){
            
        }
    }
}
</script>
<style scoped>

</style>


