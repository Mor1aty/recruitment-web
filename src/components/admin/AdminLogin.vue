<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="../../assets/images/logo.png" alt="">
        <span style="margin-left: 25px;">管理员登录</span>
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px"
               class="login-form">
        <!-- 账号 -->
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" prefix-icon="el-icon-user" placeholder="请输入管理员账号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock" class="login-input"
                    placeholder="请输入管理员密码"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="23">
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="success" @click="pushIndex">回到首页</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      showLogin: true,
      // 登录表单的数据
      loginForm: {
        account: '',
        password: ''
      },
      // 表单验证规则
      loginFormRules: {
        // 账号
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'change'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'change'
          }
        ],
        // 验证密码
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          },
          {
            min: 3,
            max: 50,
            message: '长度在 3 到 50 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    // 点击重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('admin/login', this.loginForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('登录成功')
        window.sessionStorage.setItem('user', JSON.stringify(res.data))
        window.sessionStorage.setItem('token', res.data.tokenCode)
        await this.$router.push('admin-home/candidate')
      })
    },
    pushIndex(){
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang="less">
// scoped 代表样式只在当前文件生效
.login-container {
  background-image: url("../../assets/images/login_back.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  height: 100%;
}

.login-box {
  width: 450px;
  height: 370px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar-box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .el-select {
    width: 100%;
  }
}

</style>
