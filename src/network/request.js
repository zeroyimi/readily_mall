import axios from 'axios'
// 导出多个创建函数

export function request(config){
    const instance = axios.create({
      baseURL:"http://152.136.185.210:7878/api/hy66",
      timeout: 5000
    })
  
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err)
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })
 return instance(config)
}
