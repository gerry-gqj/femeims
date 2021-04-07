<template>
<div>
  <el-container>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="2">
        <h3 style="text-align: center;line-height: 70px;padding-left: 30px;color: #409eff">Emeims</h3>
      </el-col>
      <el-col :span="2" :offset="20">
        <div>
          <el-dropdown trigger="click">
            <span class="demonstration" style="color: #409eff">{{$store.state.userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="userInfo">用户信息</el-dropdown-item>
              <el-dropdown-item @click.native="signOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="250px">
<!--      <h3 style="text-align: center;line-height: 70px;padding-left: 30px;color: #409eff">Emeims</h3>-->
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

          <el-menu-item index="/main/account/manage" v-if="this.$store.state.position==='系统管理员'">
            <i class="el-icon-user"></i>
            <span>帐号管理</span>
          </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <el-card>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-card>
    </el-main>
  </el-container>
</el-container>
  
  <div>
    <el-dialog title="用户信息"
               :visible.sync="dialogFormVisible"
               :center.sync="centerDialogVisible"
    ><el-form :model="form" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
        <el-form-item label="用户Id: ">
          <el-input v-model="form.userId" :disabled="true" style="width: 100%;"></el-input>
        </el-form-item>

        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
        <el-form-item label="用户名: ">
          <el-input v-model="form.userName" style="width: 100%;"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
        <el-form-item label="邮箱: ">
          <el-input v-model="form.userEmail" style="width: 100%;"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
        <el-form-item label="密码: ">
          <el-input v-model="form.userPassword" style="width: 100%;"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
        <el-form-item label="性别: ">
          <el-select v-model="form.userGender" style="width: 90%;">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
        <el-form-item label="职位: ">
          <el-input v-model="form.userPosition" :disabled="true" style="width: 100%;"></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16" :offset="4">
        <el-form-item >
          <el-button type="primary" @click="handleModify">修改</el-button>
          <el-button @click="dialogFormVisible = false">退出</el-button>
        </el-form-item>
        </el-col>
      </el-row>
      </el-form>
    </el-dialog>
  </div>
</div>
</template>

<script>

export default {
  name:'Main',
  components: {},
  data() {
      return {
        dialogFormVisible:false,
        centerDialogVisible:true,
        form:{
          userId:'',
          userName:'',
          userEmail:'',
          userPassword:'',
          userGender:'',
          userPosition:'',
        }

      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      signOut(){
        this.$confirm("是否退出登录",{
          confirmButtonText:"确认",
          cancelButtonText:"取消",
          type:"warning"
        }).then(()=>{
          this.$router.push('/begin')
          this.$store.commit({
            type:"clear",
          })
        })
      },
      userInfo(){
        this.dialogFormVisible=true
        this.axios.post("/user/getUserByInfo",this.$qs.stringify({
          userId:this.$store.state.userId
        })).then((response)=>{
          console.log(response.data);
          this.form.userId=response.data[0]["userId"];
          this.form.userName=response.data[0]["userName"];
          this.form.userEmail=response.data[0]["userEmail"];
          this.form.userPassword=response.data[0]["userPassword"];
          this.form.userGender=response.data[0]["userGender"];
          this.form.userPosition=response.data[0]["position"]["postName"];
        }).catch((error)=>{
          console.log(error)
        })
      },
      handleModify(){
        this.$confirm("是否确认修改",{
          confirmButtonText:"确认",
          cancelButtonText:"取消",
          type:"warning"
        }).then(()=>{
          this.axios.post("/user/updateUserInfo",this.$qs.stringify({
            userId:this.form.userId,
            userName:this.form.userName,
            userEmail:this.form.userEmail,
            userGender:this.form.userGender,
            userPassword:this.form.userPassword,
          })).then((response)=>{
            console.log(response.data)
            this.$store.commit({
              type:'edit',
              userName:this.form.userName,
            })
            this.$message({
              type:"success",
              message:"修改成功"
            })
          }).catch((error)=>{
            console.log(error)
          })
        })
      }
    },
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
  /*left: 210px;*/
  background-color: #24262F;
}

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  /*top: 60px;*/
  top: 60px;
  bottom: 0;
}


.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  /*overflow-y: scroll;*/
}

.el-icon-arrow-down {
  font-size: 12px;
}
/*.demonstration {*/
/*  display: block;*/
/*  color: #8492a6;*/
/*  font-size: 14px;*/
/*  margin-bottom: 20px;*/
/*}*/

</style>