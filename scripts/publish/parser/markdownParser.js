const fs = require('fs');
const remark = require(`remark`);
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const grayMatter = require(`gray-matter`);

const urlTransformer = require('./urlTransformer');
const mediumLayoutTransformer = require('./mediumLayoutTransformer');
const transformEmoji = require('./emojiTransformer');

const transformPostFromPath = async (siteUrl, filePath, postUrl, postDirectory) => {
    const originalContents = String(fs.readFileSync(filePath));
    const frontmatter = grayMatter(originalContents).data;

    return new Promise((resolve, reject) => {
        new remark()
            .data(`settings`, {
                commonmark: true,
                footnotes: true,
                pedantic: true
            })
            .use(parse)
            .use(
                urlTransformer({
                    siteUrl,
                    postUrl,
                    frontmatter,
                    postDirectory
                })
            )
            .use(
                mediumLayoutTransformer({
                    siteUrl,
                    postUrl,
                    frontmatter,
                    postDirectory
                })
            )
            .use(stringify)
            .process(originalContents, function(err, file) {
                if (err) {
                    return reject(err);
                }

                let content = String(file);
                content = transformEmoji(content);

                return resolve({ content: content, frontmatter });
            });
    });
};

module.exports = {
    transformPostFromPath
};
