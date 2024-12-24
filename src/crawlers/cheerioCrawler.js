const axios = require('axios');
const cheerio = require('cheerio');

const cheerioCrawler = async (domain) => {
    console.log(`Crawling ${domain} using Cheerio`);

    try {
        const response = await axios.get(`https://${domain}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
            },
        });

        const $ = cheerio.load(response.data);
        const productLinks = [];

        $('a[href]').each((_, element) => {
            const url = $(element).attr('href');
            if (url && url.includes('/dp/') || url.includes('/p/')) {
                productLinks.push(`https://${domain}${url}`);
            }
        });

        return [...new Set(productLinks)];
    } catch (error) {
        console.error(`Error crawling ${domain} with Cheerio: ${error.message}`);
        return [];
    }
};

module.exports = cheerioCrawler;
