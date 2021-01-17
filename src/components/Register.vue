<template>
  <div class="register-container">
    <div class="register-box">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal"
               background-color="#3c3b3722" text-color="#fff" active-text-color="#409EFF" @select="isCandidate=!isCandidate">
        <el-menu-item index="1">应聘者注册</el-menu-item>
        <el-menu-item index="2">公司注册</el-menu-item>
      </el-menu>
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
          <el-radio v-model="registerForm.gender" label="男">男</el-radio>
          <el-radio v-model="registerForm.gender" label="女">女</el-radio>
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
        <el-form-item>
          <div>
            <el-button class="register-btn" type="info" @click="resetRegisterForm">重置</el-button>
            <el-button class="register-btn" type="primary" @click="$router.push('/login')">登录</el-button>
          </div>
          <el-divider></el-divider>
          <div>
            <el-button class="register-btn-im" type="primary" @click="register">注册</el-button>
          </div>
        </el-form-item>
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
        <el-form-item>
          <div>
            <el-button class="register-btn" type="info" @click="resetRegisterForm">重置</el-button>
            <el-button class="register-btn" type="primary" @click="$router.push('/login')">登录</el-button>
          </div>
          <el-divider></el-divider>
          <div>
            <el-button class="register-btn-im" type="primary" @click="">注册</el-button>
          </div>
        </el-form-item>
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
.register-container {
  background-image: url("../assets/images/register_background.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  height: 100%;
}

.register-box {
  width: 260px;
  height: 450px;
  border-radius: 3px;
  position: absolute;
  left: 71%;
  top: 40%;
  transform: translate(-50%, -50%);
  background-color: rgba(147, 145, 145, 0.1);
}

.register-form {
  position: absolute;
  margin-top: 10px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  .el-select {
    width: 100%;
  }
}

.register-btn {
  background-color: unset !important;
  width: 105px;
}

.register-btn-im {
  background-color: unset !important;
  width: 220px;
}
</style>
