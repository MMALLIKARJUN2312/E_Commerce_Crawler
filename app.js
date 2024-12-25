const express = require('express');
const { startCrawl } = require('./src/crawlers/crawlerManager');
const { logger } = require('./src/utils/logger');
const domains = require('./src/config/domains.json');

const app = express();
const port = process.env.PORT || 3000; 

app.get('/crawl', async (req, res) => {
  try {
    logger.info('Starting crawl for all domains...');
    
    const results = await startCrawl(domains);

    res.json({
      message: 'Crawl complete',
      domains: results
    });
  } catch (error) {
    logger.error('Error during crawl: ', error.message);
    res.status(500).json({ message: 'Error during crawl', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Crawler Service is running at port ${port}`);
});
