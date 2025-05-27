const Koa = require('koa');
const Router = require('@koa/router');
// koa 解析请求体，user=123 => {user: '123'}
const bodyParser = require('koa-bodyparser')
// koa 静态服务器，用于托管 bank.html 静态页面
const serve = require('koa-static');
// koa 维护登录状态
const session = require('koa-session').default;
// 配置 https 服务器
const https = require('https');
const fs = require('fs');
const path = require('path');

// 实例化
const app = new Koa();
const router = new Router();

// session 配置
app.keys = ['sercret-bank-key'];
app.use(bodyParser())
app.use(session({
  key: 'koa.sess',
  maxAge: 86400000, // 1天，ms
  httpOnly: true, // 防止 xss 攻击
  secure: true, // 启用 HTTPS
  signed: true, // 防止篡改
}, app))
app.use(serve(path.join(__dirname)))


router.all('/login', (ctx) => {
  const {
    name,
    psd
  } = ctx.request.body;

  console.log('🍀🍀🍀🍀', name, psd)
  if (name !== 'chp' || psd !== '123') {
    ctx.body = {
      code: 0,
      msg: '密码错误，登录失败'
    }
  } else {
    ctx.session.user = name;
    ctx.session.authenticated = true;
    ctx.body = {
      code: 200,
      msg: '登录成功'
    }
  }
})

router.all('/logout', (ctx) => {
  ctx.session = null;
  // 手动清除 cookie
  ctx.cookies.set('koa.sess', null, { expires: new Date(0) });
  ctx.cookies.set('koa.sess.sig', null, { expires: new Date(0) })
  ctx.body = {
    code: 200,
    msg: '退出登录成功'
  }
})

router.all('/transfer', (ctx) => {
  if (!ctx.session.authenticated) {
    ctx.body = {
      status: 403,
      code: 0,
      msg: '请先登录'
    }
    return;
  }

  const { money } = ctx.request.body;
  ctx.body = {
    status: 200,
    code: 200,
    msg: `转账成功，转走了${money}元`
  }
  console.log('🍀🍀🍀🍀 转账成功，转走了', money);
})

app.use(router.routes()).use(router.allowedMethods());

// https 证书、私钥配置
const options = {
  key: fs.readFileSync('./bank.com+1-key.pem'),
  cert: fs.readFileSync('./bank.com+1.pem')
}
https.createServer(options, app.callback()).listen(8088, () => {
  console.log('🍀🍀🍀🍀', '运行静态页面 + 对应 api 接口')
})
