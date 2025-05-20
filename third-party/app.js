const Koa = require('koa');
const Router = require('@koa/router');
const cookie = require('koa-cookie').default;

const app = new Koa();
app.use(cookie());

// 模拟用户ID生成
const generateUserId = () => Math.random().toString(36).substring(2, 10);

// 隐藏式设置第三方Cookie
router.get('/track', (ctx) => {
  // 检查是否已有追踪Cookie
  let userId = ctx.cookies.get('tracker_id');
  
  if (!userId) {
    userId = generateUserId();
    ctx.cookies.set('tracker_id', userId, {
      httpOnly: true,
      sameSite: 'none',
      secure: false, // 开发环境关闭，生产必须true
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1年
      domain: 'tracker.com' // 模拟跨域
    });
    console.log('🎯 新用户追踪ID:', userId);
  } else {
    console.log('🔍 识别到老用户:', userId);
  }

  // 记录用户行为（模拟）
  const page = ctx.query.page || 'unknown';
  console.log(`📊 用户 ${userId} 访问了 ${page} 页面`);

  // 返回透明的1x1像素GIF（经典追踪技术）
  ctx.set('Content-Type', 'image/gif');
  ctx.body = Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64');
});

app.use(router.routes());
app.listen(4001, () => {
  console.log('第三方追踪服务器运行在 http://tracker.com:4001');
});