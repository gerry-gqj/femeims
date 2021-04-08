<template>
  <div>
    <div style="position: relative">
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-row :gutter="0">
          <el-col :span="8" :offset="1">
            <el-form-item label="订单编号: " prop="salesId">
              <el-input type="text"
                        v-model="ruleForm.salesId"
                        autocomplete="on"
                        :clearable="true"
                        style="width: 80%"
                        placeholder="请输入"
                        maxlength="30"
                        show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="订单提交时间: " prop="startTimeFrom">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="ruleForm.startTimeFrom"
                              autocomplete="on"
                              style="width: 100%;"
                              :clearable="true"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label=">  ==>   至  ==>  " prop="startTimeTo">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="ruleForm.startTimeTo"
                              :clearable="true"
                              value-format="yyyy-MM-dd"
                              style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="0">
          <el-col :span="8" :offset="1">
            <el-form-item label="客户: " prop="client" >
              <el-input type="text"
                        v-model="ruleForm.client"
                        :clearable="true"
                        style="width: 80%;"
                        placeholder="请输入"
                        maxlength="30"
                        show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="订单完成时间: " prop="endTimeFrom">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="ruleForm.endTimeFrom"
                              style="width: 100%;"
                              :clearable="true"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label=">  ==>   至  ==>  " prop="endTimeTo">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="ruleForm.endTimeTo"
                              style="width: 100%;"
                              :clearable="true"
                              value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="0">
          <el-col :span="8" :offset="1">
            <el-form-item label="订单状态: " prop="status">
              <el-select v-model="ruleForm.status"
                         placeholder="请选择"
                         style="width: 80%"
                         :clearable="true">
                <el-option label="已提交" value="已提交"></el-option>
                <el-option label="已完成" value="已完成"></el-option>
                <el-option label="已取消" value="已取消"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="订单取消时间: "
                          prop="returnTimeFrom">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="ruleForm.returnTimeFrom"
                              style="width: 100%;"
                              :clearable="true"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label=">  ==>   至  ==>  " prop="returnTimeTo">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="ruleForm.returnTimeTo"
                              style="width: 100%"
                              :clearable="true"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="0">
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
            <el-table-column prop="salesId" label="编号"/>
            <el-table-column prop="salesClient" label="客户"/>
            <el-table-column prop="salesMotorSupplier" label="供应商"/>
            <el-table-column prop="salesMotorType" label="类型"/>
            <el-table-column prop="salesMotorModel" label="型号"/>
            <el-table-column prop="salesMotorPrice" label="单价"/>
            <el-table-column prop="salesMotorQuality" label="数量"/>
            <el-table-column prop="salesStartTime" label="开始时间"/>
            <el-table-column prop="salesEndTime" label="完成时间"/>
            <el-table-column prop="salesReturnTime" label="取消时间"/>
            <el-table-column prop="salesTotalPrice" label="总额"/>
            <el-table-column prop="salesStatus" label="状态"/>

            <el-table-column label="选项" width="155" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="handleSure(scope.row)"
                           type="primary"
                           plain
                           v-if="scope.row.salesStatus==='已提交'">确认
                </el-button>
                <el-button size="mini"
                           @click="handleCancel(scope.row)"
                           type="danger"
                           plain
                           v-if="scope.row.salesStatus!=='已取消'">取消
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "countSales",
  data() {
    return {
      currentPage:'',
      pageSize:'',
      total:'',
      ruleForm: {

        salesId: '',
        client: '',
        status:'',

        startTimeFrom:'',
        startTimeTo:'',
        time:'',

        endTimeFrom:'',
        endTimeTo:'',

        returnTimeFrom:'',
        returnTimeTo:'',
      },
      tableData: [],
      rules: {
      },
    };
  },
  methods: {

    /**
     * 提交查询表单
     * */
    submitForm() {
      console.log(this.ruleForm)
      this.axios.post("/sales/getSalesByInfo/",
          this.$qs.stringify({
            salesId:this.ruleForm.salesId,
            salesClient:this.ruleForm.client,
            salesStatus:this.ruleForm.status,

            salesStartTimeFrom:this.ruleForm.startTimeFrom,
            salesStartTimeTo:this.ruleForm.startTimeTo,

            salesEndTimeFrom:this.ruleForm.endTimeFrom,
            salesEndTimeTo:this.ruleForm.endTimeTo,

            salesReturnTimeFrom:this.ruleForm.returnTimeFrom,
            salesReturnTimeTo:this.ruleForm.returnTimeTo,
          })).then((response)=>{
        console.log(response.data)
        this.tableData=response.data
        console.log(this.ruleForm.startTimeFrom)
      }).catch((error)=>{
        console.log(error)
      })
    },

    /**
     * 清空表单
     * */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     *订单完成
     * */
    handleSure(row) {
      console.log(row);
      this.$confirm("是否确认订单:","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.axios.post("/sales/updateSales/",
            this.$qs.stringify({
              salesId:row.salesId,
              salesStatus:'已完成',
              salesOperatorConfirm:this.$store.state.userName,
            })).then((response)=>{
          console.log(response.data)
          this.submitForm()
          this.$message({
            type:"success",
            message:'确认成功'
          })
        }).catch((error)=>{
          console.log(error)
        })
      })
    },

    /**
     * 订单取消
     * */
    handleCancel(row) {
      console.log(row);
      this.$confirm("是否取消订单",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        this.axios.post("/sales/updateSales/",this.$qs.stringify({
          salesId:row.salesId,
          salesStatus:'已取消',
          salesOperatorCancel:this.$store.state.userName,
          salesMotorQuality:row.salesMotorQuality,
          salesTotalPrice:row.salesTotalPrice,
          supplier:row.salesMotorSupplier,
          type:row.salesMotorType,
          model:row.salesMotorModel
        })).then((response)=>{
          console.log(response.data)
          this.submitForm()
          this.$message({
            type:"success",
            message:'取消成功'
          })
        }).catch((error)=>{
          console.log(error)
        })
      })
    },

    /**
     * 获取所有的表单
     * */
    getSales(){
      this.axios.get('/sales/allSales')
          .then((response)=> {
            console.log(response.data)
            this.tableData=response.data;
          })
          .catch((error)=>{
            console.log(error);
          })
    }
  },
  // activated(){
  //   this.getSales()
  // },
  mounted() {
    this.getSales()
  }
}
</script>

<style scoped>

</style>