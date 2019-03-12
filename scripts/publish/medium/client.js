const medium = require('medium-sdk');
const { promisify } = require('util');

// no need for clientId and secret for our case, but it's required by MediumClient – we just pass `true` for validation
const mediumClient = new medium.MediumClient({
    clientId: true,
    clientSecret: true
});

mediumClient.setAccessToken(process.env.MEDIUM_ACCESS_TOKEN);

const getUser = promisify(mediumClient.getUser.bind(mediumClient));
const getPublications = promisify(mediumClient.getPublicationsForUser.bind(mediumClient));
const createPost = promisify(mediumClient.createPostInPublication.bind(mediumClient));

const client = {
    async createPost({ content, title, tags, postUrl, publicationUrl }) {
        const user = await getUser();
        const publications = await getPublications({ userId: user.id });
        const publication = publications.find(publication => publication.url === publicationUrl);
        if (!publication) {
            throw new Error(`Publication with URL ${publicationUrl} not found`);
        }

        return await createPost({
            publicationId: publication.id,
            content,
            title,
            canonicalUrl: postUrl,
            tags,
            contentFormat: medium.PostContentFormat.MARKDOWN,
            publishStatus: medium.PostPublishStatus.DRAFT
        });
    }
};

module.exports = client;
