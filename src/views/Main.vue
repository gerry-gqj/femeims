<template>
<div>
  <el-container>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="2">
        <h3 style="text-align: center;line-height: 70px;padding-left: 30px;color: #409eff">Emeims</h3>
      </el-col>
      <el-col :span="2" :offset="20">
        <div style="line-height: 85px">
          <a style="color: steelblue;line-height: 100%">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            用户
          </a>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="250px">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
          background-color="#24262F"
          text-color="#fff"
          active-text-color="#ffd04b" style="width: 210px;height: 100%">

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>采购订单</span>
          </template>
            <el-menu-item index="/main/purchase/create">
              <i class="el-icon-document-add"></i>
              <span>创建订单</span>
            </el-menu-item>
            <el-menu-item index="/main/purchase/manage">
              <i class="el-icon-document-checked"></i>
              <span>订单管理</span>
            </el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>销售订单</span>
          </template>
            <el-menu-item index="/main/sales/create">
              <i class="el-icon-document-add"></i>
              <span>创建订单</span>
            </el-menu-item>
            <el-menu-item index="/main/sales/manage">
              <i class="el-icon-document-checked"></i>
              <span>订单管理</span>
            </el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商品</span>
          </template>
          <el-menu-item index="/main/commodity/manage">
            <i class="el-icon-document-checked"></i>
            <span>商品管理</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>库存单</span>
          </template>
          <el-menu-item index="/main/stock/manage">
            <i class="el-icon-document-checked"></i>
            <span>库存管理</span>
          </el-menu-item>
        </el-submenu>

          <el-menu-item index="/main/account/manage">
            <i class="el-icon-user"></i>
            <span>帐号管理</span>
          </el-menu-item>
      </el-menu>
    </el-aside>


    <el-main>
      <el-card>
        <router-view/>
      </el-card>
    </el-main>
  </el-container>
</el-container>


</div>
</template>

<script>

export default {
    name:'Main',
  components: {},
  data() {
      return {
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}

</script>

<style scoped>


/*.el-header {*/
/*    background-color: #545c64;*/
/*    color: #333;*/
/*    text-align: center;*/
/*    line-height: 60px;*/
/*  }*/

/*  .el-aside {*/
/*    background-color: #D3DCE6;*/
/*    color: #333;*/
/*    text-align: center;*/
/*    line-height: 200px;*/
/*  }*/

/*  .el-main {*/
/*    background-color: #E9EEF3;*/
/*    color: #333333;*/
/*    text-align: center;*/
/*    line-height: 160px;*/
/*  }*/
/*  */
/*  body > .el-container {*/
/*    margin-bottom: 40px;*/
/*  }*/
/*  */
/*  .el-container:nth-child(5) .el-aside,*/
/*  .el-container:nth-child(6) .el-aside {*/
/*    line-height: 260px;*/
/*  }*/
/*  */
/*  .el-container:nth-child(7) .el-aside {*/
/*    line-height: 320px;*/
/*  }*/

/* .bd-placeholder-img {*/
/*  font-size: 1.125rem;*/
/*  text-anchor: middle;*/
/*  -webkit-user-select: none;*/
/*  -moz-user-select: none;*/
/*  user-select: none;*/
/*}*/

/*@media (min-width: 768px) {*/
/*  .bd-placeholder-img-lg {*/
/*    font-size: 3.5rem;*/
/*  }*/
/*}*/



/*html,*/
/*body {*/
/*  overflow-x: hidden; !* Prevent scroll on narrow devices *!*/
/*}*/

body {
  padding-top: 56px;
}

.el-header {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #24262F;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}


.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}

</style>