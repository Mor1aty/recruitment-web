<template>
  <div class="back">
    <div class="header">
      <div class="header-info">
        <br/><br/>
        <span style="color: #b8bac1;font-weight: unset">招聘中</span><br/><br/>
        <span style="color: white;font-weight: bold;font-size: 50px;">{{ company.name }}</span>
        <br/><br/>
        <span style="color: #b8bac1;font-weight: unset">{{ company.city }} · {{ company.website }}</span><br/><br/>
      </div>
    </div>
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
          <span style="font-weight: bold">公司描述</span><br/>
        </div>
        <div>
          {{ company.desc }}
        </div>
      </el-card>
      <el-divider>招聘岗位</el-divider>
      <div v-for="item in recruits" :key="item.id" :value="item.id">
        <el-card class="job-card box-card">
          <div slot="header" class="clearfix">
            <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
            <span style="font-weight: bold">{{ item.name }}</span><br/>
          </div>
          <div>
            <span style="font-weight: bold">{{ item.minSalary }}K-{{ item.maxSalary }}K</span><br/><br/>
            <i class="el-icon-map-location" style="color: rgb(93, 213, 200);margin-right: 10px;"></i> {{ item.city }}
            <br/>
            <i class="el-icon-postcard" style="color: rgb(93, 213, 200);margin-right: 10px;"></i> {{ item.typeName }}
            <br/><br/>
            {{ item.desc }}
          </div>
          <div class="bottom clearfix">
            <el-button type="text" class="button" style="float: right;" @click="goJobInfo(item.id)">查看详情</el-button>
          </div>
        </el-card>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecruitInfo",
  data() {
    return {
      company: {},
      recruits: [],
    }
  },
  created() {
    this.getCompanyInfo()
  },
  methods: {
    async getCompanyInfo() {
      let companyParam = {
        wheres: [
          {
            key: 'account',
            opt: '=',
            value: this.$route.params.account,
          }
        ]
      }
      const {data: res} = await this.$http.post('recruit/findCompany', companyParam)
      if (res.code !== 201) return this.$message.error(res.msg)
      this.company = res.data.companies[0]
      let recruitsParam = {
        wheres: [
          {
            key: 'j.company',
            opt: '=',
            value: this.company.account,
          }
        ]
      }
      const {data: res1} = await this.$http.post('recruit/findRecruit', recruitsParam)
      if (res1.code !== 201) return this.$message.error(res.msg)
      this.recruits = res1.data.jobs
    },
    async goJobInfo(id) {
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
