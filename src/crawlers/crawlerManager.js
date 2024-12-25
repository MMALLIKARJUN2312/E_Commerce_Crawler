const { crawlDynamicSite } = require('./puppeteerCrawler');
const { saveResultsToFile } = require('../utils/fileHandler');
const { logger } = require('../utils/logger');

async function crawlWebsite(url, isDynamic) {
  let productUrls = [];

  if (isDynamic) {
    productUrls = await crawlDynamicSite(url);
  } else {
  }

  if (productUrls.length > 0) {
    logger.info(`Successfully crawled ${url} and found ${productUrls.length} product URLs.`);
  } else {
    logger.warn(`No product URLs found for ${url}.`);
  }

  return productUrls;
}

async function startCrawl(domains) {
  const results = {};  

  for (const domain of domains) {
    try {
      logger.info(`Starting crawl for domain: ${domain.url}`);
      const productUrls = await crawlWebsite(domain.url, domain.isDynamic);  
      results[domain.url] = productUrls; 
    } catch (error) {
      logger.error(`Failed to crawl ${domain.url}: ${error.message}`);
      results[domain.url] = [];  
    }
  }

  saveResultsToFile(results);

  return results; 
}

module.exports = { startCrawl, crawlWebsite };
