const fs = require('fs');

const saveToFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = {saveToFile};