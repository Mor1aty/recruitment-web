<template>
  <div class="back">
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">在线简历</span>
        </div>
        <div>
          <el-card class="job-card box-card">
            <span style="font-size: 30px;font-weight: bold">{{ user.name }} </span>
            <i style="font-weight: bold;font-size: 30px; color: rgb(93, 213, 200)"
               :class="this.user.gender === '女'?'el-icon-female':'el-icon-male'"></i><br/><br/>
            <i class="el-icon-mobile-phone" style="color: rgb(93, 213, 200);font-weight: bold;"></i>
            <span style="margin-right: 30px"> {{ user.phone }}</span>
            <i class="el-icon-message" style="color: rgb(93, 213, 200);font-weight: bold;"></i>
            <span style="margin-right: 30px"> {{ user.email }}</span>
            <i class="el-icon-date" style="color: rgb(93, 213, 200);font-weight: bold;"></i>
            <span style="margin-right: 30px" v-if="user.birthday"> {{ user.birthday.substring(0, 10) }} </span>
          </el-card>
          <el-divider></el-divider>
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px;font-weight: bold;color: rgb(93, 213, 200)">| </span>
              <span style="font-weight: bold">个人优势</span>
            </div>
            <div>
              {{ user.desc }}
            </div>
          </el-card>
          <el-divider></el-divider>
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px;font-weight: bold;color: rgb(93, 213, 200)">| </span>
              <span style="font-weight: bold">期望职位</span>
            </div>
            <div>
              <div v-for="item in user.expectedPositionList" :key="item.id" :value="item.id" style="width: 100%;">
                <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
                <i class="el-icon-medal" style="color: rgb(93, 213, 200)"></i>
                <span style="display:-moz-inline-box;display:inline-block; width: 15%"> {{ item.position }}</span>
                <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
                <i class="el-icon-money" style="color: rgb(93, 213, 200)"></i>
                <span style="display:-moz-inline-box;display:inline-block;width: 15%"> {{ item.salary }}</span>
                <span style="margin-left: 5px;margin-right: 5px;font-size: 18px;color: rgb(93, 213, 200)">|</span>
                <i class="el-icon-location-outline" style="color: rgb(93, 213, 200)"></i>
                <span style="display:-moz-inline-box;display:inline-block;width: 45%"> {{ item.city }}</span>
              </div>
            </div>
          </el-card>
          <el-divider></el-divider>
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px;font-weight: bold;color: rgb(93, 213, 200)">| </span>
              <span style="font-weight: bold">工作经历</span>
            </div>
            <div>
              <div v-for="item in user.workExperienceList" :key="item.id" :value="item.id" style="width: 100%;">
                <span style="font-size: 15px;font-weight: bold">{{ item.company }}</span><br/><br/>
                <span style="font-size: 15px;font-weight: bold">{{ item.department }}</span><br/><br/>
                <span style="font-size: 15px;font-weight: bold">职务: </span>{{ item.position }}<br/><br/>
                <span style="font-size: 15px;font-weight: bold">内容: </span>{{ item.desc }}
                <el-divider></el-divider>
              </div>
            </div>
          </el-card>
          <el-divider></el-divider>
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px;font-weight: bold;color: rgb(93, 213, 200)">| </span>
              <span style="font-weight: bold">教育经历</span>
            </div>
            <div>
              <div v-for="item in user.educationExperienceList" :key="item.id" :value="item.id" style="width: 100%;">
                <span style="font-size: 18px;font-weight: bold">{{ item.school }}</span>
                <span style="margin-left: 20px; color: #909399" v-if="item.startDate&&item.endDate">
                  {{ item.startDate.substring(0, 10) }} 到 {{ item.endDate.substring(0, 10) }}
                </span><br/><br/>
                <span style="font-weight: bold;color: #909399">{{ item.major }}</span>
                <span style="margin-left:10px;font-weight: bold;color: #909399">{{ item.academic }}</span><br/><br/>
                <span style="font-weight: bold;color: #909399">{{ item.desc }}</span>
                <el-divider></el-divider>
              </div>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyCandidateInfo",
  data() {
    return {
      user: {},
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const {data: res} = await this.$http.post('recruit/findCandidate', {
        candidate: this.$route.params.candidate
      })
      if (res.code !== 201) this.$message.error(res.msg)
      this.user = res.data
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

.container {
  width: 40%;
  margin-top: 1%;
  margin-left: 30%;
  margin-bottom: 2%;
}
</style>
