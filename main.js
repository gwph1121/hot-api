const express = require('express');
const scrapeController = require('./core');

const app = express();

// 定义 GET 接口
app.get('/scrape', scrapeController.scrape);

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
