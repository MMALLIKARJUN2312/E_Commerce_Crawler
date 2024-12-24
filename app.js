require('dotenv').config();
const express = require('express');
const crawlerManager = require('./src/crawlers/crawlerManager');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/crawl', async (req, res) => {
    try {
        const results = await crawlerManager.startCrawling();
        fs.writeFileSync('./src/output/results.json', JSON.stringify(results, null, 2));
        res.json({message : 'Crawling Completed!', results});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});