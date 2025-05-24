const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/tracker-proxy',
    createProxyMiddleware({
      target: 'http://tracker.com:4001',
      changeOrigin: true,
      pathRewrite: { '^/tracker-proxy': '' }
    })
  );
};
