function isProductUrl(url) {
  return /\/product\/|\/item\/|\/p\//.test(url);
}

module.exports = { isProductUrl };
