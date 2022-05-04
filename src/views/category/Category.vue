<template>
  <div id="category">      
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import {backTopMixin} from 'common/mixin.js'
  import NavBar from 'components/common/navbar/NavBar'
  import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
  export default {
    name: "Category",
    data(){
      return {        
        isShowBackTop:false
      }
    },
    components:{
      MainTabBar,
      NavBar
    },
    mixins:[backTopMixin]
  }
</script>


<style scoped>
  .wrapper{
    height:150px;
    background-color: red;
    overflow: hidden;
    /* overflow-y: scroll; */
  }
  .nav-bar{
    display: flex;
    top:0;
  }
  
  .category-nav{
    background-color: var(--color-tint);
    color:#fff;
  }
</style>
