// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    // 修改 dev 期间的端口号
    port: 3000,
    // 自动打开浏览器
    open: true,

    // 解决跨域问题

    // 当前项目在开发调试阶段，
    // 会将任何未知请求 (没有匹配到静态文件的请求) 代理到https://www.escook.cn
    proxy: 'https://www.escook.cn'
  }
}
