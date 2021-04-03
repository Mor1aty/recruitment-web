<template>
  <div class="back">
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">公司信息</span>
        </div>
        <div>
          <el-card class="job-card box-card">
            <span style="font-size: 30px;font-weight: bold">{{ user.info.name }} </span>
            <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200)"
                       @click="showChangeInfoDialog">修改
            </el-button>
            <br/><br/>
            <i class="el-icon-mobile-phone" style="color: rgb(93, 213, 200);font-weight: bold;"></i>
            <span style="margin-right: 30px"> {{ user.info.city }}</span>
            <i class="el-icon-message" style="color: rgb(93, 213, 200);font-weight: bold;"></i>
            <span style="margin-right: 30px"> {{ user.info.website }}</span>
          </el-card>
          <el-divider></el-divider>
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px;font-weight: bold;color: rgb(93, 213, 200)">| </span>
              <span style="font-weight: bold">公司描述</span>
            </div>
            <div>
              {{ user.info.desc }}
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
    <!-- 修改公司信息对话框 -->
    <el-dialog title="修改公司信息" :visible.sync="changeInfoVisible" width="40%" @close="changeInfoVisibleClosed">
      <!-- 内容主题区域 -->
      <el-form :model="changeInfoForm" :rules="changeInfoFormRules" ref="changeInfoFormRef" label-width="70px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="changeInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="changeInfoForm.city"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="website">
          <el-input v-model="changeInfoForm.website"></el-input>
        </el-form-item>
        <el-form-item label="公司码" prop="code">
          <el-input v-model="changeInfoForm.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="changeInfoForm.desc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CompanyInfo",
  data() {
    return {
      user: {},
      changeInfoVisible: false,
      changeInfoForm: {
        name: '',
        city: '',
        website: '',
        code: '',
        desc: ''
      },
      changeInfoFormRules: {
        name: [
          {
            required: true,
            message: '请输入公司名称',
            trigger: 'change'
          }
        ],
        city: [
          {
            required: true,
            message: '请输入公司所在城市',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入公司码',
            trigger: 'change'
          }
        ],
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.user = JSON.parse(window.sessionStorage.getItem('user'))
    },
    changeInfoVisibleClosed() {
      this.$refs.changeInfoFormRef.resetFields()
    },
    showChangeInfoDialog() {
      this.changeInfoForm.name = this.user.info.name
      this.changeInfoForm.city = this.user.info.city
      this.changeInfoForm.website = this.user.info.website
      this.changeInfoForm.code = this.user.info.code
      this.changeInfoForm.desc = this.user.info.desc
      this.changeInfoVisible = true
    },
    async changeInfo() {
      this.$refs.changeInfoFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('user/updateCompany', this.changeInfoForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('修改成功')
        // 隐藏对话框
        this.changeInfoVisible = false
        this.user.info.name = this.changeInfoForm.name
        this.user.info.city = this.changeInfoForm.city
        this.user.info.website = this.changeInfoForm.website
        this.user.info.code = this.changeInfoForm.code
        this.user.info.desc = this.changeInfoForm.desc
        window.sessionStorage.setItem('user', JSON.stringify(this.user))
      })
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
