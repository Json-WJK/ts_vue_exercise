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
      '/v1': {
        //要访问的跨域的api的域名
        target: 'http://noname.wang:3000/v1/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/v1': ''
        }
      }
    },
    port: 1234,
    disableHostCheck: true,
    devServer: {
      host: "http://noname.wang",
      port: 3000
    } 
  }
}