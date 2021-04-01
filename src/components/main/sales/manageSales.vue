<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="订单编号: " prop="Id">
            <el-input type="text" v-model="ruleForm.Id" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="订单提交时间: " prop="startTimeFrom">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTimeFrom" style="width: 200px;"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="至: " prop="startTimeTo">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.startTimeTo" style="width: 200px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="供应商" prop="supplier" >
            <el-input type="text" v-model="ruleForm.supplier" autocomplete="off" style="width: 200px;"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="订单完成时间: " prop="endTimeFrom">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTimeFrom" style="width: 200px;"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="至: " prop="endTimeTo">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.endTimeTo" style="width: 200px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="订单状态" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择" style="width: 200px">
              <el-option label="已提交" value="已提交"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="已取消" value="已取消"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="订单取消时间: " prop="returnTimeFrom">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.returnTimeFrom" style="width: 200px;"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="至: " prop="returnTimeTo">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.returnTimeTo" style="width: 200px;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12" :offset="8">
          <el-form-item >
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr/>
  </div>
</template>

<script>
export default {
  name: "manageSales",
  data() {
    return {
      ruleForm: {
        Id: '',
        supplier: '',
        state:'',
        startTimeFrom:'',
        startTimeTo:'',
        endTimeFrom:'',
        endTimeTo:'',
        returnTimeFrom:'',
        returnTimeTo:'',
      },
      rules: {
        Id: [
          { trigger: 'blur' }
        ],
        supplier: [
          {trigger: 'blur' }
        ],
        state: [
          {trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>