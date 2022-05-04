<template>
<div id="detail">  
  <detail-nav-bar class="detail-nav" @titleClick = "titleClick" ref="nav"/>
  <!-- 此处会出现只加载出一张图片的问题，加上 v-if="topImages!=''" 后就可以正常显示了 -->
  <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
    <!-- 属性：top-images 传入值：top-images(区分大小写，不写好容易出现错误) -->
    <detail-swiper v-if="topImages!=''" :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop=" shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>  
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recomments"></goods-list>
  </scroll>  
  <back-top v-show="isShowBackTop" @click.native="backClick"/>
  <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import {getDetail,Goods,Shop,GoodsParam,getReacommend} from 'network/detail.js'
import GoodsList from 'components/content/goods/GoodsList.vue'
import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
import { debounce } from 'common/utils'
import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailBottomBar,
      Scroll,
      GoodsParam,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recomments:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,  
        isShowBackTop:false,
      }
    },
    created(){
      // 1. 保存存入的iid
      this.iid = this.$route.params.iid
      // 2. 根据iid请求详细数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 1. 获取顶部的图片的轮播图数据
        const data = res.result;
        // 2. 获取顶部图片数据
        this.topImages = data.itemInfo.topImages
        // 3. 获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )        
        // 4. 创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 5. 获取商品详细信息
        this.detailInfo = data.detailInfo
        // 6. 保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // console.log(this.paramInfo);
        // 7. 取出参数的信息
        this.itemParams = data.itemParams
        // 8. 取出评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        // this.$nextTick(()=>{   
        //   // 根据最新的数据，获取的DOM，DOM以及渲染出来，但是图片依然是没有加载完的（目前获取的offsetTop不包含其中的图片）
        //   // offsetTop值不对的时候，都是因为图片问题 
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
        
      })
    // 3. 请求推荐数据
    getReacommend().then(res=>{
      this.recomments = res.data.list
      // console.log(res);
    })
  // 4. 给getThemToyY赋值
  this.getThemeTopY = debounce(()=>{
        // 获取不同菜单栏对应的位置
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)    
  },100)
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){        
        this.isShowBackTop = -position.y>1000
        // 1. 获取y值
        const positionY = -position.y
        // 2. positiony与主题中的值进行对比
        // [0,1,2,3]
        // 在几个值之间作判断
        var length = this.themeTopYs.length
        for(let i=0;i<length-1;i++){     
          i=parseInt(i)    
          // console.log(i); // 此处i输出的是str类型 i+1得到字符串
          // hack做法 最后一个值设置为一个很大的值
          // [0,1,2,3,Math_VALUE]
          if(this.currentIndex !== i&&(positionY>=this.themeTopYs[i])&&positionY<=this.themeTopYs[i+1]){ // 为防止越界，便利只需要到i-1即可
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
          // 普通做法
          // if(this.currentIndex!==i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i]))){
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          //   // console.log(i);
          // }
        }
      },
      addCart(){
        // 1. 获取商品信息
        const product = {}
        // 取出图片
        product.image = this.topImages[0]
        // 标题
        product.desc = this.goods.desc
        // 价格
        product.price = this.goods.newPrice;
        // 商品的标识
        product.iid = this.iid
        
        // 2. 将我们的商品添加到购物车里面
        // this.addCart(product).then(res=>{
        //   // console.log(res)
        //   this.$toast.show(res)
        // })
        
        // this.$store.dispatch('addCart', product).then(res=>{
        //   console.log(res);
        // })
        this.$store.dispatch('addCart',product).then(res=>{          
          this.$toast.show(res,2000)
        })
      }
    },
    destroyed(){
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    // updated(){
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopYs)
    // }
  }
</script>

<style scoped>

#detail{
  position: relative;
  height: 100vh;
}
.content{
  position: absolute;
  top:43px;
  /* 写了overflow:hidden就能吸顶了 */
  overflow: hidden; 
  bottom: 49px;
  left: 0;    
  height: calc(100vh - 49px - 48px);
}
</style>
