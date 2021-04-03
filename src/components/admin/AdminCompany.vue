<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>管理列表</el-breadcrumb-item>
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入公司名" v-model="queryInfo.query" clearable @clear="getCompanyList">
            <el-button slot="append" icon="el-icon-search" @click="getCompanyList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 维修人员列表区域 -->
      <el-table :data="companyList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="帐号" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="城市" prop="city"></el-table-column>
        <el-table-column label="网站" prop="website"></el-table-column>
        <el-table-column label="描述" prop="desc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="delCompany(scope.row.account)"></el-button>
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
  name: "AdminCompany",
  data() {
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      companyList: [],
      count: 0,
    }
  },
  created() {
    this.getCompanyList()
  },
  methods: {
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCompanyList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getCompanyList()
    },
    async getCompanyList() {
      const {data: res} = await this.$http.post('admin/finaAllCompany', this.queryInfo)
      if (res.code !== 201) return this.$message.error(res.msg)
      this.companyList = res.data.companies
      this.count = res.data.count
    },
    async delCompany(account) {
      const confirmResult = await this.$confirm('此操作将删除该公司，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      const {data: res} = await this.$http.post('admin/delCompany', {
        company: account
      })
      if (res.code !== 200) return this.$message.error(res.msg)
      await this.getCompanyList()
    }
  }
}
</script>

<style scoped>

</style>
