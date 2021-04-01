<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 35px">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form-item label="客户" prop="client">
          <el-input v-model="ruleForm.client" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="电机类型" prop="type">
          <el-input v-model="ruleForm.type" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="电机型号" prop="model">
          <el-input v-model="ruleForm.model" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.price" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="quantity">
          <el-input v-model="ruleForm.quantity" style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item label="总价" prop="all">
          <el-input v-model="ruleForm.all" disabled style="width: 300px"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form></div>
</template>

<script>
export default {
  name: "createSales",
  data() {
    return {
      ruleForm: {
        client:'',
        type:'',
        model:'',
        price:'',
        quantity:'',
        all:'',
      },
      rules: {
      },
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
    },
  },
  watch: {

    'ruleForm.quantity': function () {
      this.ruleForm.all = this.ruleForm.price* this.ruleForm.quantity;
    },
    'ruleForm.price': function () {
      this.ruleForm.all = this.ruleForm.price* parseFloat(this.ruleForm.quantity);
    },

  },
  computed:{

  }
}
</script>

<style scoped>

</style>