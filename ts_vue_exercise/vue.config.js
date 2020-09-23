
module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  devServer: {
    proxy: { // 配置跨域
      '/': {
        //要访问的跨域的api的域名
        target: 'http://noname.wang:666/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
    port: 1234,
    disableHostCheck: true
  }
}