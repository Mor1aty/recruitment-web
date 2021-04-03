<template>
  <div class="back">
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">详情</span>
        </div>
        <div v-for="item in progresses">
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <el-button type="text" class="button" @click="goJobInfo(item.candidateAccount)">
                <span style="color: rgb(83,191,179);font-weight: bold; font-size: 20px;">{{ item.candidateName }}
                  [{{ item.candidateAccount }}]</span>
              </el-button>
            </div>
            <div>
              <span style="font-size: 30px;font-weight: bold; color: #409eff" v-if="item.progress===0">等待中</span>
              <span style="font-size: 30px;font-weight: bold; color: #85ce61" v-if="item.progress===1">已接受</span>
              <span style="font-size: 30px;font-weight: bold; color: red" v-if="item.progress===2">已拒绝</span>
            </div>
            <div class="bottom clearfix">
              <el-button type="success" round style="float: right;" @click="decide(item.id, 1)">同意</el-button>
              <el-button type="danger" round style="float: right;" @click="decide(item.id, 2)">拒绝</el-button>
            </div>
          </el-card>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyRecruit",
  data() {
    return {
      progresses: []
    }
  },
  created() {
    this.getProgresses()
  },
  methods: {
    async getProgresses() {
      const {data: res} = await this.$http.post('recruit/findProgress', {
        job: this.$route.params.id
      })
      if (res.code !== 201) return this.$message.error(res.msg)
      this.progresses = res.data.progresses
    },
    async goJobInfo(candidate) {
      await this.$router.push({name: 'companyCandidateInfo', params: {candidate: candidate}})
    },
    async decide(id, result) {
      const {data: res} = await this.$http.post('recruit/editProgress', {
        id: id,
        result: result
      })
      if (res.code !== 200) return this.$message.error(res.msg)
      await this.getProgresses()
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
