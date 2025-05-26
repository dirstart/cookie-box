const https = require('https');
const fs = require('fs');

const optiosn = {
    key: fs.readFileSync('./content.com+1-key.pem'),
    cert: fs.readFileSync('./content.com+1.pem')
}

const server =  https.createServer(optiosn, (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello World</h1>');
})

server.listen(8088, () => {
    console.log('🍀🍀🍀🍀', '运行')
})