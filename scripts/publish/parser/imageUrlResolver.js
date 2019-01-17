const fs = require('fs');

let manifest = null;
module.exports = function(imageKey) {
    if (manifest === null) {
        manifest = JSON.parse(fs.readFileSync('report/imagePaths.json'));
    }
    return manifest[imageKey];
};
