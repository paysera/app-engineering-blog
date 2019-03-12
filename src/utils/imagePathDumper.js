const sharp = require('gatsby-plugin-sharp');
const fs = require('fs');
const path = require('path');

function wrap(wrappedFunction, manifestPath, images) {
    return function(options) {
        const file = options.file;
        const result = wrappedFunction.apply(null, arguments);

        if (file.sourceInstanceName === 'posts') {
            result.then(image => {
                if (!images[file.relativePath]) {
                    images[file.relativePath] = image.src;
                    writeManifest(manifestPath, images);
                }
            });
        }

        return result;
    };
}

function writeManifest(manifestPath, images) {
    const dir = path.dirname(manifestPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(manifestPath, JSON.stringify(images));
}

function dumpOnGeneration(manifestPath) {
    let images = {};
    sharp.fluid = wrap(sharp.fluid, manifestPath, images);
}

exports.dumpOnGeneration = dumpOnGeneration;
