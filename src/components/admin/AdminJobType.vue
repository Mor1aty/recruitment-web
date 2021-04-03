<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>管理列表</el-breadcrumb-item>
      <el-breadcrumb-item>职位类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入职位类型名" v-model="queryInfo.query" clearable @clear="getJobTypeList">
            <el-button slot="append" icon="el-icon-search" @click="getJobTypeList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" @click="addDialogVisible = true">添加职位类型</el-button>
        </el-col>
      </el-row>
      <!-- 维修人员列表区域 -->
      <el-table :data="jobTypeList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="职位类型" prop="name"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="delJobType(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count">
      </el-pagination>
    </el-card>

    <!-- 添加职位类型对话框 -->
    <el-dialog title="添加职位类型" :visible.sync="addDialogVisible" width="25%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px">
        <el-form-item label="职位类型名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addJobType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminJobType",
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      jobTypeList: [],
      count: 0,
      addDialogVisible: false,
      addForm: {
        name: ''
      },
      addFormRules: {
        name: [
          {
            required: true,
            message: '请输入职位类型名',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getJobTypeList()
  },
  methods: {
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getJobTypeList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getJobTypeList()
    },
    async getJobTypeList() {
      const {data: res} = await this.$http.post('admin/finaAllJobType', this.queryInfo)
      if (res.code !== 201) return this.$message.error(res.msg)
      this.jobTypeList = res.data.jobTypes
      this.count = res.data.count
    },
    async delJobType(id) {
      const confirmResult = await this.$confirm('此操作将删除该职位类型，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const {data: res} = await this.$http.post('admin/delJobType', {
        id: id
      })
      if (res.code !== 200) return this.$message.error(res.msg)
      await this.getJobTypeList()
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addJobType() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$http.post('admin/addJobType', this.addForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        this.$message.success('新建成功')
        // 隐藏对话框
        this.addDialogVisible = false
        // 重新获取数据
        await this.getJobTypeList()
      })
    },
  }
}
</script>

<style scoped>

</style>
