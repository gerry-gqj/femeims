<template>
  <div>
    <div style="position: relative">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="用户ID: " prop="userID">
              <el-input type="text" v-model="ruleForm.userID" style="width: 200px" clearable="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="用户名: " prop="userName">
              <el-input type="text" v-model="ruleForm.userName"  style="width: 200px" clearable="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="用户邮箱: " prop="userEmail">
              <el-input type="text" v-model="ruleForm.userEmail"  style="width: 200px" clearable="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <el-form-item label="性别: " prop="userGender">
              <el-select v-model="ruleForm.userGender" placeholder="请选择" style="width: 200px" clearable="true">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>

              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="状态: " prop="status">
              <el-select v-model="ruleForm.status" placeholder="请选择" style="width: 200px" clearable="true">
                <el-option label="已激活" value="已激活"></el-option>
                <el-option label="未激活" value="未激活"></el-option>
                <el-option label="已注销" value="已注销"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="职位: " prop="position">
              <el-select v-model="ruleForm.position" placeholder="请选择" style="width: 200px" clearable="true">
                <el-option label="系统管理员" value="1"></el-option>
                <el-option label="经理" value="2"></el-option>
                <el-option label="员工" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12" :offset="8">
            <el-form-item >
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <hr/>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%" max-height="auto">

        <el-table-column prop="userId" label="用户ID" width="150"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="150"></el-table-column>
        <el-table-column prop="userEmail" label="用户邮箱" width="250"></el-table-column>
        <el-table-column prop="userGender" label="性别" width="150"></el-table-column>
        <el-table-column prop="position.postName" label="职位" width="150"></el-table-column>
        <el-table-column prop="userStatus" label="状态" width="150"></el-table-column>

        <el-table-column label="选项" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="activeAccount(scope.row)" type="primary" plain v-if="scope.row.userStatus==='未激活'||scope.row.userStatus==='已注销'">激活</el-button>
            <el-button size="mini" @click="logoutAccount(scope.row)" type="danger" plain v-if="scope.row.userStatus==='已激活'&&scope.row.position.postName!=='系统管理员'">注销</el-button>
            <el-button size="mini" @click="activeManager(scope.row)" type="danger" plain v-if="scope.row.position.postName==='经理'">员工</el-button>
            <el-button size="mini" @click="activeEmployee(scope.row)" type="danger" plain v-if="scope.row.position.postName==='员工'">经理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "account",
  data() {

    /**
     * 回调
     * */
    return {

      /**
       * 表单绑定数据
       * */
      ruleForm: {
        userID: '',
        userName: '',
        userEmail:'',

        userGender:'',
        status:'',
        position:'',
      },

      /**
       * 表格绑定数据
       * */
      tableData: [],
      rules: {
      },
    };
  },
  methods: {

    /**
     * 表单提交事件
     * */

    submitForm() {
      this.axios
          .post("/user/getUserByInfo/",
          this.$qs.stringify({
            userEmail:this.ruleForm.userEmail,
            userGender:this.ruleForm.userGender,
            userName:this.ruleForm.userName,
            userStatus:this.ruleForm.status,
            userId:this.ruleForm.userID,
            positionId:this.ruleForm.position,
          })
      ).then((response=>{
        console.log(response)
        this.tableData=response.data
      })).then(()=>{
        this.reload
      }).catch((error)=>{
        console.log(error)
      })
    },

    /**
     * 清除表单的所有内容事件
     * */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 用户激活事件
     * */
    activeAccount(row) {
      console.log(row.userId,row.userName);
      this.$confirm("是否激活用户"+row.userName,"提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"success",
      }).then(()=>{
        this.axios
            .post("/user/updateUserInfo/",
            this.$qs.stringify({
              userStatus:"已激活",
              userId:row.userId
            })
        ).then(()=>{
          this.reload
        })
      })
    },

    /**
     * 用户注销事件
     * */
    logoutAccount(row) {
      console.log(row.userId,row.userName);
      this.$confirm("是否注销用户:"+row.userName,"提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning",
      }).then(()=>{
        this.axios
            .post("/user/updateUserInfo/",
            this.$qs.stringify({
              userStatus:"已注销",
              userId:row.userId
            })
        ).then(()=>{
          this.reload
        }).catch((error)=>{
          console.log(error)
        })
      })
    },

    /**
     * 将用户的经理职位修改为员工
     * */
    activeManager(row){
      console.log(row.userId,row.userName,row.position.postName);
      this.$confirm("是否修改用户:"+row.userName+"为员工","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.axios
            .post("/user/updateUserInfo/",
            this.$qs.stringify({
              userId:row.userId,
              positionId:3,
            })
        )
      }).then(()=>{
        this.reload
      }).catch((error)=>{
        console.log(error)
      })
    },

    /**
     * 将用户的员工职位修改为经理
     * */
    activeEmployee(row){
      console.log(row.userId,row.userName,row.position.postName);
      this.$confirm("是否修改用户:"+row.userName+"为经理","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.axios
            .post("/user/updateUser/",
            this.$qs.stringify({
              userId:row.userId,
              positionId:2,
            }))
      }).then(()=>{
        this.reload()
      }).catch((error)=>{
        console.log(error)
      })

      /**
       * 重新调用方法刷新表格数据
       * */
      // this.getUserInfo()
    },

    /**
     * 获取所有获取所有用户信息
     * */

    getUserInfo(){
      this.axios
          .get("/user/allUser")
          .then((response)=>{
            console.log(response)
            this.tableData=response.data
          })
    }
  },
  mounted() {

    /**
     * 调用getUserInfo方法在路由跳转后进行数据渲染
     * */
    this.getUserInfo()
  },
}
</script>

<style scoped>

</style>