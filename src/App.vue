<template>
  <div id="app">
    <!-- 路由容器 -->
    <router-view/>
        <!-- name:
        <h1>{{ $store.state.name }}</h1>
        <h1>{{$store.state.name}}</h1>
        <button @click="add"></button> -->
  </div>
</template>

<script>

export default {
  name:'App',
  // created(){
  //   //从sessionStorage中取值，放到Vuex中
  //   if(localStorage.getItem('store')){
  //     this.$store.replaceState(localStorage.getItem('store'));
  //   }
  //   //监听页面刷新事件，将Vue最新状态值保存到sessionStorage中
  //   window.addEventListener('beforeunload',() => {
  //     localStorage.setItem('store',this.$store.state);
  //   });
  // },



  // methods:{
  //   add(){
  //     // this.$store.commit('edit',{age:15,sex:'男'})
  //     this.$store.commit({
  //       type:'edit',
  //       payload:{
  //         age:15,
  //         sex:'男'
  //       }
  //     })
  // }
  // }
}
</script>

<style >
  body{
    margin: 0;
    padding: 0;
    /* overflow: hidden; */
  }
</style>
