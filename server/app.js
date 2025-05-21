const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const cookie = require('koa-cookie').default;
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();

// 中间件
app.use(cookie());
app.use(cors({
  origin: 'http://localhost:3000', // 允许React应用的源
  credentials: true // 允许跨域携带cookie
}));

// 设置第一方cookie的路由
router.get('/set-first-party-cookie', (ctx) => {
  ctx.cookies.set('first_party_cookie', 'first_party_value', {
    httpOnly: true,
    maxAge: 86400000, // 1天
    sameSite: 'lax',
    domain: 'localhost'
  });
  ctx.body = 'First-party cookie set successfully';
});

// 获取第一方cookie的路由
router.get('/get-first-party-cookie', (ctx) => {
  const cookieValue = ctx.cookies.get('first_party_cookie');
  ctx.body = {
    firstPartyCookie: cookieValue || 'No first-party cookie found'
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

// 静态文件服务
app.use(koaStatic(path.join(__dirname, '../client/build')));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`First-party server running on http://localhost:${PORT}`);
});
