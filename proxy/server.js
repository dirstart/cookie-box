const Koa = require('koa')
const serve = require('koa-static')

// 引入代理中间件
const proxy = require('koa-server-http-proxy')

const app = new Koa()

app.use(serve('./'))

app.use(
  proxy('/api', {
    target: 'http://bank.com:8088',
    pathRewrite: {
      '^/api': '',
    },
    changeOrigin: true,
  }),
)

app.listen(3000, () => {
  console.log('服务器启动成功，端口号为：3000')
})
