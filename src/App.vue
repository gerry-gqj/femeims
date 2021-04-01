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
