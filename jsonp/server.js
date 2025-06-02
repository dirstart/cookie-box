const koa = require('koa')
const static = require('koa-static')
const app = new koa()

app.use(static('./'))

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
app.listen(3000, () => {
  console.log('服务器启动成功，端口号为：3000')
})
