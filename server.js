const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <form action="/proxy" method="get">
      <input type="text" name="url" placeholder="Enter URL" required />
      <button type="submit">Go</button>
    </form>
  `);
});

app.get('/proxy', createProxyMiddleware({
  target: (req, res) => req.query.url,
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // Optional: Modify the request here if needed
  },
  onProxyRes: (proxyRes, req, res) => {
    // Optional: Modify the response here if needed
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
