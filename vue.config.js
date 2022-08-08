// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
    // 修改 dev 期间的端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
}
