<template>
  <div id="employee">
    <el-row>
      <el-col :span="22" :offset="1">
        <el-card>
          <div id="countPurchase" style="width: 100%;height: 250%"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="padding-top: 40px">
      <el-col :span="22" :offset="1">
        <el-card>
          <div id="countSales" style="width: 100%;height: 250%;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "employee",
  data(){
    return{
      // purchaseSubmitData:[],
      purchaseConfirmData:[],
      purchaseCancelData:[],
      // purchaseSeriesSubmitData:[],
      purchaseSeriesConfirmData:[],
      purchaseSeriesCancelData:[],
      purchaseXAxisData:[],


      // salesSubmitData:[],
      salesConfirmData:[],
      salesCancelData:[],
      // salesSeriesSubmitData:[],
      salesSeriesConfirmData:[],
      salesSeriesCancelData:[],
      salesXAxisData:[],
    }
  },
  methods:{
    countPurchase(){
      let purchaseData = this.$echarts.init(document.getElementById('countPurchase'));
      let option = {
        title: {
          text: '采购',
          left:'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left:'left'
        },
        grid: {
          left: '5%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data:this.purchaseXAxisData,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          // {
          //   name: '提交',
          //   type: 'line',
          //   stack: '订单',
          //   data: this.purchaseSeriesSubmitData
          // },
          {
            name: '完成',
            type: 'line',
            stack: '订单',
            data: this.purchaseSeriesConfirmData
          },
          {
            name: '取消',
            type: 'line',
            stack: '订单',
            data: this.purchaseSeriesCancelData
          },
        ]
      };
      purchaseData.setOption(option);
    },

    countSales(){
      let salesData = this.$echarts.init(document.getElementById('countSales'));
      let option = {
        title: {
          text: '销售',
          left:'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left:'left'
        },
        grid: {
          left: '5%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data:this.salesXAxisData,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          // {
          //   name: '提交',
          //   type: 'line',
          //   stack: '订单',
          //   data: this.salesSeriesSubmitData
          // },
          {
            name: '完成',
            type: 'line',
            stack: '订单',
            data: this.salesSeriesConfirmData
          }, {
            name: '取消',
            type: 'line',
            stack: '订单',
            data: this.salesSeriesCancelData
          },
        ]
      };
      salesData.setOption(option);
    },
    getOrderData(){
      this.axios.post("/count/countOrderByOperator",
          this.$qs.stringify({
            operator:this.$store.state.userName
          })).then((response)=>{
            console.log(response.data)
            this.purchaseSubmitData=response.data["countPurchaseByOperatorSubmit"];
            this.purchaseConfirmData=response.data["countPurchaseByOperatorComfirm"];
            this.purchaseCancelData=response.data["countPurchaseByOperatorCancel"];

            this.salesSubmitData=response.data["countSalesByOperatorSubmit"];
            this.salesConfirmData=response.data["countSalesByOperatorComfirm"];
            this.salesCancelData=response.data["countSalesByOperatorCancel"];
          }).then(()=>{
            let _purchaseSubmitData = this.purchaseSubmitData;
            let _purchaseConfirmData = this.purchaseConfirmData;
            let _purchaseCancelData = this.purchaseCancelData;

            let _salesSubmitData = this.salesSubmitData;
            let _salesConfirmData = this.salesConfirmData;
            let _salesCancelData = this.salesCancelData;

            console.log(_purchaseSubmitData)
            console.log(_purchaseConfirmData)
            console.log(_purchaseCancelData)
            console.log(_salesSubmitData)
            console.log(_salesConfirmData)
            console.log(_salesCancelData)
            /*
            * 采购订单
            * * */
            // for (let item of _purchaseSubmitData){
            //   this.purchaseSeriesSubmitData.push({
            //     value:item["countPurchaseNumber"]
            //   })
            //   this.purchaseXAxisData.push({
            //     value:item["purchaseDate"]
            //   })
            // }
            for (let item of _purchaseConfirmData){
              this.purchaseSeriesConfirmData.push({
                value:item["countPurchaseNumber"]
              })
              this.purchaseXAxisData.push({
                value:item["purchaseDate"]
              })
            }
            for (let item of _purchaseCancelData){
              this.purchaseSeriesCancelData.push({
                value:item["countPurchaseNumber"]
              })
              // this.purchaseXAxisData.push({
              //   value:item["purchaseDate"]
              // })
            }

            /* *
            * 销售订单
            *  */
            // for (let item of _salesSubmitData){
            //   console.log(item);
            //   this.salesSeriesSubmitData.push({
            //     value:item["countSalesNumber"]
            //   })
            //   this.salesXAxisData.push({
            //     value:item["salesDate"]
            //   })
            // }
            for (let item of _salesConfirmData){
              this.salesSeriesConfirmData.push({
                value:item["countSalesNumber"]
              })
              this.salesXAxisData.push({
                value:item["salesDate"]
              })
            }
            for (let item of _salesCancelData){
              this.salesSeriesCancelData.push({
                value:item["countSalesNumber"]
              })
              // this.salesXAxisData.push({
              //   value:item["salesDate"]
              // })
            }
          }).then(()=>{
              this.countPurchase()
              this.countSales()
          }).catch((error)=>{
              console.log(error)
          })
    },
  },
  mounted() {
    this.getOrderData()
  }
}
</script>

<style scoped>

</style>