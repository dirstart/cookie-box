const Koa = require('koa');
const Router = require('@koa/router');
const cookie = require('koa-cookie').default;

const app = new Koa();
const router = new Router();

app.use(cookie());

// 模拟用户数据库
const userDatabase = new Map();

router.get('/track', (ctx) => {
  // 获取或生成用户ID
  let userId = ctx.cookies.get('tracker_id');
  const isNewUser = !userId;

  if (isNewUser) {
    userId = `user_${Math.floor(Math.random() * 1000000)}`;
    ctx.cookies.set('tracker_id', userId, {
      httpOnly: true,
      sameSite: 'none',
      secure: false, // 开发环境禁用，生产环境必须true
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1年
      domain: 'tracker.com' // 关键：跨域Cookie
    });
    userDatabase.set(userId, { firstSeen: new Date() });
  }

  // 记录访问行为
  const userData = userDatabase.get(userId) || {};
  userData.lastSeen = new Date();
  userData.pageViews = (userData.pageViews || 0) + 1;
  userDatabase.set(userId, userData);

  // 返回透明像素
  ctx.set('Content-Type', 'image/gif');
  ctx.body = Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64');

  console.log(`[Tracker] ${isNewUser ? '新用户' : '老用户'}: ${userId}`);
});

app.use(router.routes());
app.listen(4001, () => {
  console.log('第三方追踪服务器运行在 http://tracker.com:4001');
});
