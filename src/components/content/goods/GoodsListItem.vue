<template>
    <div class="goods-item" @click="itemClick">
      <img v-lazy="showImage" alt="" :key="showImage">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <div class="goods-bottom clearfix">          
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
     name:'GoodsListItem',
     props:{
       goodsItem:{
         type:Object,
          default(){
            return {}
          }
       }
     },
     computed:{
       showImage(){
         return this.goodsItem.image|| this.goodsItem.show.img
       }
     },
     methods:{
       imgaeLoad(){
        //  根据路由判断路径进行事件发送
        //  if(this.$route.path.indexof('/home')){
        //    this.$bus.$emit('homeItemImgLoad')
        //  }else if(this.$route.path.indexOf('/detail')){
        //    this.$bus.$emit('detailItemImgLoad')
        //  }
        },
       itemClick(){
        // 配置路由跳转
        this.$router.push('/detail/'+this.goodsItem.iid)

       }
     }
  }
</script>
<style scoped>
.clearfix::after,.clearfix::before{
  contain: "";
  display: table;
  clear: both;
}
  .goods-item{
    width: 48%;
    padding: 10px 1% 40px;
    position: relative;
  }

  .goods-item img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .goods-info{
    font-size: 12px;
    position: absolute;
    left: 0;
    right:0;
    bottom: 3px;;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .goods-info p{
    overflow: hidden;
    width: 90%;
    border:1px solid transparent;
    margin: 0 5% 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-bottom{
    position: relative;
    width: 90%;
    height: 15px;
  }
  .goods-info .price{
    position: absolute;
    left: 5%;
    color:var(--color-high-text);
    margin-right:0px;
  }

  .goods-info .collect{
    position: absolute;
    right:0;
  }
  .goods-info .collect::before{
    content:'';
    position: absolute;
    display: block;
    left: -15px;
    top:-1px;
    width:14px;
    height:14px;
    background: url("~assets/img/common/collect.svg");
    background-size: 14px;
  }
</style>
