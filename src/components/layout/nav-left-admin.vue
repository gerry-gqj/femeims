<template>
    <!-- 左侧菜单栏 -->
    <el-menu
        unique-opened
        :collapse="isCollapse"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#24262F"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
      <!--是否水平折叠收起菜单 会影响这里字段的显示 -->
      <div>
        <h5 v-show="isCollapse" style="padding-left: 15px;margin-top: 15px;color: #577eff;font-weight: bold;font-style: italic">IMS</h5>
        <h4 v-show="!isCollapse" style="padding-left: 30px;margin-top: 15px;color: #577eff;font-weight: bold;font-style: italic">EMEIMS</h4>
      </div>
      <hr style="color: white;border: #409eff"/>
      <el-menu-item
          :index="item.path"
          v-for="item in noChildren"
          :key="item.path"
          @click="clickMenu(item)">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu
          index="index"
          v-for="(item,index) in hasChildren"
          :key="index"
      >
        <template slot="title">
          <i :class="'el-icon-'+item.icon"></i>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
              :index="subItem.path"
              v-for="(subItem,subIndex) in item.children"
              :key="subIndex"
              @click="clickMenu(subItem)">
            <i :class="'el-icon-'+subItem.icon"></i>
            {{subItem.label}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

</template>

<script>
import admmenu from '@/config/admmenu'


export default {
  name: "nav-left",

  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    //有子菜单
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
    isCollapse() {
      // 这里的数据就是从vuex取得
      return this.$store.state.tab.isCollapse
    }
  },
  data(){
    return{
      //获取菜单栏数据并赋值给menu
      menu:admmenu
    }
  },
  methods:{
    clickMenu(item){
      this.$store.commit('selectMenu',item)
    },
  }
}
</script>

<style scoped>
.el-menu{
  height: 100%;
  border: none;
}
.el-menu {
  height: 100%;
  border: none;
}
h3{
  color: #ffffff;
  text-align: center;
  line-height: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>