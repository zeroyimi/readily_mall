<template>  
  <swiper>
    <!-- 后面不绑定key会报错 本来找不到图片，在循环加入banners.list后面加list就可以了-->
    <swiper-item v-for="(item,index) in banners.list" :key="index">
      <a v-bind:href="item.link">
        <img v-bind:src="item.image" alt=""  @load="imgaeLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper/index.js'

  export default {
    name: "HomeSwiper",
    data(){
      return {
        isLoad:false
      }
    },
    props:{
      banners:[]
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imgaeLoad(){
        // 图片只需要发送一次事件，轮播图的高度就可以确认
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  [swiper] *{
    width: 100%;
    height: 100px;
  }
  [swiper-item]{
    width: 100%;
    height: 100px;
  }
</style>
