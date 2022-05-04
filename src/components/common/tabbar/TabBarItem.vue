<template>
  <div class="tab-bar-item" @click="itemClick()">
    <!-- 在外部进行一层包装，防止意外替换覆盖 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return {
        // isActive:true

      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1 // 判断当前处于活跃状态的path是那个path,等于的显示活跃状态
      },
      activeStyle(){
        // 借助isActive如果处于活跃状态则调用
        return this.isActive?{color:this.activeColor}:{}
      }
    }
    ,
    methods:{
      itemClick(){
        // 跳转到指定URL，替换history栈中最后一个记录，点击后退会返回至上上一个页面
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 4px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
