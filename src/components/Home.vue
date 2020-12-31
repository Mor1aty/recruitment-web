<template>
  <div>
    <div>
      <el-button type="primary" @click="test">测试</el-button>
    </div>
    <br/>
    <el-tag>{{ testStr }}</el-tag>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // test
      testStr: '无'
    }
  },
  methods: {
    // test
    async test() {
      const {data: res} = await this.$http.get('test/test1')
      if (res.code !== 201) {
        return this.$message.error(res.msg)
      }
      this.testStr = res.data
      this.$message.success(res.msg)
    }
  }
}
</script>

<style scoped>

</style>
