<template>
   <div class="bottom-bar">
     <div class="check-content">
       <check-button class="check-button"  :is-checked='isSeleterAll' @click.native="checkClick"/>
       <span class="all">全选</span>
     </div>
     <div class="price">
       合计: {{totalPrice}}
     </div>
     <div class="calculate" @click="calcClick">
        <span>去计算: {{checkLength}}</span>
     </div>
   </div>
   
</template>   
<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
  export default  {
     name:'CartBttomBar',
     components:{
       CheckButton
     },
     computed:{
      totalPrice(){
        return "￥"+this.$store.getters.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue,item)=>{
          // console.log(this.$store.getters.cartList);
          return Number(preValue)+(parseFloat(item.price.slice(1)) * parseFloat(item.count))
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=>item.checked).length
      },
      isSeleterAll() {
        if (this.$store.state.cartList.length === 0) {
            return false
        }
        // 1.使用filter来进行过滤
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        // 2.可以使用find来进行过滤，find只要找到一个符合条件的就会停止
        return !this.$store.state.cartList.find(item => !item.checked)
      }
     },
    methods:{
      checkClick(){        
        if (this.isSeleterAll) {
            //这里isselecterall 为true，即全部选中，所以点击的时候修改为全部不选中
            this.$store.state.cartList.forEach(item => item.checked = false);
        } else {
            // 有部分选中或者都没选中，通过点击变为全选
            this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcBtn(){
        this.$toast.show("暂无此功能")
      },
      calcClick(){
        if(!this.isSeleterAll){
          this.$toast.show("请选择购买的商品",2000)
        }
      }
     },
  }
</script>
<style scoped>
.bottom-bar{
  display: flex;
  align-items: center;
  position: relative;
  height:60px;
  bottom: -5px;
  background-color: #fff;
}
.check-content{
  margin-left: 10px;
  display: flex;
  width: 70px;
  height: 60px;
}
.check-button{
  margin: 17px 0 0;
  width: 25px;
  height: 25px;
}
.check-content span{
  flex:1;
  line-height: 60px;
  margin: 0 5px;
}
.calculate{
  flex:1;
  text-align: right;
  margin-right: 10px;
}
.calculate span{
  display: inline-block;  
  padding: 0px 10px;
  text-align: center;
  line-height: 30px;
  color:#fff;
  background-color: red;
}
</style>
