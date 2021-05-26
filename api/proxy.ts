import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/', createProxyMiddleware({ 
    target: 'https://explorer-api.iota.org', 
    changeOrigin: true, 
    onProxyRes: function (proxyRes) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
    logLevel: 'debug' 
}));
app.listen(3000);