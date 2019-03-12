const url = require('url');
const getImageUrl = require('./imageUrlResolver');

const createFeatureImage = (siteUrl, postDirectory, cover) => {
    if (!cover) {
        return null;
    }
    return {
        type: `image`,
        title: null,
        alt: 'Featured Image',
        url: url.resolve(siteUrl, getImageUrl(postDirectory + '/' + cover))
    };
};

const createTitle = title => ({
    type: 'heading',
    depth: 1,
    children: [
        {
            type: `text`,
            value: title
        }
    ]
});

const createHorizontalRule = () => ({
    type: `thematicBreak`
});

const createReferenceToOriginalPost = (siteUrl, postUrl) => ({
    type: `paragraph`,
    children: [
        {
            type: `text`,
            value: `Originally published at `
        },
        {
            type: 'link',
            url: postUrl,
            children: [
                {
                    type: 'text',
                    value: siteUrl.replace(/^https?:\/\//m, '')
                }
            ]
        }
    ]
});

function createTransformer(options) {
    const {
        siteUrl,
        postUrl,
        frontmatter: { title, cover },
        postDirectory
    } = options;
    return () => transformer;

    function transformer(tree) {
        tree.children = [
            createFeatureImage(siteUrl, postDirectory, cover),
            createTitle(title),
            ...tree.children,
            createHorizontalRule(),
            createReferenceToOriginalPost(siteUrl, postUrl)
        ].filter(node => !!node);
    }
}

module.exports = createTransformer;
