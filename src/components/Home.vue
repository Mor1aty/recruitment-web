<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-elem">
        <span class="logo-font">招聘管理系统</span>
        <el-button type="text" icon="el-icon-map-location" class="location">{{ location }}</el-button>
        <el-button type="text" class="index" :style="indexShow===true?'color:rgb(93, 213, 200);':'color:white'"
                   @click="pushNext('/home/index','index')">首页
        </el-button>
        <el-button type="text" class="company" :style="companyShow===true?'color:rgb(93, 213, 200);':'color:white'"
                   @click="pushNext('/home/company', 'company')">公司
        </el-button>
        <el-button round type="success" size="mini" class="register" @click="pushNext('/register')">注册</el-button>
        <el-button round type="success" size="mini" class="login" @click="pushNext('/login')">登录</el-button>
      </div>
    </el-header>
    <el-container>
      <router-view/>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      location: '全国 [切换城市]',
      indexShow: true,
      companyShow: false,
    }
  },
  created() {
    this.$router.push('/home/index')
  },
  methods: {
    pushNext(next, show) {
      this.$router.push(next)
      if (show !== undefined) {
        switch (show) {
          case 'index':
            this.indexShow = true
            this.companyShow = false
            break
          case 'company':
            this.indexShow = false;
            this.companyShow = true
            break
          default:
            break
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  background-color: rgb(246, 246, 248);

  .el-header {
    background-color: rgb(32, 35, 41);
    display: flex;
    padding-left: 0;
    align-items: center;
    height: 50px !important;

    .header-elem {
      margin: 0 auto;

      .logo-font {
        color: rgb(93, 213, 200);
        font-size: 23px;
      }
    }

    .location {
      margin-left: 15px;
      font-size: 15px;
      color: rgb(93, 213, 200);
    }

    .index {
      margin-left: 100px;
      font-size: 15px;
    }

    .company {
      margin-left: 15px;
      font-size: 15px;
    }

    .register {
      margin-left: 600px;
      font-size: 15px;
      color: white;
      background-color: rgb(32, 35, 41);
      border-color: rgb(93, 213, 200);
    }

    .login {
      margin-left: 15px;
      font-size: 15px;
      background-color: rgb(32, 35, 41);
      border-color: rgb(93, 213, 200);
    }
  }
}
</style>
