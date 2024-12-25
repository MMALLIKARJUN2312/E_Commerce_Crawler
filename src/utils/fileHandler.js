const fs = require('fs');
const path = require('path');

function saveResultsToFile(results) {
  const filePath = path.join(__dirname, '../output/results.json');  

  const jsonContent = JSON.stringify(results, null, 2);

  fs.writeFileSync(filePath, jsonContent, 'utf8', (err) => {
    if (err) {
      console.error("Error saving results to file:", err);
    }
  });

  console.log("Results saved to results.json");
}

module.exports = { saveResultsToFile };
