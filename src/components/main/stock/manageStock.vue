<template>
  <div>
    <div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="7" :offset="1">
            <el-form-item label="库存编号: " prop="stockId">
              <el-input type="text"
                        v-model="ruleForm.stockId"
                        style="width: 100%"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="电机类型: " prop="stockType">
              <el-input type="text"
                        v-model="ruleForm.stockType"
                        style="width: 100%"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="电机型号: " prop="stockModel">
              <el-input type="text"
                        v-model="ruleForm.stockModel"
                        style="width: 100%"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="7" :offset="1">
            <el-form-item label="供应商: " prop="supplier" >
              <el-input type="text"
                        v-model="ruleForm.supplier"
                        style="width: 100%;"
                        autocomplete="on"
                        :clearable="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="库存状态: " prop="status">
              <el-select v-model="ruleForm.status"
                         placeholder="请选择"
                         style="width: 100%"
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
      <el-row :gutter="0">
        <el-col :span="24" :offset="0">
          <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    border
                    show-summary
                    :summary-method="getSummaries"
                    style="width: 100%" max-height="auto"
                    :header-cell-style="{background:'#726666',color:'#3e3333'}">
            <el-table-column prop="stockId" label="库存编号"></el-table-column>
            <el-table-column prop="stockSupplier" label="供应商"></el-table-column>
            <el-table-column prop="stockMotorType" label="类型"></el-table-column>
            <el-table-column prop="stockMotorModel" label="型号"></el-table-column>
            <el-table-column prop="stockMotorPriceIn" label="库存价值"></el-table-column>
            <el-table-column prop="stockMotorAvgPrice" label="均单价"></el-table-column>
            <el-table-column prop="stockMotorPriceOut" label="销售价格"></el-table-column>
            <el-table-column prop="stockMotorQuantity" label="数量"></el-table-column>
            <el-table-column prop="stockUpTime" label="上架时间"></el-table-column>
            <el-table-column prop="stockDownTime" label="下架时间"></el-table-column>
            <el-table-column prop="stockStatus" label="状态"></el-table-column>
            <el-table-column label="选项" width="100" fixed="right">
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

          <!--分页程序-->
          <el-pagination align='center'
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[1,5,10,20]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="tableData.length">
          </el-pagination>

        </el-col>
      </el-row>
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

      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 3, // 每页的数据条数

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

    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '汇总';
          return;
        }if (index ===5){
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' (元)';
          } else {
            sums[index] = 'N/A';
          }
        }if (index===7){
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += '(个)';
          } else {
            sums[index] = 'N/A';
          }
        }
      });
      return sums;
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
      this.confirmForm.operator=this.$store.state.user.userName;
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
                  stockOperatorUp:this.$store.state.user.userName,
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
          stockOperatorDown:this.$store.state.user.userName,
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
    this.currentPage=1;
    this.pageSize=5;
  },
  // created() {
  //   this.getStock()
  // }
}
</script>

<style scoped>

</style>