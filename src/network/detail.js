import {request} from "./request"

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid 
    }
  }) 
}

export function getReacommend(){
  return request({
    url:'/recommend'
  })
}

// 将数据整合
export class Goods{
  constructor(itemInfo,columns,service){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.columns = columns
    this.service = service
    this.realPrice = itemInfo.lowNowPrice
  }
}
// const g = new Goods() // 数据都传入封装到一个对象里面
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam{
  constructor(info,rule){
    // 注: images可能是没有值（某些商品有值，某些没有值）
    this.image = info.images?info.images[0]:'';
    this.infos = info.set;
    this.sizes = rule.tables
  }
}
