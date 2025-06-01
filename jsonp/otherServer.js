const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
  if (ctx.path === '/jsonp') {
    const callback = ctx.query.callback
    const data = {
      name: 'chp',
      age: 18,
    }
    ctx.body = `${callback}(${JSON.stringify(data)})`
  }
})

app.listen(8088, () => {
  console.log('服务器启动成功，端口号为：8088')
})
