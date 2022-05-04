<template>
   <div class="cart-list">
     <scroll class="content" ref="scroll">
       <cart-list-item 
       v-for="(item,index) in cartList" 
       :key="index" 
       :product="item">
       </cart-list-item>
     </scroll>
   </div>
</template>
<script>
import CartListItem from './CartListItem.vue'

import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll'

  export default {
     name:'CartList',
     components:{
      Scroll,
      CartListItem,
     },
     computed:{
       ...mapGetters(['cartList'])
     },
     activated(){
       this.$refs.scroll.refresh()
     }
  }
</script>
<style scoped>
  .cart-list{
    position: relative;
    top:45px;
    height: calc(100vh - 49px - 62px);
  }
  .content{
    overflow:hidden;
    height: 100%;
  }
</style>
