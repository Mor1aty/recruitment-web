<template>
  <div class="back">
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">公司招聘</span>
          <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200);font-size: 15px"
                     @click="addRecruitVisible = true">添加
          </el-button>
        </div>
        <div v-for="item in recruits">
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <el-button type="text" class="button" @click="goInfo(item.id)">
                <span style="color: rgb(83,191,179);font-weight: bold; font-size: 20px;">{{ item.name }}
                  [{{ item.city }}]</span>
              </el-button>
              <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200)"
                         @click="delRecruit(item.id)">删除
              </el-button>
              <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200)"
                         @click="showEditRecruitDialog(item)">修改
              </el-button>
            </div>
            <div>
              <span style="color: #fd3333;font-weight: bold;">{{ item.minSalary }}K-{{ item.maxSalary }}K</span><br/>
              {{ item.desc }}
            </div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" style="float: right;" @click="goJobInfo(item.id)">查看应聘详情</el-button>
            </div>
          </el-card>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
    <!-- 添加招聘对话框 -->
    <el-dialog title="添加招聘" :visible.sync="addRecruitVisible" width="40%" @close="addRecruitVisibleClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addRecruitForm" :rules="addRecruitFormRules" ref="addRecruitFormRef" label-width="70px">
        <el-form-item label="职位名称" prop="name">
          <el-input v-model="addRecruitForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职位类型" prop="type">
          <el-select v-model="addRecruitForm.type">
            <el-option :label="item.name" :value="item.id" v-for="item in jobTypes"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位所在城市" prop="city">
          <el-input v-model="addRecruitForm.city"></el-input>
        </el-form-item>
        <el-form-item label="最小薪水" prop="minSalary">
          <el-input v-model="addRecruitForm.minSalary" type="number"></el-input>
        </el-form-item>
        <el-form-item label="最大薪水" prop="maxSalary">
          <el-input v-model="addRecruitForm.maxSalary" type="number"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="addRecruitForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRecruitVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRecruit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改招聘对话框 -->
    <el-dialog title="修改招聘" :visible.sync="editRecruitVisible" width="40%" @close="editRecruitVisibleClosed">
      <!-- 内容主题区域 -->
      <el-form :model="editRecruitForm" :rules="editRecruitFormRules" ref="editRecruitFormRef" label-width="70px">
        <el-form-item label="职位Id" prop="id">
          <el-input v-model="editRecruitForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="name">
          <el-input v-model="editRecruitForm.name"></el-input>
        </el-form-item>
        <el-form-item label="职位类型" prop="type">
          <el-select v-model="editRecruitForm.type">
            <el-option :label="item.name" :value="item.id" v-for="item in jobTypes"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位所在城市" prop="city">
          <el-input v-model="editRecruitForm.city"></el-input>
        </el-form-item>
        <el-form-item label="最小薪水" prop="minSalary">
          <el-input v-model="editRecruitForm.minSalary" type="number"></el-input>
        </el-form-item>
        <el-form-item label="最大薪水" prop="maxSalary">
          <el-input v-model="editRecruitForm.maxSalary" type="number"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="editRecruitForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRecruitVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRecruit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CompanyRecruit",
  data() {
    return {
      user: {},
      recruits: [],
      jobTypes: [],
      addRecruitVisible: false,
      addRecruitForm: {
        name: '',
        type: '无',
        desc: '',
        minSalary: 0,
        maxSalary: 0,
        city: ''
      },
      addRecruitFormRules: {
        name: [
          {
            required: true,
            message: '请输入职位名称',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入职位描述',
            trigger: 'change'
          }
        ],
        city: [
          {
            required: true,
            message: '请输入职位所在城市',
            trigger: 'change'
          }
        ]
      },
      editRecruitVisible: false,
      editRecruitForm: {
        id: 0,
        name: '',
        type: 0,
        desc: '',
        minSalary: 0,
        maxSalary: 0,
        city: ''
      },
      editRecruitFormRules: {
        name: [
          {
            required: true,
            message: '请输入职位名称',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入职位描述',
            trigger: 'change'
          }
        ],
        city: [
          {
            required: true,
            message: '请输入职位所在城市',
            trigger: 'change'
          }
        ]
      },
    }
  },
  created() {
    this.findAllJobType()
    this.getUserInfo()
    this.getMyRecruit()
  },
  methods: {
    async findAllJobType() {
      const {data: res} = await this.$http.post('recruit/findAllJobType')
      if (res.code !== 201) return this.$message.error(res.msg)
      this.jobTypes = res.data
    },
    async getUserInfo() {
      this.user = JSON.parse(window.sessionStorage.getItem('user'))
    },
    async getMyRecruit() {
      let param = {
        wheres: [
          {
            key: 'company',
            opt: '=',
            value: this.user.account,
          }
        ]
      }
      const {data: res} = await this.$http.post('recruit/findRecruit', param)
      if (res.code !== 201) return this.$message.error(res.msg)
      this.recruits = res.data.jobs
    },
    async goJobInfo(id) {
      await this.$router.push({name: 'companyRecruitInfo', params: {id: id}})
    },
    async goInfo(id) {
      await this.$router.push({name: 'recruitInfo', params: {id: id}})
    },
    addRecruitVisibleClosed() {
      this.$refs.addRecruitFormRef.resetFields()
    },
    async addRecruit() {
      if (this.addRecruitForm.type === '无') {
        return this.$message.error('职位类型不能为无')
      }
      if (this.addRecruitForm.maxSalary <= 0 || this.addRecruitForm.minSalary <= 0
          || this.addRecruitForm.minSalary > this.addRecruitForm.maxSalary) {
        return this.$message.error('薪水输入错误')
      }
      this.$refs.addRecruitFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('recruit/addRecruit', this.addRecruitForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('新增成功')
        // 隐藏对话框
        this.addRecruitVisible = false
        // 重新获取数据
        await this.getMyRecruit()
      })
    },
    editRecruitVisibleClosed() {
      this.$refs.editRecruitFormRef.resetFields()
    },
    showEditRecruitDialog(item) {
      this.editRecruitForm.id = item.id
      this.editRecruitForm.name = item.name
      this.editRecruitForm.type = item.type
      this.editRecruitForm.desc = item.desc
      this.editRecruitForm.minSalary = item.minSalary
      this.editRecruitForm.maxSalary = item.maxSalary
      this.editRecruitForm.city = item.city
      this.editRecruitVisible = true
    },
    async editRecruit() {
      if (this.editRecruitForm.maxSalary <= 0 || this.editRecruitForm.minSalary <= 0
          || this.editRecruitForm.minSalary > this.editRecruitForm.maxSalary) {
        return this.$message.error('薪水输入错误')
      }
      this.$refs.editRecruitFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('recruit/editRecruit', this.editRecruitForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('修改成功')
        // 隐藏对话框
        this.editRecruitVisible = false
        // 重新获取数据
        await this.getMyRecruit()
      })
    },
    async delRecruit(id) {
      const confirmResult = await this.$confirm('此操作将删除该招聘信息，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const {data: res} = await this.$http.post('recruit/delRecruit', {"id": id})
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$message.success('删除成功')
      await this.getMyRecruit()
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
