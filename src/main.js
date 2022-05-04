import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import toast from 'components/common/toast/index.js'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 给事件添加原型
Vue.prototype.$bus = new Vue() // 通过vue实例发送事件和监听事件
// 安装toast插件
Vue.use(toast)

// 解决移动端的300s延迟
FastClick.attach(document.body)
// // 使用懒加载插件
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
  toast,
}).$mount('#app')

// class Animal {
//   run(){

//   }
// }

// mixin混入
// extends继承 person继承Animal Animal的函数会继承到Person里面
// class Person extends Animal{
//   // run(){

//   // }
// }

// class Dog extends Animal{
//   // run(){

//   // }
// }