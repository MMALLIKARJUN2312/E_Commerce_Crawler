const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, '../output/logs/crawler.log');

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;  
    })
  ),
  transports: [
    new winston.transports.Console({ level: 'info' }),  
    new winston.transports.File({ filename: logFilePath })  
  ]
});

module.exports = { logger };
