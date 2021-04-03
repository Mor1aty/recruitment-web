<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/images/logo.png" alt="">
        <span>招聘后台管理</span>
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <span>{{ this.user.account }}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏测单区域 -->
        <el-menu router :collapse-transition="false" :collapse="isCollapse" unique-opened
                 background-color="#333744"
                 text-color="#fff" active-text-color="#409eff" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="item.icon"></i>
              <!-- 文本 -->
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                          @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i :class="subItem.icon"></i>
                <!-- 文本 -->
                <span>{{ subItem.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 用户数据
      user: {},
      // 左侧菜单数据
      menuList: [],
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: 'admin-home/candidate'
    }
  },
  created() {
    this.getStorageUser()
    this.menuInit()
  },
  methods: {
    // 菜单初始化
    async menuInit() {
      this.menuList = [
        {
          id: 1,
          icon: 'el-icon-s-order',
          name: '管理列表',
          children: [
            {
              id: 101,
              icon: 'el-icon-document',
              name: '应聘者管理',
              path: 'admin-home/candidate'
            },
            {
              id: 102,
              icon: 'el-icon-document',
              name: '公司管理',
              path: 'admin-home/company'
            },
            {
              id: 103,
              icon: 'el-icon-document',
              name: '招聘管理',
              path: 'admin-home/recruit'
            },
            {
              id: 104,
              icon: 'el-icon-document',
              name: '职位类型管理',
              path: 'admin-home/jobType'
            }
          ]
        }
      ]
    },
    // 用户信息操作
    async handleCommand(command) {
      if (command === 'logout') {
        const {data: res} = await this.$http.post('admin/logout')
        if (res.code !== 200) this.$message.error(res.msg)
        this.$message.success(res.msg)
        window.sessionStorage.clear()
        await this.$router.push('/admin')
      }
    },
    // 获取存储的用户信息
    getStorageUser() {
      let storageActivePath = window.sessionStorage.getItem('activePath')
      if (storageActivePath === null) {
        storageActivePath = 'admin-home/candidate'
      }
      this.activePath = storageActivePath
      this.user = JSON.parse(window.sessionStorage.getItem('user'))
      this.type = window.sessionStorage.getItem('type')
    },
    // 菜单折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}

.el-header {
  background-color: #333744;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
    height: inherit;

    > span {
      margin-left: 15px;
    }

    > img {
      height: 50px;
      padding-left: 10px;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 18px;
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
