const puppeteerCrawler = require('./puppeteerCrawler');
const cheerioCrawler = require('./cheerioCrawler');
const domains = require('../config/domains.json');

const crawlerManager = {
    startCrawling : async () => {
        const results = {};
        for (const domain of domains) {
            const {name, isDynamic} = domain;
            const crawler = isDynamic ? puppeteerCrawler : cheerioCrawler;
            results[name] = await crawler(name);
        }
        return results;
    },
};

module.exports = crawlerManager;