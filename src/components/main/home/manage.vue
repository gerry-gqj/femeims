<template>
  <div id="manage">
    <el-row>
      <el-col :span="10" :offset="1">
        <el-card>
          <div id="countUser" style="width: 100%;height: 200%" v-if="this.$store.state.position==='系统管理员'"></div>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-card>
          <div id="countStock" style="width: 100%;height: 200%" v-if="this.$store.state.position==='系统管理员'"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="padding-top: 40px;">
      <el-col :span="22" :offset="1">
        <el-card>
          <div id="countPurchase" style="width: 100%;height: 300%;" v-if="this.$store.state.position==='系统管理员'"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "manage",
  data() {
    return {
      userSeriesData:[],
      userData:[],

      stockSeriesData:[],
      stockData:[],

      purchaseData:[],
      purchaseSeriesData:[],
      purchaseXAxisData:[],

      salesData:[],
      salesSeriesData:[],
      salesXAxisData:[],
    };
  },
  methods: {
    countUser(){
      let userData = this.$echarts.init(document.getElementById('countUser'));
      let option={
        aria: {
          enabled: true
        },
        title:{
          text:'用户统计',
          left:'center'
        },
        tooltip:{
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [{
          name: '用户',
          type: 'pie',
          radius: '40%',
          // roseType: 'radius',
          data:this.userSeriesData,
          labelLine: {
            length: 30,
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 10,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }},
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        }]
      };
      userData.setOption(option);
    },

    countStock(){
      let stockData = this.$echarts.init(document.getElementById('countStock'));

      let option={
        aria: {
          enabled: true
        },
        title:{
          text:'库存信息',
          left:'center'
        },
        tooltip:{
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [{
          name: '库存',
          type: 'pie',
          radius: '40%',
          // roseType: 'radius',
          data:this.stockSeriesData,
          labelLine: {
            length: 30,
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 10,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }},
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        }]
      };
      stockData.setOption(option);
    },

    countPurchase(){
      let purchaseData = this.$echarts.init(document.getElementById('countPurchase'));
      let option = {
        title: {
          text: '采购/销售统计',
          left:'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          // data:this.purchaseXAxisData,
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
          // data:this.purchaseXAxisData,
          data:this.salesXAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '采购统计',
            type: 'line',
            stack: '总量',
            data: this.purchaseSeriesData
          },
          {
            name: '销售统计',
            type: 'line',
            stack: '总量',
            data: this.salesSeriesData
          },
        ]
      };
      purchaseData.setOption(option);
    },

    getUserData(){
      this.axios.get("/user/countUser")
          .then((response)=>{
            console.log(response.data)
            this.userData=response.data;
            console.log(response.data.length)
          }).then(()=>{
        console.log(this.userData)
        let _data = this.userData;
        for (let item of _data){
          this.userSeriesData.push({
            name:item['positionName'],
            value:item['userNumber'],
          })
        }
      }).then(()=>{
        this.countUser();
      }).catch((error)=>{
        console.log(error)
      })
    },
    getPurchaseData(){
      this.axios.get("/count/countPurchaseByDay")
          .then((response)=>{
            console.log(response.data)
            this.purchaseData=response.data;
            console.log(this.purchaseData)
          }).then(()=>{
        let _purchaseData = this.purchaseData;
        for (let item of _purchaseData){
          console.log(item);
          this.purchaseSeriesData.push({
            value:item['countPurchaseNumber'],
          })
          this.purchaseXAxisData.push({
            value:item['purchaseDate']
          })
        }
      }).then(()=>{
        this.countPurchase()
      }).catch((error)=>{
        console.log(error)
      })
    },
    getSalesData(){
      this.axios.get("/count/countSalesByDay")
          .then((response)=>{
            console.log(response.data)
            this.salesData=response.data;
            console.log(this.salesData)
          }).then(()=>{
        let _salesData = this.salesData;
        for (let item of _salesData){
          console.log(item);
          this.salesSeriesData.push({
            value:item['countSalesNumber'],
          })
          this.salesXAxisData.push({
            value:item['salesDate']
          })
        }
      }).then(()=>{
        this.countPurchase()
      }).catch((error)=>{
        console.log(error)
      })
    },

    getStockData(){
      this.axios.get("/count/countStockByType")
          .then((response)=>{
            console.log(response.data)
            this.stockData=response.data;
          }).then(()=>{
        console.log(this.stockData)
        let _stockData = this.stockData;
        for (let item of _stockData){
          this.stockSeriesData.push({
            name:item['stockMotorType'],
            value:item['stockMotorNumber'],
          })
        }
      }).then(()=>{
        this.countStock()
      }).catch((error)=>{
        console.log(error)
      })
    },
  },
  // computed(){
  //   this.getUserData();
  //   this.getStockData();
  //   this.getPurchaseData();
  //   this.getSalesData();
  // },
  // mounted() {
  //   this.getUserData();
  //   this.getStockData();
  //   this.getPurchaseData();
  //   this.getSalesData();
  // },
  created() {
    this.getUserData();
    this.getStockData();
    this.getPurchaseData();
    this.getSalesData();
  }
}
</script>

<style scoped>

</style>