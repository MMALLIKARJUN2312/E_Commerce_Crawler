const fs = require('fs');
const path = require('path');
const { logger } = require('../utils/logger');  

const logDir = path.join(__dirname, '../output/logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });  
  logger.info('Created logs directory: ' + logDir);  
}

function saveResultsToFile(results) {
  const filePath = path.join(__dirname, '../output/results.json');

  const jsonContent = JSON.stringify(results, null, 2);

  try {
    fs.writeFileSync(filePath, jsonContent, 'utf8');
    logger.info('Results saved to results.json');
  } catch (err) {
    logger.error('Error saving results to file: ' + err.message);  
  }
}

module.exports = { saveResultsToFile };
