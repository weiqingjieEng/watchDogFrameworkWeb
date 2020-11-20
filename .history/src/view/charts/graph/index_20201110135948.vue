<template>
  <div class="graphcontainer">
    <Form ref="formInline" :model="formInline" label-position="left" inline>
      <Row>
        <Col span="7">
          <FormItem label="公司名称">
              <Input type="text" v-model="formInline.company" placeholder="请输入公司名称...."/>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="发包人">
              <Input type="text" v-model="formInline.user" placeholder="请输入发包人"/>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="发包单位">
              <Input type="text" v-model="formInline.pdu" placeholder="请输入发包单位"/>
          </FormItem>
        <Col span="3">
          <FormItem>
              <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>
        </Col>
      <Row>
    </Form>
    <graph :graphwidth="graphwidth1" :graphheight="graphheight1" :graphname="graphname1" :graphurl="graphurl1"></graph>
  </div>
</template>
<script>
import graph from '@/components/charts/graph'
export default {
  data () {
    return {
      graphwidth1: 100,
      graphheight1: 100,
      graphname1: 'company',
      graphurl1: '',
      formInline: {
        company: '',
        user: '',
        pdu: ''
      }
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
