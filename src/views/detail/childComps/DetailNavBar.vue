<template>
  <div>    
    <!-- 导航 -->
    <nav-bar class="navBar">
      <div slot="left" class="back" @click="backClick"> 
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <a v-for="(item,index) in titles" 
        :key="index" 
        class="title-item"
        :class="{active:index==currentIndex}"
        @click = "btnClick(index)"
        >{{item}}</a>
      </div>
    </nav-bar>  
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
// import func from 'vue-editor-bridge'

  export default {
    name:'DetailNavBar',
    components:{
      NavBar
    },
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      btnClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        // 设置点击返回
        this.$router.back()
      }
    }
  }
</script>
<style scoped>
.navBar{
  position: fixed;
  background-color: #fff;
}
  .title{
    display: flex;
  }

  .title-item{
    flex:1;
    color:13px;
  }

  .active{
    color:var(--color-high-text)
  }
  .back{
    position: relative;
  }
  .back img{
    position: absolute;
    left: 15px;
    top:11px;
  }
</style>
