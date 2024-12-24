const isProductURL = (url) => {
    const patterns = [
        /\/dp\/\w+/, 
        /\/product\/\w+/,
        /\/p\/\w+/, 
        /\/item\/\w+/,
    ];
    return patterns.some((pattern) => pattern.test(url));
};

module.exports = { isProductURL };
