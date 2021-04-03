<template>
  <div class="back">
    <div class="container">
      <el-card class="job-card box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">我的在线简历</span>
        </div>
        <div>
          <el-card class="job-card box-card">
            <span style="font-size: 30px;font-weight: bold">{{ user.name }} </span>
            <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200)"
                       @click="showChangeInfoDialog">修改
            </el-button>
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
              <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200)"
                         @click="addPositionVisible = true">添加
              </el-button>
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
                <el-button type="text" class="button" style="color: rgb(93, 213, 200)" @click="delPosition(item.id)">
                  删除
                </el-button>
              </div>
            </div>
          </el-card>
          <el-divider></el-divider>
          <el-card class="job-card box-card">
            <div slot="header" class="clearfix">
              <span style="font-size: 20px;font-weight: bold;color: rgb(93, 213, 200)">| </span>
              <span style="font-weight: bold">工作经历</span>
              <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200)"
                         @click="addWorkVisible = true">添加
              </el-button>
            </div>
            <div>
              <div v-for="item in user.workExperienceList" :key="item.id" :value="item.id" style="width: 100%;">
                <el-button type="text" class="button" style="float:right;color: rgb(93, 213, 200)"
                           @click="delWork(item.id)">删除
                </el-button>
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
              <el-button type="text" class="button" style="float: right;color: rgb(93, 213, 200)"
                         @click="addEduVisible=true">添加
              </el-button>
            </div>
            <div>
              <div v-for="item in user.educationExperienceList" :key="item.id" :value="item.id" style="width: 100%;">
                <el-button type="text" class="button" style="float:right;color: rgb(93, 213, 200)"
                           @click="delEdu(item.id)">删除
                </el-button>
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

    <!-- 修改个人信息对话框 -->
    <el-dialog title="修改个人信息" :visible.sync="changeInfoVisible" width="40%" @close="changeInfoVisibleClosed">
      <!-- 内容主题区域 -->
      <el-form :model="changeInfoForm" :rules="changeInfoFormRules" ref="changeInfoFormRef" label-width="70px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="changeInfoForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="changeInfoForm.gender">
            <el-option label="我是男生" value="男"></el-option>
            <el-option label="我是女生" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="changeInfoForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="changeInfoForm.email"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
              v-model="changeInfoForm.birthday"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="desc" prop="desc">
          <el-input v-model="changeInfoForm.desc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加期望职位对话框 -->
    <el-dialog title="添加期望职位" :visible.sync="addPositionVisible" width="40%" @close="addPositionVisibleClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addPositionForm" :rules="addPositionFormRules" ref="addPositionFormRef" label-width="70px">
        <el-form-item label="职位" prop="position">
          <el-input v-model="addPositionForm.position"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addPositionForm.city"></el-input>
        </el-form-item>
        <el-form-item label="薪水" prop="salary">
          <el-select v-model="addPositionForm.salary">
            <el-option :label="item" :value="item" v-for="item in salaryCondition"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPositionVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPosition">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加工作经历对话框 -->
    <el-dialog title="添加期望职位" :visible.sync="addWorkVisible" width="40%" @close="addWorkVisibleClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addWorkForm" :rules="addWorkFormRules" ref="addWorkFormRef" label-width="70px">
        <el-form-item label="公司" prop="company">
          <el-input v-model="addWorkForm.company"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="addWorkForm.department"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="addWorkForm.position"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="addWorkForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addWorkVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWork">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加教育经历对话框 -->
    <el-dialog title="添加教育经历" :visible.sync="addEduVisible" width="40%" @close="addEduVisibleClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addEduForm" :rules="addEduFormRules" ref="addEduFormRef" label-width="70px">
        <el-form-item label="学校" prop="school">
          <el-input v-model="addEduForm.school"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="academic">
          <el-input v-model="addEduForm.academic"></el-input>
        </el-form-item>
        <el-form-item label="主修" prop="major">
          <el-input v-model="addEduForm.major"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="eduDate">
          <el-date-picker
              v-model="addEduForm.eduDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="addEduForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEduVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEdu">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "CandidateInfo",
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
      user: {},
      changeInfoVisible: false,
      changeInfoForm: {
        name: '',
        gender: '',
        phone: '',
        email: '',
        birthday: '',
        desc: ''
      },
      changeInfoFormRules: {
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
      salaryCondition: [
        '0-3k', '3k-5k', '5k-10k', '10k-15k', '15k-20k', '20k-30k', '30k-50k', '50k-100k'
      ],
      addPositionVisible: false,
      addPositionForm: {
        position: '',
        city: '',
        salary: ''
      },
      addPositionFormRules: {
        position: [
          {
            required: true,
            message: '请输入职位',
            trigger: 'change'
          }
        ],
        city: [
          {
            required: true,
            message: '请输入城市',
            trigger: 'change'
          }
        ],
        salary: [
          {
            required: true,
            message: '请输入薪水',
            trigger: 'change'
          }
        ]
      },
      addWorkVisible: false,
      addWorkForm: {
        company: '',
        department: '',
        position: '',
        desc: ''
      },
      addWorkFormRules: {
        company: [
          {
            required: true,
            message: '请输入公司',
            trigger: 'change'
          }
        ],
        department: [
          {
            required: true,
            message: '请输入部门',
            trigger: 'change'
          }
        ],
        position: [
          {
            required: true,
            message: '请输入职位',
            trigger: 'change'
          }
        ]
      },
      addEduVisible: false,
      addEduForm: {
        school: '',
        academic: '',
        major: '',
        desc: '',
        startDate: '',
        endDate: '',
        eduDate: []
      },
      addEduFormRules: {
        school: [
          {
            required: true,
            message: '请输入学校',
            trigger: 'change'
          }
        ],
        academic: [
          {
            required: true,
            message: '请输入专业',
            trigger: 'change'
          }
        ],
        major: [
          {
            required: true,
            message: '请输入主修',
            trigger: 'change'
          }
        ],
        eduDate: [
          {
            required: true,
            message: '请输入时间',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const {data: res} = await this.$http.post('user/findCandidateInfo')
      if (res.code !== 201) this.$message.error(res.msg)
      this.user = res.data
    },
    changeInfoVisibleClosed() {
      this.$refs.changeInfoFormRef.resetFields()
    },
    showChangeInfoDialog() {
      this.changeInfoForm.name = this.user.name
      this.changeInfoForm.gender = this.user.gender
      this.changeInfoForm.phone = this.user.phone
      this.changeInfoForm.email = this.user.email
      this.changeInfoForm.birthday = this.user.birthday
      this.changeInfoForm.desc = this.user.desc
      this.changeInfoVisible = true
    },
    async changeInfo() {
      this.$refs.changeInfoFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('user/updateCandidate', this.changeInfoForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('修改成功')
        // 隐藏对话框
        this.changeInfoVisible = false
        // 重新获取数据
        await this.getUserInfo()
      })
    },
    addPositionVisibleClosed() {
      this.$refs.addPositionFormRef.resetFields()
    },
    async addPosition() {
      this.$refs.addPositionFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('user/addExpectedPosition', this.addPositionForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('新增成功')
        // 隐藏对话框
        this.addPositionVisible = false
        // 重新获取数据
        await this.getUserInfo()
      })
    },
    async delPosition(id) {
      const confirmResult = await this.$confirm('此操作将删除该期望职位，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const {data: res} = await this.$http.post('user/delExpectedPosition', {"id": id})
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$message.success('删除成功')
      await this.getUserInfo()
    },
    addWorkVisibleClosed() {
      this.$refs.addWorkFormRef.resetFields()
    },
    async addWork() {
      this.$refs.addWorkFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('user/addWorkExperience', this.addWorkForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('新增成功')
        // 隐藏对话框
        this.addWorkVisible = false
        // 重新获取数据
        await this.getUserInfo()
      })
    },
    async delWork(id) {
      const confirmResult = await this.$confirm('此操作将删除该工作经历，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const {data: res} = await this.$http.post('user/delWorkExperience', {"id": id})
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$message.success('删除成功')
      await this.getUserInfo()
    },
    addEduVisibleClosed() {
      this.$refs.addEduFormRef.resetFields()
    },
    async addEdu() {
      this.$refs.addEduFormRef.validate(async valid => {
        if (!valid) return
        this.addEduForm.startDate = this.addEduForm.eduDate[0]
        this.addEduForm.endDate = this.addEduForm.eduDate[1]
        const {data: res} = await this.$http.post('user/addEducationExperience', this.addEduForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('新增成功')
        // 隐藏对话框
        this.addEduVisible = false
        // 重新获取数据
        await this.getUserInfo()
      })
    },
    async delEdu(id) {
      const confirmResult = await this.$confirm('此操作将删除该教育经历，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const {data: res} = await this.$http.post('user/delEducationExperience', {"id": id})
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$message.success('删除成功')
      await this.getUserInfo()
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
