<template>
  <div id="profile">
    <nav-bar class="profile-nav"><div slot="center">我的</div></nav-bar>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

  export default {
    name: "Profile",
     components:{
       NavBar,
       MainTabBar
     }
  }
</script>

<style scoped>
  .profile-nav{
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
