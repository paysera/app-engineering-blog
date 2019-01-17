const url = require('url');
const { transformPostFromPath } = require('../parser/markdownParser');
const client = require('./client');

const publishToMedium = async ({siteUrl, publicationUrl, pathToPost, slug, dryRun, postDirectory}) => {

    const postUrl = url.resolve(siteUrl, slug);
    const transformedPost = await transformPostFromPath(siteUrl, pathToPost, postUrl, postDirectory);

    const {frontmatter: {tags, title}, content} = transformedPost;

    if (dryRun) {
        console.log(content);
        return;
    }

    console.log(`Creating post "${title}" (${postUrl}) on medium...`);
    
    const response = await client.createPost({content, title, tags, postUrl, publicationUrl});

    console.log(`Published to medium: ${response.url}`, response);
};

module.exports = publishToMedium;
