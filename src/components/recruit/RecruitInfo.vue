<template>
  <div class="back">
    <div class="header">
      <div class="header-info">
        <br/><br/>
        <span style="color: #b8bac1;font-weight: unset">招聘中</span><br/><br/>
        <span style="color: white;font-weight: bold;font-size: 50px;">{{ job.name }}</span>
        <span style="color: #fa6a43;font-weight: bold;font-size: 40px;margin-left:30px;">
          {{ job.minSalary }}K-{{ job.maxSalary }}K
        </span>
        <el-button class="startBtn" type="success" round>申请职位</el-button>
        <br/><br/>
        <span style="color: #b8bac1;font-weight: unset">{{ job.city }} · {{ job.typeName }}</span><br/><br/>
      </div>
    </div>
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
          <span style="font-weight: bold">职位描述</span><br/>
        </div>
        <div>
          {{ job.desc }}
        </div>
      </el-card>
      <el-divider></el-divider>
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
          <span style="font-weight: bold">公司介绍</span><br/>
        </div>
        <div>
          <span style="font-weight: bold">{{ company.name }}</span><br/><br/>
          <i class="el-icon-map-location" style="color: rgb(93, 213, 200);margin-right: 10px;"></i>{{ company.city }}<br/>
          <i class="el-icon-postcard" style="color: rgb(93, 213, 200);margin-right: 10px;"></i>
          <a :href="company.website">{{ company.website }}</a><br/><br/>
          {{company.desc}}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecruitInfo",
  data() {
    return {
      job: {},
      company: {}
    }
  },
  created() {
    this.getRecruitInfo()
  },
  methods: {
    async getRecruitInfo() {
      let jobParam = {
        wheres: [
          {
            key: 'j.id',
            opt: '=',
            value: this.$route.params.id,
          }
        ]
      }
      const {data: res} = await this.$http.post('recruit/findRecruit', jobParam)
      if (res.code !== 201) return this.$message.error(res.msg)
      this.job = res.data.jobs[0]
      let companyParam = {
        wheres: [
          {
            key: 'account',
            opt: '=',
            value: this.job.company,
          }
        ]
      }
      const {data: res1} = await this.$http.post('recruit/findCompany', companyParam)
      if (res1.code !== 201) return this.$message.error(res.msg)
      this.company = res1.data.companies[0]
    },
  }
}
</script>

<style scoped lang="less">
.back {
  background-color: rgb(246, 246, 248);
  height: 100%;
  width: 100%;
}

.header {
  background-color: #444c60;
  height: 250px;
}

.header-info {
  width: 50%;
  margin-left: 25%;
  margin-bottom: 2%;
}

.startBtn {
  float: right;
  color: white;
  background-color: rgb(32, 35, 41);
  border-color: rgb(93, 213, 200);
}

.container {
  width: 50%;
  margin-top: 1%;
  margin-left: 25%;
  margin-bottom: 2%;
}
</style>
