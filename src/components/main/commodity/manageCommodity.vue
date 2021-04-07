<template>
  <div>
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="7" :offset="1">
            <el-form-item label="电机类型: " prop="stockType">
              <el-input type="text"
                        v-model="ruleForm.stockType"
                        autocomplete="on"
                        :clearable="true"
                        maxlength="30"
                        show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="电机型号: " prop="stockModel">
              <el-input type="text"
                        v-model="ruleForm.stockModel"
                        autocomplete="on"
                        :clearable="true"
                        maxlength="30"
                        show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="供应商: " prop="supplier" >
              <el-input type="text"
                        v-model="ruleForm.supplier"
                        autocomplete="on"
                        :clearable="true"
                        maxlength="30"
                        show-word-limit
              ></el-input>
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
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-table :data="tableData"
                    border style="width: 100%" max-height="auto"
                    :header-cell-style="{background:'#726666',color:'#3e3333'}">
            <el-table-column prop="stockId" label="库存编号" fixed="left"></el-table-column>
            <el-table-column prop="stockSupplier" label="供应商" ></el-table-column>
            <el-table-column prop="stockMotorType" label="类型" ></el-table-column>
            <el-table-column prop="stockMotorModel" label="型号" ></el-table-column>
            <el-table-column prop="stockMotorPriceOut" label="销售价格(元)" ></el-table-column>
            <el-table-column prop="stockMotorQuantity" label="数量(个)" ></el-table-column>
            <el-table-column prop="stockStatus" label="状态" ></el-table-column>
            <el-table-column label="选项" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="handleCreateSales(scope.row)"
                           type="primary"
                           plain>创建销售订单
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-dialog title="销售订单"
                 :visible.sync="dialogFormVisible"
                 :center.sync="centerDialogVisible"
                 top="15px"
                 :before-close="handleClose">
        <el-form :model="salesForm"
                 :rules="salesFormRules"
                 label-width="90px"
                 ref="salesForm"
                 style="align-self: center;">
          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="订单号: " prop="salesId">
                <el-input v-model="salesForm.salesId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="客户: " prop="client">
                <el-input v-model="salesForm.client" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="电机供应商: " prop="supplier">
                <el-input v-model="salesForm.supplier" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="电机类型: " prop="type">
                <el-input v-model="salesForm.type" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="电机型号: " prop="model">
                <el-input v-model="salesForm.model" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="价格: " prop="price">
                <el-input v-model="salesForm.price" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="数量: " prop="quantity">
                <el-input v-model="salesForm.quantity" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="总价: " prop="total">
                <el-input v-model="salesForm.total" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <el-form-item label="操作员: " prop="operator">
                <el-input v-model="salesForm.operator" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="6">
              <el-form-item >
                <el-button type="primary" @click="handleSubmitSales('salesForm')">确认</el-button>
                <el-button @click="dialogFormVisible = false">关闭</el-button>
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
  name: "manageCommodity",
  data() {
    const quantityVal = async(rule, value, callback) => {
      const boolean = new RegExp('^[1-9][0-9]*$').test(value);
      console.log(boolean);
      if (!boolean) {
        callback("请输入数量(正整数)");
      }
    };
    return {
      dialogFormVisible:false,
      centerDialogVisible:true,
      stockId:'',
      ruleForm: {
        stockType: '',
        stockModel:'',
        supplier:'',
        status:'已上架',
      },
      salesForm:{
        salesId: '',
        client: '',
        supplier:'',
        type:'',
        model:'',
        price:'',
        quantity:'',
        total:'',
        operator:''
      },
      tableData:[],
      rules: {
      },
      salesFormRules:{
        client: [
          { required: true, message: '请输入客户', trigger: 'blur' },
          { min: 1, message: '不能为空', trigger: 'blur' }
        ],quantity: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          {validator:quantityVal,trigger: 'blur'}
        ],total: [
          { required: true, message: '订单总价', trigger: 'blur' },
          { type: 'number', message: '请检查价格和数量是否合法'}
        ],
      }
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {});
    },
    submitForm() {
      console.log(this.ruleForm)
      this.axios.post("/stock/getStockByInfo/",
          this.$qs.stringify({
            stockId:this.ruleForm.stockId,
            stockSupplier:this.ruleForm.supplier,
            stockStatus:this.ruleForm.status,
            stockMotorType:this.ruleForm.stockType,
            stockMotorModel:this.ruleForm.stockModel,
          })).then((response)=>{
        console.log(response.data)
        this.tableData=response.data
      }).catch((error)=>{
        this.$message({
          type:"error",
          message:'查询失败'
        })
        console.log(error)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleCreateSales(row) {
      console.log(row);
      this.dialogFormVisible=true;
      this.axios.post('/sales/createSalesId/',
          this.$qs.stringify({
            creatorId:this.$store.state.userId,
          })).then((response)=>{
            console.log(response)
            console.log(response.data)
            this.salesForm.salesId=response.data["salesId"];
            this.salesForm.supplier=row.stockSupplier;
            this.salesForm.type=row.stockMotorType;
            this.salesForm.model=row.stockMotorModel;
            this.salesForm.price=parseFloat(row.stockMotorPriceOut).toFixed(2);
            this.salesForm.operator=this.$store.state.userName;
            this.stockId=row.stockId;
          }).catch((error)=>{
            console.log(error)
          })
    },


    /**
     *创建销售订单
     * */
    handleSubmitSales(formName){
      console.log(formName)
      this.$refs[formName].validate((valid)=>{
        if (valid){
          this.$confirm("是否确认提交订单",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            type:"warning"
          }).then(()=>{
            this.axios.post("/sales/addSales",
                this.$qs.stringify({
                  stockId:this.stockId,
                  salesId:this.salesForm.salesId,
                  salesClient:this.salesForm.client,
                  salesMotorSupplier:this.salesForm.supplier,
                  salesOperatorSubmit:this.$store.state.userName,
                  salesMotorType:this.salesForm.type,
                  salesMotorModel:this.salesForm.model,
                  salesMotorPrice:this.salesForm.price,
                  salesMotorQuality:this.salesForm.quantity,
                })).then((response)=>{
              console.log(response.data)
              this.salesForm.client='';
              this.salesForm.quantity='';
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
                  message:'订单提交失败,订单已存在!!'
                });
              }else if(_status==='NotAdequate'){
                this.$message({
                  type:'error',
                  message:'订单提交失败,库存不足!'
                });
              }
              this.dialogFormVisible=false
              this.submitForm();
            })
          })
        }else {
          this.$message({
            type:"error",
            message:"订单提交失败"
          })
        }
      })
    },

    /**
     * 获取所有的库存
     * */
    getStock(){
      this.axios.post('/stock/getStockByInfo',
          this.$qs.stringify({
            stockStatus:'已上架',
          })).then((response)=>{
            console.log(response)
            console.log(response.data)
            this.tableData=response.data;
          }).catch((error)=>{
            console.log(error)
          })
    },
  },
  mounted() {
    this.getStock()
  },
  watch:{
      'salesForm.quantity': function () {
        this.salesForm.total = this.salesForm.price* this.salesForm.quantity;
      },
      'salesForm.price': function () {
        this.salesForm.total = this.salesForm.price* this.salesForm.quantity;
      },
  }
}
</script>

<style scoped>

</style>