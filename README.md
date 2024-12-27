
---

# E-Commerce Crawler

## Overview

The **E-Commerce Crawler** is a web scraping tool designed to crawl multiple e-commerce websites and discover product URLs. The tool intelligently handles both static and dynamic websites, ensuring scalability and robustness in discovering product URLs across different domains. It uses **Puppeteer** for scraping dynamic websites (JavaScript-rendered content) and **Cheerio** for static websites (HTML scraping).

This project is designed to scale for large e-commerce websites and ensures efficient URL discovery, logging, and result storage.

---

## Features

- **URL Discovery**: The crawler discovers product pages by searching for different URL patterns such as `/product/`, `/item/`, `/p/`, etc.
- **Dynamic and Static Website Handling**: 
  - For dynamic websites, **Puppeteer** is used to handle JavaScript-rendered content.
  - For static websites, **Cheerio** is used for quick and efficient scraping.
- **Scalability**: Can handle hundreds of domains and large website hierarchies.
- **Logging**: Logs activity using **Winston** to track crawling status and errors.
- **Result Storage**: Saves the results in **JSON format** (`results.json`) and logs the activities in **crawler.log**.

---

## Prerequisites

Before running the project, ensure that the following dependencies are installed:

- **Node.js**: Version 16.x or higher.
- **npm**: Node package manager (comes with Node.js).

To verify if Node.js and npm are installed, run:

```bash
node -v
npm -v
```

---

## Installation

### 1. Clone the Repository

Start by cloning the repository:

```bash
git clone https://github.com/MMALLIKARJUN2312/E_Commerce_Crawler.git
cd E_Commerce_Crawler
```

### 2. Install Dependencies

Install all the required dependencies:

```bash
npm install axios cheerio dotenv express puppeteer puppeteer-extra-stealth-plugin uuid winston
```

This will install the necessary packages including Puppeteer, Cheerio, Express, Winston, and others.

### 3. Set up Environment Variables

Create a `.env` file in the root directory to store any sensitive or environment-specific configurations (e.g., API keys, DB credentials, etc.).

For example:

```plaintext
PORT=3000
```

### 4. Create Necessary Directories

Ensure that the output and logs directories exist. This can be done by running the application or manually creating them.

---

## Project Structure

Here’s a breakdown of the project structure:

```
ecommerce-crawler/
├── src/                    # Main source code folder
│   ├── crawlers/           # Crawler modules for handling different types of websites
│   │   ├── puppeteerCrawler.js    # Crawler using Puppeteer for dynamic websites
│   │   ├── cheerioCrawler.js      # Crawler using Cheerio for static websites
│   │   └── crawlerManager.js      # Crawler manager to decide which crawler to use
│   ├── utils/              # Utility functions
│   │   ├── urlParser.js          # Helper to validate and match product URLs
│   │   ├── fileHandler.js        # Utility to handle file operations (save results, logs)
│   │   └── logger.js             # Utility for logging activities (using Winston)
│   ├── config/             # Configuration files
│   │   ├── domains.json         # List of domains to crawl with metadata
│   │   └── config.env           # Environment variable file for sensitive configurations
│   ├── output/             # Output folder for storing results and logs
│   │   ├── results.json         # Discovered product URLs stored as JSON
│   │   └── logs/                # Folder to store crawler logs
│   │       └── crawler.log          # Log file with detailed crawler activities
│   └── app.js            # Main server file for running the Express app
├── .env                    # Root environment file for deployment
├── .gitignore              # Ignore unnecessary files like node_modules, .env, logs, etc.
├── package.json            # Node.js package configuration file
├── package-lock.json       # Lockfile for dependencies
├── README.md               # Documentation with setup, usage, and testing instructions
```

---

## Usage

### 1. Start the Server

To run the crawler, you need to start the Express server. This will expose an endpoint to trigger the crawl for multiple e-commerce domains.

Start the server by running:

```bash
npm start
```

This will start the application on the port defined in your `.env` file (default is `3000`).

### 2. Trigger a Crawl

You can trigger the crawl via a simple HTTP GET request.

- **URL**: `http://localhost:3000/crawl`
- **Method**: `GET`
- **Response**: A JSON response indicating the status of the crawl for each domain.

Example:

```bash
postman http://localhost:3000/crawl
```

Response:

```json
{
  "message": "Crawl completed",
  "domains": {
    "https://www.amazon.com": ["https://www.amazon.com/product/12345", "https://www.amazon.com/product/67890", "... and others"],
    "https://www.flipkart.com": ["https://www.flipkart.com/product/23456", "... and others"]
  }
}
```

### 3. View the Output

After the crawl is completed:

- **Results**: The product URLs are saved in `output/results.json`.
- **Logs**: Detailed log information, including success and errors, can be found in `output/logs/crawler.log`.

Example of `results.json`:

```json
{
  "https://www.amazon.com": [
    "https://www.amazon.com/product/12345",
    "https://www.amazon.com/product/67890"
  ],
  "https://www.flipkart.com": [
    "https://www.flipkart.com/product/23456"
  ]
}
```

### 4. Check Logs

The crawler logs its activities in `crawler.log` inside the `output/logs` directory. It logs key events such as:

- Starting the crawl
- URL discovery progress
- Success or failure of crawling for each domain

Example log entry:

```
2024-12-25 14:30:01 [info] Starting crawl for domain: https://www.amazon.com
2024-12-25 14:30:10 [info] Found 187 product URLs on https://www.amazon.com
2024-12-25 14:30:12 [info] Starting crawl for domain: https://www.flipkart.com
2024-12-25 14:30:20 [error] Error crawling https://www.flipkart.com: Timeout waiting for product links
```

---

## Configuration

The configuration files are located in the `config/` directory. 

### **`domains.json`**:

This file contains a list of domains to be crawled. Each domain has metadata that helps decide how to crawl it (e.g., whether it’s a dynamic website).

Example:

```json
[
  {
    "url": "https://www.amazon.com",
    "isDynamic": true
  },
  {
    "url": "https://www.flipkart.com",
    "isDynamic": true
  }
]
```

### **`config.env`**:

You can add environment-specific variables such as API keys or sensitive information here. Make sure this file is **not** committed to version control (it's ignored by `.gitignore`).

---

## Development

### 1. Running Tests

To run the unit tests, you can use Jest. This is helpful for verifying that the crawlers and utility functions behave as expected.

```bash
npm test
```

### 2. Code Quality & Linting

We use standard ESLint settings for maintaining code quality. Run the following command to lint your code:

```bash
npm run lint
```

### 3. Updating Dependencies

To update your dependencies, you can run:

```bash
npm update
```

---

## Contributing

I welcome contributions! If you’d like to contribute to the project, feel free to fork the repository and create a pull request. Here are a few ways you can help:

- **Bug Fixes**: If you encounter a bug, feel free to open an issue and, if you can, submit a pull request with a fix.
- **Feature Requests**: If you have ideas for new features, submit them as issues or pull requests.
- **Documentation**: Help improve the documentation by contributing improvements or additional explanations.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Puppeteer**: For handling JavaScript-heavy websites and crawling dynamic content.
- **Cheerio**: For parsing and scraping static HTML content efficiently.
- **Winston**: For structured logging of events, warnings, and errors during the crawling process.

---
