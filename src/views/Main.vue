<template>
<div class="main">
  <el-container style="width:100%;height: 100vh;">
    <!--侧边导航-->
    <el-aside width="auto">
      <navLeft/>
    </el-aside>

    <!--顶部导航-->
    <el-container>
      <el-header>
        <navTop/>
      </el-header>


    <!--主体内容-->
    <el-main>
      <navTags/>

      <div class="content" style="margin-top: 30px">
        <el-card>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-card>
      </div>
    </el-main>
    </el-container>
</el-container>
</div>
</template>

<script>

import navTop from '@/components/layout/nav-top'
import navTags from "@/components/layout/tags";
import navLeft from '@/components/layout/nav-left'

export default {
  name:'Main',
  components: {
    navTop,
    navTags,
    navLeft
  },
}

</script>

<style scoped>
.el-main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-header{
  background-color: black;
  color: #fff;
  padding-top: 10px;
}
.content{
  padding: 20px;
}
</style>