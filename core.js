const axios = require('axios');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const hotApi = require('./config/hotApi');
const parseHTML = require('./htmlParsers');

// 抓取指定平台内容
// 抓取指定页面内容的函数
const parseContent = (data, contentType, platform) => {
    // 如果是 JSON 格式，直接返回解析后的数据
    if (contentType.includes('application/json')) {
      try {
        return parseHTML[platform](JSON.parse(data));  // JSON 格式的解析
      } catch (error) {
        throw new Error('Failed to parse JSON');
      }
    }
  
    // 如果是 HTML 格式，需要使用 cheerio 解析
    if (contentType.includes('text/html')) {
      const $ = cheerio.load(data);  // 用 cheerio 解析 HTML
      return parseHTML[platform]($);  // 传递 cheerio 实例给 parseHTML 进行处理
    }
  
    // 如果是其他格式的内容，直接返回解析后的数据
    throw new Error(`Unsupported content type: ${contentType}`);
  };
  
  const fetchContent = async (platform) => {
    try {
      const api = hotApi[platform];
      if (!api || !api.url) throw new Error('Invalid platform.');
  
      // 使用 axios 请求获取原始数据
      const { data, headers } = await axios.get(api.url, {
        headers: api.headers,
        responseType: 'arraybuffer', 
      });
  
      // 获取响应的字符编码
      const encoding = headers['content-type'] && headers['content-type'].includes('charset')
        ? headers['content-type'].split('charset=')[1]
        : 'utf-8';
  
      // 使用 iconv-lite 进行字符编码转换
      const decodedData = iconv.decode(Buffer.from(data), encoding);
  
      // 获取内容类型
      const contentType = headers['content-type'];
      const parsedData = parseContent(decodedData, contentType, platform);
  
      return parsedData;
    } catch (error) {
      console.error(`Error fetching data for ${platform}:`, error.message);
      return { error: `Failed to fetch data for ${platform}` };
    }
  };

  module.exports = {
    scrape: async (req, res) => {
      try {
        const { platform } = req.query;
  
        // 检查 platform 是否有效
        if (!platform || !hotApi[platform]) {
          return res.status(400).json({ error: 'Invalid platform parameter.' });
        }
  
        // 解构出 platform 的相关数据
        const { hotName: title, hotType } = hotApi[platform];
  
        // 获取数据
        const data = await fetchContent(platform);
  
        // 返回响应
        return res.json({
          title,
          hotType,
          platform,
          data
        });
      } catch (error) {
        // 捕获 fetchContent 或其他代码的错误
        console.error('Error in scrape:', error);
        return res.status(500).json({ error: 'Internal server error.' });
      }
    }
  };
  
