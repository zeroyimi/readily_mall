<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
  export default {
     name:'NavBar'
  }
</script>
<style scoped>
  .nav-bar{
    display: flex;
    z-index: 9;
    width: 100%;
    height: 44px;
    line-height: 48px;
    /* background-color: tomato; */
    box-shadow: 0 1 1 rgba(100,100,100,.1);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex:1;
    height: 44px;
    text-align: center;
  }

</style>
