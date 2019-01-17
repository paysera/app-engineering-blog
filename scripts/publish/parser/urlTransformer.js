const url = require('url');
const visit = require('unist-util-visit');
const getImageUrl = require('./imageUrlResolver');

function isUrlAbsolute(url) {
    // catches http(s)://example.io but also //example.io
    const isAbsolute = new RegExp('^([a-z]+://|//)', 'i');
    return isAbsolute.test(url);
}

const markFactory = () => {
    const removedNodes = [];
    const markForRemovalVisitor = node => {
        removedNodes.push(node);
    };
    markForRemovalVisitor.nodes = removedNodes;
    return markForRemovalVisitor;
};

const removeFactory = nodes => (node, index, parent) => {
    if (parent && nodes.indexOf(node) !== -1) {
        parent.children.splice(index, 1);
        return index;
    }
};

function createUrlTransformer(options) {
    const { siteUrl, postDirectory } = options;
    return () => transformer;

    function replaceUrl(node) {
        if (!node.url || isUrlAbsolute(node.url)) {
            return;
        }
        
        const imageUrl = getImageUrl(postDirectory + url.resolve('/', node.url));
        
        const absoluteUrl = url.resolve(siteUrl, imageUrl ? imageUrl : node.url);
        console.log(`\tRewriting link "${node.url}" to "${absoluteUrl}" ...`);
        node.url = absoluteUrl;
    }

    function transformer(tree) {
        const markNodeVisitor = markFactory();
        visit(tree, 'yaml', markNodeVisitor);
        visit(tree, removeFactory(markNodeVisitor.nodes));

        console.log(`Rewriting image links ...`);
        visit(tree, 'image', replaceUrl);
        console.log(`Rewriting anchor links ...`);
        visit(tree, 'link', replaceUrl);
        console.log(`Done`);
    }
}

module.exports = createUrlTransformer;
