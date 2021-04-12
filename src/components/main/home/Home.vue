<template>
  <div id="home">
    <manage v-if="$store.state.user.position==='系统管理员'||$store.state.user.position==='经理'"/>
    <employee v-if="$store.state.user.position==='员工'"/>
  </div>
</template>

<script>
import manage from "@/components/main/home/manage";
import employee from "@/components/main/home/employee";
export default {
  name:"home",
  components:{
    manage,
    employee,
  },
}
</script>

<style>

</style>