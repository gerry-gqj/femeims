<template>
  <div id="app">
    <!-- 路由容器 -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name:'App',
}
</script>

<style >
html,body,#app{
  height: 100%;
  width: 100%;
  margin:0;
  padding: 0;
}
</style>
