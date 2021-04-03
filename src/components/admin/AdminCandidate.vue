<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>管理列表</el-breadcrumb-item>
      <el-breadcrumb-item>应聘者管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入应聘者名" v-model="queryInfo.query" clearable @clear="getCandidateList">
            <el-button slot="append" icon="el-icon-search" @click="getCandidateList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 维修人员列表区域 -->
      <el-table :data="candidateList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="帐号" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column label="email" prop="email"></el-table-column>
        <el-table-column label="生日" prop="birthday"></el-table-column>
        <el-table-column label="描述" prop="desc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="delCandidate(scope.row.account)"></el-button>
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
  </div>
</template>

<script>
export default {
  name: "AdminCandidate",
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      candidateList: [],
      count: 0,
    }
  },
  created() {
    this.getCandidateList()
  },
  methods: {
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCandidateList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getCandidateList()
    },
    async getCandidateList() {
      const {data: res} = await this.$http.post('admin/finaAllCandidate', this.queryInfo)
      if (res.code !== 201) return this.$message.error(res.msg)
      this.candidateList = res.data.candidates
      this.count = res.data.count
    },
    async delCandidate(account) {
      const confirmResult = await this.$confirm('此操作将删除该应聘者，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const {data: res} = await this.$http.post('admin/delCandidate', {
        candidate: account
      })
      if (res.code !== 200) return this.$message.error(res.msg)
      await this.getCandidateList()
    }
  }
}
</script>

<style scoped>

</style>
