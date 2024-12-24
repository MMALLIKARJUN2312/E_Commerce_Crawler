const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const puppeteerCrawler = async (domain) => {
    console.log(`Crawling ${domain} using Puppeteer`);

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
        );

        await page.goto(`https://${domain}`, { waitUntil: 'domcontentloaded', timeout: 30000 });

        await autoScroll(page);

        const selectors = [
            'a[href*="/dp/"]', 
            'a[href*="/product/"]',
            'a[href*="/p/"]', 
        ];

        let productLinks = [];
        for (const selector of selectors) {
            try {
                await page.waitForSelector(selector, { timeout: 15000 });
                const links = await page.evaluate((sel) => {
                    return Array.from(document.querySelectorAll(sel)).map((link) => link.href);
                }, selector);
                productLinks.push(...links);
            } catch (err) {
                console.warn(`Selector ${selector} not found on ${domain}: ${err.message}`);
            }
        }

        productLinks = [...new Set(productLinks)];

        await browser.close();
        return productLinks;
    } catch (error) {
        console.error(`Error crawling ${domain} with Puppeteer: ${error.message}`);
        return [];
    }
};

const autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
};

module.exports = puppeteerCrawler;
