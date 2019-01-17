/**
 * How to run:
 * `npm run crosspost -- [--dry-run] [--post "2018-12-29--so-weve-started-to-write-a-blog"`]
 * 
 * Mainly based by https://cmichel.io/how-to-crosspost-to-medium/
 */

require('dotenv').config();

const fs = require('fs');
const { argv } = require('yargs');
const publishToMedium = require('./medium/publisher');
const { getPathToPost, postExistsLocally, slugFromPath } = require('./common/utils');

const siteUrl = process.env.SITE_URL;
const publicationUrl = process.env.MEDIUM_PUBLICATION_URL;

const publishPosts = async () => {
    let post;
    if (argv.post) {
        post = argv.post;
    } else {
        const posts = fs.readdirSync('content/posts');
        post = posts.pop();
        
    }
    const pathToPost = getPathToPost(post);

    if (!postExistsLocally(pathToPost)) {
        console.error(`Post does not exist: ${pathToPost}.\nAborting ...`);
        return;
    }

    console.info(`Will publish post ${pathToPost}`);

    await publishToMedium({
        siteUrl,
        publicationUrl,
        pathToPost,
        slug: slugFromPath(post),
        dryRun: argv.dryRun,
        postDirectory: post
    });
    process.exit();
};

publishPosts();
