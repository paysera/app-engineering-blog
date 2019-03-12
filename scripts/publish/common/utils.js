const path = require('path');
const fs = require('fs');

module.exports = {
    postExistsLocally: filePath => {
        return fs.existsSync(filePath);
    },
    getPathToPost: relativePath => {
        return path.posix.normalize(path.posix.join('content/posts', relativePath, 'index.md'));
    },
    slugFromPath: filePath => {
        const separatorIndex = ~filePath.indexOf('--') ? filePath.indexOf('--') : 0;
        const shortSlugStart = separatorIndex ? separatorIndex + 2 : 0;
        return `${separatorIndex ? '/' : ''}${filePath.substring(shortSlugStart)}`;
    }
};
