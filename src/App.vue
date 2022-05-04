<template>
  <div id="app">
    <!-- exclude="Detail"阻止详情页缓存 -->
    <keep-alive exclude="Detail"> 
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  // components: {
  // //  MainTabBar
  // }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
