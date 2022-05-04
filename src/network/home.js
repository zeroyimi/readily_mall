import {request} from './request'
// 首页的所有请求在这里面调用 首页面向现在这个js开发
// 下面函数默认返回一个promise
export function getHomeMultidata(){
  return request({
    url:'./home/multidata'
  })
}
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}