<template>
  <div>
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="库存编号: " prop="stockId">
              <el-input type="text"
                        v-model="ruleForm.stockId"
                        style="width: 200px"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电机类型: " prop="stockType">
              <el-input type="text"
                        v-model="ruleForm.stockType"
                        style="width: 200px"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电机型号: " prop="stockModel">
              <el-input type="text"
                        v-model="ruleForm.stockModel"
                        style="width: 200px"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="供应商: " prop="supplier" >
              <el-input type="text"
                        v-model="ruleForm.supplier"
                        style="width: 200px;"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存状态: " prop="status">
              <el-select v-model="ruleForm.status"
                         placeholder="请选择"
                         style="width: 200px"
                         autocomplete="on"
                         :clearable="true">
                <el-option label="已入库" value="已入库"></el-option>
                <el-option label="已上架" value="已上架"></el-option>
                <el-option label="已下架" value="已下架"></el-option>
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
      <el-table :data="tableData"
                border style="width: 100%" max-height="auto"
                :header-cell-style="{background:'#24262F',color:'#409eff'}">
        <el-table-column prop="stockId" label="库存编号" width="150"></el-table-column>
        <el-table-column prop="stockSupplier" label="供应商" width="100"></el-table-column>
        <el-table-column prop="stockMotorType" label="类型" width="80"></el-table-column>
        <el-table-column prop="stockMotorModel" label="型号" width="150"></el-table-column>
        <el-table-column prop="stockMotorPriceIn" label="库存价值" width="100"></el-table-column>
        <el-table-column prop="stockMotorAvgPrice" label="均单价" width="80"></el-table-column>
        <el-table-column prop="stockMotorPriceOut" label="销售价格" width="80"></el-table-column>
        <el-table-column prop="stockMotorQuantity" label="数量" width="60"></el-table-column>
        <el-table-column prop="stockUpTime" label="上架时间" width="100"></el-table-column>
        <el-table-column prop="stockDownTime" label="下架时间" width="100"></el-table-column>
        <el-table-column prop="stockStatus" label="状态" width="80"></el-table-column>
        <el-table-column label="选项" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleUp(scope.row)"
                       type="primary"
                       plain
                       v-if="scope.row.stockStatus!=='已上架'">上架
            </el-button>
            <el-button size="mini"
                       @click="handleDown(scope.row)"
                       type="danger"
                       plain
                       v-if="scope.row.stockStatus==='已上架'">下架
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-dialog title="上架信息" :visible.sync="dialogFormVisible" :center.sync="centerDialogVisible" width="40%">
        <el-form :model="confirmForm" :rules="rulesConfirm" ref="confirmForm" status-icon label-width="80px"
                 style="width: 450px;text-align: center;padding-left: 60px">
          <el-form-item label="订单号: " prop="stockId">
            <el-input v-model="confirmForm.stockId" :disabled="true" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item label="电机类型: " prop="stockType">
            <el-input v-model="confirmForm.stockType" style="width: 250px;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="电机类型: " prop="stockModel">
            <el-input v-model="confirmForm.stockModel" style="width: 250px;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="供应商: " prop="supplier">
            <el-input v-model="confirmForm.supplier" style="width: 250px;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="价格: " prop="price">
            <el-input v-model="confirmForm.price" style="width: 250px;" :disabled="false"></el-input>
          </el-form-item>
          <el-form-item label="操作员: " prop="operator">
            <el-input v-model="confirmForm.operator" style="width: 250px;" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="handleUpConfirm('confirmForm')">确认</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: "manageStock",
  data() {
    const PriceVal = async(rule, value, callback) => {
      const boolean = new RegExp('^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$').test(value)
      console.log(boolean)
      if (!boolean) {
        callback("请输入价格(小数点后两位)");
      }
    }
    return {
      dialogFormVisible:false,
      centerDialogVisible:true,
      ruleForm: {
        stockId: '',
        stockType: '',
        stockModel:'',
        supplier:'',
        status:'',
      },
      confirmForm:{
        stockId: '',
        stockType: '',
        stockModel:'',
        price:'',
        supplier:'',
        operator:'',
      },
      tableData:[],
      rulesConfirm: {
        price: [
          { required: true, message: '请输入单价', trigger: 'blur' },
          {validator:PriceVal,trigger: 'blur'},
        ]
      },
      rules:{},
    };
  },
  methods: {
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
    /**
     *商品上架
     * */
    handleUp(row) {
      console.log(row);
      this.dialogFormVisible=true;
      this.confirmForm.stockId=row.stockId;
      this.confirmForm.stockType=row.stockMotorType;
      this.confirmForm.stockModel=row.stockMotorModel;
      this.confirmForm.price=parseFloat(row.stockMotorPriceOut).toFixed(2);
      this.confirmForm.supplier=row.stockSupplier;
      this.confirmForm.operator=this.$store.state.userName;
    },
    handleUpConfirm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid){
          this.$confirm("上架?确认:取消","提示",{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            type:"warning"
          }).then(()=>{
            this.axios.post("/stock/updateStock/",
                this.$qs.stringify({
                  stockId:this.confirmForm.stockId,
                  stockStatus:'已上架',
                  stockMotorPriceOut:this.confirmForm.price,
                  stockOperatorUp:this.$store.state.userName,
                })).then((response)=>{
              console.log(response.data)
              this.dialogFormVisible=false;
              this.submitForm();
              this.$message({
                type:"success",
                message:'商品已上架'
              })
            }).catch((error)=>{
              console.log(error)
            })
          })
        }else {
          this.$message({
            type:"error",
            message:'上架失败'
          })
        }
      });

    },

    /**
     * 商品下架
     * */
    handleDown(row) {
      console.log(row);
      this.$confirm("下架?确认:取消",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.axios.post("/stock/updateStock/",this.$qs.stringify({
          stockId:row.stockId,
          stockStatus:'已下架',
          stockOperatorDown:this.$store.state.userName,
        })).then((response)=>{
          console.log(response.data)
          this.submitForm()
          this.$message({
            type:"success",
            message:'商品已下架'
          })
        }).catch((error)=>{
          console.log(error)
        })
      })
    },
    /**
     * 获取所有的库存
     * */
    getStock(){
      this.axios.get('/stock/allStock')
          .then((response)=> {
            console.log(response.data)
            this.tableData=response.data;
          })
          .catch((error)=>{
            console.log(error);
          })
    },
  },
  mounted() {
    this.getStock()
  }
}
</script>

<style scoped>

</style>