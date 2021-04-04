<template>
  <div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 35px">
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="客户: " prop="client" >
              <el-input v-model="ruleForm.client"
                        style="width: 300px"
                        maxlength="30"
                        show-word-limit
                        :clearable="true"></el-input>
            </el-form-item>

            <el-form-item label="电机类型: " prop="type">
              <el-input v-model="ruleForm.type" style="width: 300px"
                        maxlength="30"
                        show-word-limit
                        :clearable="true"></el-input>
            </el-form-item>

            <el-form-item label="电机型号: " prop="model">
              <el-input v-model="ruleForm.model" style="width: 300px"
                        maxlength="30"
                        show-word-limit
                        :clearable="true"></el-input>
            </el-form-item>

            <el-form-item label="价格: " prop="price">
              <el-input v-model="ruleForm.price" style="width: 300px"
                        maxlength="10"
                        show-word-limit
                        :clearable="true"></el-input>
            </el-form-item>

            <el-form-item label="数量: " prop="quantity">
              <el-input v-model.number="ruleForm.quantity" style="width: 300px"
                        maxlength="10"
                        show-word-limit
                        :clearable="true"></el-input>
            </el-form-item>

            <el-form-item label="总价: " prop="total">
              <el-input v-model.number="ruleForm.total"  style="width: 300px"
                        :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="操作员: " prop="operator">
              <el-input v-model="ruleForm.operator"
                        style="width: 300px"
                        :disabled="true"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :center.sync="centerDialogVisible" width="40%">
        <el-form :model="confirmForm"  label-width="100px" style="width: 450px;text-align: center;padding-left: 60px">
          <el-form-item label="订单号: ">
            <el-input v-model="confirmForm.salesId" :disabled="true" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="客户: ">
            <el-input v-model="confirmForm.client" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="电机类型: ">
            <el-input v-model="confirmForm.type" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="电机型号: ">
            <el-input v-model="confirmForm.model" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="价格: ">
            <el-input v-model="confirmForm.price" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="数量: ">
            <el-input v-model="confirmForm.quantity" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="总价: ">
            <el-input v-model="confirmForm.total" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="操作员: ">
            <el-input v-model="confirmForm.operator" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="handleConfirm">确认</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: "createSales",
  data() {
    const quantityVal = async(rule, value, callback) => {
      const boolean = new RegExp('^[1-9][0-9]*$').test(value);
      console.log(boolean);
      if (!boolean) {
        // this.$message.warning('无效数量');
        // this.ruleForm.quantity='';
        callback("请输入数量(正整数)");
      }
    };
    // eslint-disable-next-line no-unused-vars
    const PriceVal = async(rule, value, callback) => {
      const boolean = new RegExp('^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$').test(value)
      console.log(boolean)
      if (!boolean) {
        // this.$message.warning('无效价格')
        // this.ruleForm.price=''
        callback("请输入数量(有效数字: 小数点后两位)");
      }
    }

    return {
      dialogFormVisible:false,
      centerDialogVisible:true,
      ruleForm: {
        client:'',
        type:'',
        model:'',
        price:'',
        quantity:'',
        total:'',
        operator:this.$store.state.userName,
      },
      confirmForm:{
        salesId:'',
        client:'',
        type:'',
        model:'',
        price:'',
        quantity:'',
        total:'',
        operator:this.$store.state.userName,
      },
      rules: {
        client: [
          { required: true, message: '请输入供应商', trigger: 'blur' },
          { max: 30, message: '已到最大输入限制', trigger: 'blur' }
        ],type: [
          { required: true, message: '请输入电机类型', trigger: 'blur' },
          { max: 30, message: '超过字符限制(30)', trigger: 'blur' }
        ],model: [
          { required: true, message: '请输入电机型号', trigger: 'blur' },
          { max: 30, message: '超过字符限制(30)', trigger: 'blur' }
        ],price: [
          { required: true, message: '请输入单价', trigger: 'blur' },
          {validator:PriceVal,trigger: 'blur'},
        ],quantity: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          {validator:quantityVal,trigger: 'blur'}
        ],total: [
          { required: true, message: '订单总价', trigger: 'blur' },
          { type: 'number', message: '请检查价格和数量是否合法'}
        ],operator: [
          { required: true, message: '操作员', trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    /*订单提交*/
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/sales/createSalesId",
              this.$qs.stringify({
                creatorId:this.$store.state.userId
              })).then((response)=>{
            console.log(response.data);
            this.dialogFormVisible=true;
            this.confirmForm.salesId=response.data["salesId"];
            this.confirmForm.model=this.ruleForm.model;
            this.confirmForm.type=this.ruleForm.type;
            this.confirmForm.operator=this.$store.state.userName;
            this.confirmForm.price=this.ruleForm.price;
            this.confirmForm.quantity=this.ruleForm.quantity;
            this.confirmForm.client=this.ruleForm.client;
            this.confirmForm.total=this.ruleForm.total;
          }).catch((error)=>{
            console.log(error)
          })
        } else {
          this.$message({
            type:"error",
            message:"请确认订单信息是否正确！"
          })
        }
      });
    },


    handleConfirm(){
      this.$confirm("是否确认提交订单",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.axios.post("/sales/addSales",
            this.$qs.stringify({
              salesId:this.confirmForm.salesId,
              salesClient:this.confirmForm.client,
              salesOperatorSubmit:this.$store.state.userName,
              salesMotorType:this.confirmForm.type,
              salesMotorModel:this.confirmForm.model,
              salesMotorPrice:this.confirmForm.price,
              salesMotorQuality:this.confirmForm.quantity,
            })).then((response)=>{
          console.log(response.data)
          let _status = response.data['status'];
          if(_status==='ok'){
            this.$message({
              type:'success',
              message:'订单提交成功'
            });
            this.dialogFormVisible=false
          }else if (_status==='isExist'){
            this.$message({
              type:'error',
              message:'订单提交失败'
            });
            this.dialogFormVisible=false
          }
        })
      })
    },

    /*清空表单*/
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  watch: {
    'ruleForm.quantity': function () {
      this.ruleForm.total = this.ruleForm.price* this.ruleForm.quantity;
    },
    'ruleForm.price': function () {
      this.ruleForm.total = this.ruleForm.price* this.ruleForm.quantity;
    },
  },

}
</script>

<style scoped>

</style>