<template>
  <!-- <div id="home ignore"> -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
      class="tab-control" 
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1" 
      v-show="isTabFixed">
    </tab-control>
    <!-- 引用滚动插件 需要设置可滚动高度 可滚动的东西都放在scroll里面 div也可以绑定ref -->
    <!-- 
      ref如果是绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象。
      ref如果是绑定在普通的元素在，那么通过this.$refs.refname获取到的是一个元素对象
     -->
    <scroll class="content" ref="scroll" 
    :probe-type="3" 
    @scroll="contentscroll"
    :pull-up-load="true"
    @pullingUp="loadMore"> 
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <recommoend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control 
    :titles="['流行','新款','精选']"
    @tabClick="tabClick"
    ref="tabControl2" 
    >
    </tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 不能直接监听组件的事件，如果需要监听在事件后添加.native，就可以就可以监听组件事件 -->
    <!-- 
      修饰.native修饰什么时候使用？
      在我们需要监听一个组件的原生事件时，必须给对应时间加上.native修饰符,才能进行监听
     -->
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommoendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getHomeMultidata, getHomeGoods} from "network/home"
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

  export default {
    name: "Home",
    components:{
      HomeSwiper,
      RecommoendView, 
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      MainTabBar
    },  
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        banners:[], // 定义变量保存result值不会被回收
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
          },
        currentType:'pop',
        isShowBackTop:false,  
        tabOffsetTop:0,
        isTabFixed: false,
        saveY:0
      }
    },
     created(){
      //  1. 请求多个数据
      this.getHomeMultidata() // 函数名一样必须写this才是当前的this    
      // 2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
     },
    //  mounted(){
    //   //  防抖动就是让执行频率变低，阻止在输入的时候频繁刷新
    //   const refresh = debounce(this.$refs.scroll.refresh())
    //   // 3. 监听item中图片加载完成 通过$bus.on获取GoodsListItem()中发射的this.$bus.$emit('itemImageLoad')时间
    //   // 对监听事件进行保存
    //   this.itemImgLister = ()=>{
    //     // this.$refs.scroll.refresh()
    //     // 防抖
    //     refresh()
    //   }
    //   this.$bus.$on('itemImageLoad',this.itemImgLister)
    //  },
     destroyed(){
      // 每次不同页面跳转时，上一个网页会被销毁,阻止网页进行销毁，在app.vue进行包装一层
      console.log('home destoryed')
     },
     activated(){
      //  回来时把走之前的值传递回来
       this.$refs.scroll.scrollTo(0,this.saveY,0)
      //  对数据进行刷新，防止出现滚动问题
       this.$refs.scroll.refresh()
     },
     deactivated(){
      //  离开时存储页面滚动的距离 1.保存Y值
       this.saveY = this.$refs.scroll.getScrollY()
      // 2. 取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
       
     },
     computed:{
       showGoods(){
         return this.goods[this.currentType].list
       }
     },
     methods:{
      //  节流防抖

      //  事件监听的相关方法   
      tabClick(index){
          switch(index){
            case 0:
              this.currentType = "pop"
              break
            case 1:
              this.currentType = "new"
              break
            case 2:
              this.currentType = "sell"            
          }
          // 两个都赋值因为不确定点击的是哪一个
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
      },
      //  网络请求相关的方法
      getHomeMultidata(){
        // 抽取给数据进行进一步封装
        getHomeMultidata().then(res=>{
        // 这个函数调用结束后，res会别回收
          this.banners = res.data.banner, // 莫得S
          this.recommends = res.data.recommend
        })
      } ,
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then((res)=>{
          // 取得相对应的数据
          // .push(...nums)将数组解析后在一个一个添加到对应元素中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        // 完成下拉加载更多  
          this.$refs.scroll.finishPullUp()
        })
      },
      contentscroll(position){
        // 1. 判断BackTop是否显示 
        // 直接赋值判断后的结果
        this.isShowBackTop = -position.y>1000
        // 2. 决定tabCtrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        // 加载更多的方法
        this.getHomeGoods(this.currentType)        
        this.$refs.scroll.refresh()
      },
      swiperImageLoad(){                
        // （1）图片加载完成的事件监听
        // （2）获取tabCtrol的offsetTop
        //  所有的组件都有一个属性$el: 用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop // 由于获取的组件距离顶部的高度受到图片加载的影响，所以在获取高度之前需要监听一下图片是否完成
        // console.log(this.$refs.tabControl.$el.offsetTop)
      }
     }
  }
</script>

<style scoped>
/* 
style添加scoped表示style的设置具有作用域，各个文件的设置不互通不会相互影响
*/
  #home{
    height:100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color:#fff;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    top: 0;
    bottom: 0; 
    z-index: 9;*/
  }

  /* .tab-control{ */
    /* 让次导航停留在某个位置 有兼容性问题 */
    /* position:sticky;  */
    /* top:44px;
    z-index: 9;
  } */

  .content{
    position: absolute;
    top:43px;
    /* 写了overflow:hidden就能吸顶了 */
    overflow: hidden; 
    bottom: 49px;
    left: 0;    
    height: calc(100vh - 49px);
  }

  /* .content{
    margin-top:44px;
  }   */
  .tab-control{
    position: relative;
    top:-2px;
    z-index:9;
  }
</style>
