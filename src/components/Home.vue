<template>
  <el-container class="home-container">
    <el-header>
      <div class="header-elem">
        <span class="logo-font">招聘管理系统</span>
        <el-button type="text" class="index" :style="indexShow===true?'color:rgb(93, 213, 200);':'color:white'"
                   @click="pushNext('/home/index','index')">首页
        </el-button>
        <el-button type="text" class="company" :style="companyShow===true?'color:rgb(93, 213, 200);':'color:white'"
                   @click="pushNext('/home/company', 'company')">公司
        </el-button>
        <el-button v-if="!isLogin" round type="success" size="mini" class="register" @click="pushNext('/register')">注册
        </el-button>
        <el-button v-if="!isLogin" round type="success" size="mini" class="login" @click="pushNext('/login')">登录
        </el-button>
        <el-dropdown v-if="isLogin" @command="handleCommand" class="register">
        <span class="el-dropdown-link">
          <span>{{ this.user.info.name }} ({{ this.user.account }})</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="resume">在线简历</el-dropdown-item>
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      isLogin: false,
      type: -1,
      user: {}
    }
  },
  created() {
    this.$router.push('/home/index')
    this.checkLogin()
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
    },
    checkLogin() {
      if (window.sessionStorage.getItem('user') == null) {
        this.isLogin = false
        return
      }
      this.user = JSON.parse(window.sessionStorage.getItem('user'))
      this.type = window.sessionStorage.getItem('type')
      this.isLogin = true
    },
    // 用户信息操作
    async handleCommand(command) {
      if (command === 'logout') {
        const {data: res} = await this.$http.post('user/logout')
        if (res.code !== 200) this.$message.error(res.msg)
        this.$message.success(res.msg)
        window.sessionStorage.clear()
        this.type = -1
        this.user = {}
        this.isLogin = false
        await this.$router.push('/home/index')
      }
      if (command === 'resume') {
        await this.$router.push('/home/candidateInfo')
      }
    },
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;

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
