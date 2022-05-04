<template>
<div class="recommend">  
  <!-- 展示轮播图下面的小图 -->
  <div class="recommend-item" v-for="(item,index) in recommends.list" :key="index">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>
<script>
  export default {
     name:'',
     props:{
       recommends:[]
     }
  }
</script>
<style scoped>
  .recommend{
    padding: 10px 5px 20px;
    width:100%;
    display: flex;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex:1;
    text-align: center;
    font-size: 12px;
  }
  .recommend-item img{
    width:65px;
    height:65px;
    margin: 10px 0 6px;
  }
</style>
