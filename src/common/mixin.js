import {debounce} from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'
export const itemListenerMixin = {
  components:{
    BackTop
  },
  data(){
    return  {
      itemImgListener:null
    }
  },
  mounted(){    
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener=()=>{
      newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
  // 也可以混入methods和computed

}

export const backTopMixin = {
  components:{
    BackTop
  },
  methods:{      
    backClick(){       
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}