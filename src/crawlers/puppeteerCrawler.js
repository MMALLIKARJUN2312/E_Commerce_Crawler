const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const { logger } = require('../utils/logger');

puppeteer.use(stealthPlugin());

async function crawlDynamicSite(url) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const productSelector = url.includes('flipkart.com')
      ? 'a[href*="/product/"], a[href*="/p/"], a[href*="/dp/"]' 
      : 'a[href*="/product/"], a[href*="/dp/"], a[href*="/item/"]';

    await page.waitForSelector(productSelector, { timeout: 60000 });

    const productUrls = await page.evaluate((selector) => {
      const urls = [];
      const productLinks = document.querySelectorAll(selector);
      productLinks.forEach(link => {
        if (link.href) {
          urls.push(link.href);
        }
      });
      return urls;
    }, productSelector);

    logger.info(`Found ${productUrls.length} product URLs on ${url}`);
    return productUrls;
  } catch (error) {
    logger.error(`Error crawling ${url}: ${error.message}`);
    return []; 
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { crawlDynamicSite };
