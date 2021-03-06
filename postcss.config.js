module.exports = {
  Plugin:{
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth: 375,//视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight: 667,//视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 5,//指定px 转换为视窗单位的小数位数
      viewportUnit: 'vw',//单位为vw
      selectorBlackList: ['ignore'], // 指定不需要转换的类型，即希望某个物体大侠小不随页面变化 里面的值为类名
      minPixelValue: 1, //小于或者等于'1px'不进行转换
      mediaQuery: false, //允许在媒体查询中转换
      exclude: [/TabBar\.vue$/]
    }
  }
}
// 1. 在js中使用正则：/正则相关规则/
// 2. exclude中存放的元素必须是正则表达式
// 3. 按照排除的文件写对应的正则
// 正则的规则:
// 1> ^abc: 表示匹配的内容，必须以什么内容开头（以abc开头）
// 2> abc$: 表示匹配的内容，必须以什么内容结尾（以abc结尾）