const axios = require('axios');
const cheerio = require('cheerio');
const { logger } = require('../utils/logger');

async function crawlStaticSite(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const productUrls = [];
    $('a[href*="/product/"]').each((index, element) => {
      productUrls.push($(element).attr('href'));
    });
    logger.info(`Found ${productUrls.length} product URLs on ${url}`);
    return productUrls;
  } catch (err) {
    logger.error(`Error crawling ${url}: ${err.message}`);
    return [];
  }
}

module.exports = { crawlStaticSite };
