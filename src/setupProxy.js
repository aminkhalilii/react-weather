const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://external-server.com',
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
      },
      onError: (err, req, res) => {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Something went wrong. And we are reporting a custom error message.');
      },
    })
  );
};
