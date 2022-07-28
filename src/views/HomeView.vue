<template>
  <div class="home">
    <!-- 用elemnet-plus布局，分成上，侧边，中心内容 -->
    <el-container>

      <!-- 头部 -->
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"
            ><img src="../assets/logo.jpg" class="logo"
          /></el-col>
          <el-col :span="16"><h2 class="title">后台管理系统</h2></el-col>
          <el-col :span="4"><span class="logout" @click="logout">退出登录</span></el-col>
        </el-row>
      </el-header>

      <el-container>

        <!-- 侧边栏导航 -->
        <el-aside width="230px">
          <el-col >
            <el-menu
              :default-active="route.path"
              class="el-menu-vertical-demo"
              text-color="#333"
              router
            >
              <el-menu-item v-for="(tab,index) in list" :key="index" :index="tab.path">
                <span>{{tab.meta.title}}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <!-- 中心内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter,useRoute } from 'vue-router'

export default defineComponent({
  name: "HomeView",
  setup(){
    // 定义路由器
    const router = useRouter()
    // 定义路由
    const route = useRoute()
    // 通过filter函数筛选 要显示的路由
    const list = router.getRoutes().filter(item => item.meta.isShow)

    function logout(){
      // 删除存储的token
      localStorage.removeItem('token')
      // 跳转到首页
      router.push('/login')
    }

    return {
      list,
      route,
      logout
    }
  }
});
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #eee;
}
.el-header {
  background-color: #fff;
  height: 80px;
  border-bottom: 1px solid var(--el-border-color);
  .logo {
    padding: 10px 0;
    height: 60px;
    line-height: 80px;
  }
  .title {
    text-align: center;
    line-height: 80px;
    height: 80px;
  }
  .logout {
    display: block;
    line-height: 80px;
    height: 80px;
    text-align: center;
    cursor: pointer ;
  }
}

.el-aside {
  height: calc(100vh - 81px);
  background-color: #fff;
  border-right: 1px solid var(--el-border-color);

  .el-menu-item {
    border-bottom: 1px solid var(--el-border-color);
  }
}
</style>
