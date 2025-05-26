const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.send('HTTPS 服务已启动');
});

const options = {
  key: fs.readFileSync('./content.com+1-key.pem'),
  cert: fs.readFileSync('./content.com+1.pem')
};

https.createServer(options, app).listen(8088, () => {
  console.log('HTTPS 服务运行在 https://127.0.0.1:8088');
});