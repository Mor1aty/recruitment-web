<template>
  <div class="back">
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">我的应聘</span>
        </div>
        <div v-for="item in progresses">
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 30px;font-weight: bold" v-if="item.progress===0">等待中</span>
              <span style="font-size: 30px;font-weight: bold" v-if="item.progress===1">已接受, 准备面试吧</span>
              <span style="font-size: 30px;font-weight: bold" v-if="item.progress===2">已拒绝, 再接再厉</span>
            </div>
            <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
            <i class="el-icon-medal" style="color: rgb(93, 213, 200)"></i>
            <span style="display:-moz-inline-box;display:inline-block; width: 15%">  {{ item.jobName }}</span>
            <el-button type="text" class="button" @click="goInfo(item.job)">查看详情</el-button>
          </el-card>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyProgress",
  data() {
    return {
      progresses: {},
      count: 0
    }
  },
  created() {
    this.getMyProgress()
  },
  methods: {
    async getMyProgress() {
      const {data: res} = await this.$http.post('recruit/findMyProgress')
      if (res.code !== 201) this.$message.error(res.msg)
      this.progresses = res.data.progresses
      this.count = res.data.count
      console.log(res)
    },
    async goInfo(id) {
      await this.$router.push({name: 'recruitInfo', params: {id: id}})
    }
  }
}
</script>

<style scoped lang="less">
.back {
  background-color: rgb(246, 246, 248);
  height: 100%;
  width: 100%;
}

.container {
  width: 40%;
  margin-top: 1%;
  margin-left: 30%;
  margin-bottom: 2%;
}
</style>
