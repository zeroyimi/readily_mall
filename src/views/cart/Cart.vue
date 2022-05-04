<template>
  <div class="cart">
    <nav-bar class="cart-nav">      
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->   
    <cart-bottom-bar></cart-bottom-bar>
    <main-tab-bar></main-tab-bar>     
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from 'views/cart/childComps/CartBottomBar.vue'

import {mapGetters} from 'vuex' // 从vuex框架中直接导入

  export default {
    name:  "Cart",
     components:{
       NavBar,
       MainTabBar,
       CartList,   
       CartBottomBar
     },
     computed:{
       ...mapGetters({
         length: 'cartNum',
         list: 'cartList'
       })
      //  cartLength(){
      //    return this.$store.getters.cartlength
      //  }
     }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .cart-nav{
    position: fixed;
    background-color: var(--color-tint);
    color:#fff;  
  }
</style>
