<template>
<!-- ref vue中绑定组件的方式 ref/childer -->
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import BScroll from '@better-scroll/core'
// import Pullup from '@better-scroll/pull-up'

// BScroll.use(Pullup)

  export default {
     name:'Scroll',
     props:{
       probeType:{
         type: Number,
         default:0
       },
       pullUpLoad:{
         type:Boolean,
         default:false
       }
     },
     data(){
       return {
         scroll:null
       }
     },
     mounted(){
      //  使用querselect获取参数可能在最后生成文件时与其他的class产生冲突
      //  this.scroll = new BScroll(document.querySelector(".wrapper")) 采用this.$refs.wrapper来传递参数获取的参数具有唯一性
      this.scroll = new BScroll(this.$refs.wrapper,{
         observeDOM: true,
         click:true,// 防止div元素不能被点击
         probeType: this.probeType,
        //  PullUpLoad:true, // 传数据的形式不行
         pullUpLoad:this.pullUpLoad,
         observeImage:true,
         taps: true,
        //  mouseWheel:true
       });
      //  2. 监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3){
          this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      };     
      //  3. 监听scroll滚动到底部
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }

      
     },
     methods:{
       scrollTo(x,y,time=500){      
        //  判断this.scroll里面是否有值 
        // 第一个没有值为Null 结果为false则不会执行后面的代码，前面为false后面才会执行，确保执行的时候页面数据存在，防止报错
         this.scroll && this.scroll.scrollTo(x,y,time)
       },
       finishPullUp(){
          this.scroll && this.scroll.finishPullUp()
       },
       refresh(){
        //  console.log('--------------');
         this.scroll && this.scroll.refresh()
       },
       getScrollY(){
         return this.scroll ? this.scroll.y : 0
       }
     }
  }
</script>
<style scoped>
#wrapper{  
  height:100%;
  top:44px;
}
</style>
