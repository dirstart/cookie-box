const koa = require('koa');
const fs = require('fs');
const https = require('https');

const options = {
  key: fs.readFileSync('./content.com+1-key.pem'),
  cert: fs.readFileSync('./content.com+1.pem')
};

const app = new koa();

app.use((ctx) => {
  ctx.body = 'koa Hello World';
})

https.createServer(options, app.callback()).listen(8088, () => {
  console.log('🍀🍀🍀🍀', '运行')
})
