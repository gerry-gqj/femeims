<template>
  <div id="home">
    <manage v-if="this.$store.state.position==='系统管理员'"/>
    <employee v-if="this.$store.state.position!=='系统管理员'"/>
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