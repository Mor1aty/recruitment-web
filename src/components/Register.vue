<template>
  <div class="register-container">
    <div class="register-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="../assets/images/logo.png" alt="">

      </div>
      <el-radio-group v-model="isCandidate" class="choose">
        <el-radio class="find-job" :label="true">我要找工作</el-radio>
        <el-radio class="new-job" :label="false">我要招聘</el-radio>
      </el-radio-group>
      <el-form v-if="isCandidate" ref="registerFormRef" :model="registerForm" :rules="registerFormRules"
               label-width="0px"
               class="register-form">
        <!-- 账号 -->
        <el-form-item prop="account">
          <el-input v-model="registerForm.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-user" type="password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item prop="name">
          <el-input v-model="registerForm.name" prefix-icon="el-icon-user" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item prop="gender">
          <el-select v-model="registerForm.gender">
            <el-option label="我是男生" value="男"></el-option>
            <el-option label="我是女生" value="女"></el-option>
          </el-select>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" prefix-icon="el-icon-user" placeholder="请输入手机"></el-input>
        </el-form-item>
        <!-- email -->
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" prefix-icon="el-icon-user" placeholder="请输入email"></el-input>
        </el-form-item>
        <!-- 生日 -->
        <el-form-item prop="birthday">
          <el-date-picker
              v-model="registerForm.birthday"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择生日">
          </el-date-picker>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="7">
            <!-- 登录区域 -->
            <el-button type="text" class="login" @click="$router.push('/login')">已有账号，登录</el-button>
          </el-col>
          <el-col :span="17">
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="register">注册</el-button>
              <el-button type="info" @click="resetRegisterForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-if="!isCandidate" ref="registerFormRef" :model="registerForm" :rules="registerFormRules"
               label-width="0px"
               class="register-form">
        <!-- 账号 -->
        <el-form-item prop="account">
          <el-input v-model="registerForm.account" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="el-icon-user" type="password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="7">
            <!-- 注册区域 -->
            <el-button type="text" class="login" @click="$router.push('/login')">已有账号，登录</el-button>
          </el-col>
          <el-col :span="17">
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="register">登录</el-button>
              <el-button type="info" @click="resetRegisterForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    const validatorPhone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      // 注册类型
      isCandidate: true,
      // 注册表单的数据
      registerForm: {
        account: '',
        password: '',
        name: '',
        gender: '男',
        phone: '',
        email: '',
        birthday: '',
      },
      // 表单验证规则
      registerFormRules: {
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
            message: '长度在 6 到 50 个字符',
            trigger: 'change'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'change'
          }
        ],
        phone: [
          {
            required: true,
            validator: validatorPhone,
            trigger: 'change'
          }
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: '请输入正确的email',
            trigger: 'change'
          }
        ],
        birthday: [
          {
            required: true,
            message: '请输入生日',
            trigger: 'change'
          }
        ]
      },
    }
  },
  methods: {
    // 点击重置登录表单
    resetRegisterForm() {
      this.$refs.registerFormRef.resetFields()
    },
    // 注册
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('user/registerCandidate', this.registerForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('注册成功')
        await this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped lang="less">
// scoped 代表样式只在当前文件生效
.register-container {
  background-image: url("../assets/images/login_back.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  height: 100%;
}

.register-box {
  width: 500px;
  height: 600px;
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

.choose {
  width: 100%;

  .find-job {
    float: left;
    margin-left: 30px;
    margin-top: 50px;
  }

  .new-job {
    float: right;
    margin-right: 30px;
    margin-top: 50px;
  }
}


.btns {
  display: flex;
  justify-content: flex-end;
}

.register-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .el-select {
    width: 100%;
  }
}

.login {
  display: flex;
  justify-content: flex-start;
}
</style>
