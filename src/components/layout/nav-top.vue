<template>
  <div>
  <header class="header">
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu"
                 style="margin-right: 30px;" @click="collapseMenu"></el-button>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/" style="cursor: pointer">
        <el-breadcrumb-item :to="{ path: '/main/home' }" style="cursor: pointer">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current" style="cursor: pointer">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
<!--    <el-input v-model="currentTime"></el-input>-->
    <div style="text-align: center">{{ $store.state.time.currentDate }}</div>

    <div class="r-content">
      <el-dropdown trigger="click" @command="setDialogInfo">
        <span class="el-dropdown-link">
          {{$store.state.user.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>

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
            <el-select v-model="form.userGender" style="width: 100%;">
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
import { mapState } from 'vuex'
export default {
  name: "nav-top",
  data() {
    return {
      timer: '',
      nowTime:'',
      currentTime:new Date(),
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
  computed:{
    ...mapState({
      current:state=>state.tab.currentMenu
    })
  },
  methods:{
    // getTime(){
    //   let date = new Date();
    //   let year = date.getFullYear();
    //   let month = date.getMonth() + 1;
    //   let day = date.getDate();
    //   let hour= date.getHours();
    //   let minute = date.getMinutes();
    //   let second = date.getSeconds();
    //   console.log(year+month+day+hour+minute+second);
    //   this.nowTime=year+month+day+hour+minute+second;
    //   this.nowTime='asd'
    //   // const str = ''
    //   // if(this.hour>12) {
    //   //   this.hour -= 12;
    //   //   this.str = " AM";
    //   // }else{
    //   //   this.str = " PM";
    //   // }
    //   // this.month=check(month);
    //   // this.day=check(day);
    //   // this.hour=check(hour);
    //   // this.minute=check(minute);
    //   // this.second=check(second);
    //   // function check(i){
    //   //   const num = (i<10)?("0"+i) : i;
    //   //   return num;
    //   // }
    //   // this.nowDate = year + "年" + this.month + "月" + this.day+"日";
    //   this.nowTime =hour + ":" +minute + ":" +second;
    // },
    // destroyTimer(){
    //   this.timer && clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    // },
    //控制左侧菜单是否折叠
    collapseMenu() {
      this.$store.commit('collapseMenu')
    },
    // 下拉框选择，点击个人信息后调整到对应的函数执行
    setDialogInfo(comItem) {
      switch (comItem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    //展示个人信息
    showInfoList() {
      this.dialogFormVisible=true
      this.axios.post("/user/getUserByInfo",this.$qs.stringify({
        userId:this.$store.state.user.userId
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
    logout() {
      this.$confirm("确定退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit({
          type:"clear",
        })
        this.$router.push('/begin')
      }).then(()=>{
        this.$message.success("退出成功")
      }).catch((error) => {
            console.log(error);
      });
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
    },
    // create(){
    //   this.timer=setInterval((this.getTime, 1000));
    // },
    // beforeDestroy(){
    //   this.destroyTimer();
    // }

    // mounted(){
    //   this.$store.commit({
    //     type:'refreshTime',
    //     currentTime:'',
    //   })
    // }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content{
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.el-dropdown{
  color: #fff;
}
.el-breadcrumb  /deep/  .el-breadcrumb__inner {
  color: #fff !important;
}
.el-breadcrumb__inner a{
  color: #fff !important;
}
</style>