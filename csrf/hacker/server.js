const koa = require('koa');
const fs = require('fs');
const serve = require('koa-static')
const https = require('https');

const options = {
  key: fs.readFileSync('./hack.com+1-key.pem'),
  cert: fs.readFileSync('./hack.com+1.pem')
};

const app = new koa();

app.use(serve(__dirname))

https.createServer(options, app.callback()).listen(1111, () => {
  console.log('🍀🍀🍀🍀', '运行')
})
