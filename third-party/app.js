const Koa = require('koa');
const Router = require('@koa/router');
const cookie = require('koa-cookie').default;
const fs = require('fs');
const https = require('https');

const app = new Koa();
const router = new Router();

app.use(cookie());

// 模拟用户数据库
const userDatabase = new Map();

router.get('/track', (ctx) => {
  let userId = ctx.cookies.get('tracker_id');
  console.log('🍀🍀🍀🍀当前的userId', userId);
  console.log('🍀🍀🍀🍀当前用户数据库', userDatabase)
  const isNewUser = !userDatabase.has(userId);
  console.log('🍀🍀🍀🍀是否是新用户?', isNewUser ? '是' : '否')

  if (isNewUser) {
    userId = `user_${Math.floor(Math.random() * 1000000)}`;
    ctx.cookies.set('tracker_id', userId, {
      httpOnly: false,
      sameSite: 'none',
      secure: true, // 开发环境禁用，生产环境必须true
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1年
      domain: 'ads.com' // 允许子域共享
    });
    userDatabase.set(userId, userId);
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

app.on('error', (err) => {
  console.log('❌❌❌❌', `服务器错误${err}`);
});

app.use(router.routes());
const port = 8001;


// 加载 mkcert 生成的证书
const options = {
  key: fs.readFileSync('../ads.com+4-key.pem'),  // 注意文件名变化
  cert: fs.readFileSync('../ads.com+4.pem')      // 注意文件名变化
};
// 创建 HTTPS 服务器
https.createServer(options, app.callback()).listen(port, '0.0.0.0', () => {
  console.log(`第三方追踪服务器【用户习惯跟踪，用于广告推送】运行在 http://ads.com:${port}`);
  console.log('🍀🍀🍀🍀', '行为积累 -> 数据聚合 -> 精准推送/商业应用')
});