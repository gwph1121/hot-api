const { filterAfterSymbol } = require('./utils/helpers.js');
module.exports = {
    10000: ($) => {
        const result = [];
        try {
          $('.category-wrap_iQLoo').each((i, el) => {
            const title = $(el).find('.c-single-text-ellipsis').text().trim();
            const hotIndex = $(el).find('.hot-index_1Bl1a').text().trim();
            const link = $(el).find('.img-wrapper_29V76').attr('href');
            const summary = $(el).find('.hot-desc_1m_jR').text().trim();
            result.push({ title, summary , hotIndex, link});
          });
        } catch (err) {
          console.error('Error parsing Baidu data:', err.message);
        }
        return result;
    },
    10010: ($) => {
        const result = [];
        try {
          $('a.css-16fcrt8').each((i, el) => {
            // 提取链接
            const link = $(el).attr('href');
            const title = $(el).find('h1.css-10noe4n').text().trim();
            const summary = $(el).find('.css-3ny988').text().trim();
            const hotIndex = $(el).find('.css-1m9kf2f').text().trim();
    
            result.push({link,title,summary,hotIndex});
          });
        } catch (err) {
          console.error('Error parsing Zhihu data:', err.message);
        }
        return result;
    },
    10011: ($) => {
      console.log($)
        const result = [];
        try {
          $('.MobileHotSearch-list .MobileHotSearch-item').each((i, el) => {
            // 提取链接
            const title = $(el).find('.MobileHotSearch-itemTitle').text().trim();
            // const link = `https://www.zhihu.com/search?q=${title}`;
    
            result.push({title});
          });
        } catch (err) {
          console.error('Error parsing Zhihu data:', err.message);
        }
        return result;
    },
    10020: ($) => {
        const result = [];
        try {
            $('div.tl tbody').eq(1).find('tr').each((i, el) => {
            // 提取链接
            const link = hotApi["10020"].host+'/'+$(el).find('th a').attr('href');
            const title = $(el).find('th a').text().trim();
            const hotIndex = $(el).find('td').last().find('a').text().trim();
            result.push({link,title,hotIndex});
          });
        } catch (err) {
          console.error('Error parsing Zhihu data:', err.message);
        }
        return result;
    },
    10021: ($) => {
        const result = [];
        try {
            $('div.tl tbody').eq(1).find('tr').each((i, el) => {
            // 提取链接
            const link = hotApi["10021"].host+'/'+$(el).find('th a').attr('href');
            const title = $(el).find('th a').text().trim();
            const hotIndex = $(el).find('td').last().find('a').text().trim();
            result.push({link,title,hotIndex});
          });
        } catch (err) {
          console.error('Error parsing Zhihu data:', err.message);
        }
        return result;
    },
    10022: ($) => {
        const result = [];
        try {
            $('div.tl tbody').eq(1).find('tr').each((i, el) => {
            // 提取链接
            const link = hotApi["10022"].host+'/'+$(el).find('th a').attr('href');
            const title = $(el).find('th a').text().trim();
            const hotIndex = $(el).find('td').last().find('a').text().trim();
            result.push({link,title,hotIndex});
          });
        } catch (err) {
          console.error('Error parsing Zhihu data:', err.message);
        }
        return result;
    },
    10030: ($) => {
        const result = [];
        try {
            $('div.article table').each((i, el) => {
                const link = $(el).find('.pl2 a').attr('href');
                const title = filterAfterSymbol($(el).find('.pl2 a').text().trim(), '/').trim();
                const hotIndex = $(el).find('.rating_nums').text().trim();
                const summary = $(el).find('.pl').text().trim();
                result.push({link,summary,title,hotIndex});
            });
        } catch (err) {
          console.error('Error parsing Zhihu data:', err.message);
        }
        return result;
    },
    10031: ($) => {
      const result = [];
      try {
          $('div.article table tbody tr').each((i, el) => {
              const link = $(el).find('td:nth-child(2) a').attr('href');
              const title = $(el).find('td:nth-child(2) a').text().trim();
              const gotime = $(el).find('td:first-child').text().trim();
              const type = $(el).find('td:nth-child(3)').text().trim();
              const area = $(el).find('td:nth-child(4)').text().trim();
              result.push({link,title,gotime,type,area});
          });
      } catch (err) {
        console.error('Error parsing Zhihu data:', err.message);
      }
      return result;
    },
    10040: ($) => {
        const result = [];
        try {
            $.data.forEach((item) => {
                result.push({
                    // clusterId: item.ClusterId.toString(), // 将 ClusterId 转为字符串
                    title: item.Title,
                    // labelDesc: item.LabelDesc,
                    link: item.Url,
                    // imageUrl: item.Image.url,
                });
            });
        } catch (err) {
          console.error('Error parsing Zhihu data:', err.message);
        }
        return result;
    },
    10050: ($) => {
      const result = [];
      try {
        const cards = $.data.cards;

        cards.forEach(card => {
          const cardGroup = card.card_group;
          cardGroup.forEach((group, index) => {
            if (index > 0) {  // 跳过第一个元素
              result.push({
                title: group.desc,
                link: group.scheme,
                hotIndex: group.desc_extr
              });
            }
          });
        });
      } catch (err) {
        console.error('Error parsing Zhihu data:', err.message);
      }
      return result;
  },
}