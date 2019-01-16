const _ = require('lodash');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require('path');
const Promise = require('bluebird');
const {createFilePath} = require(`gatsby-source-filesystem`);

const users = {};
exports.onCreateNode = ({node, getNode, actions}) => {
    const {createNodeField} = actions;
    if (node.internal.type !== 'MarkdownRemark') {
        return;
    }
    
    const slug = createFilePath({node, getNode});
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

    if (source === 'authors') {
        const username = slug.replace(/^\/|\/$/g, '');
        createNodeField({
            node,
            name: 'username',
            value: username
        });
        users[username] = node;
    } else if (source !== 'parts') {
        createNodeField({
            node,
            name: 'slug',
            value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
        });
        
        if (node.frontmatter && node.frontmatter.author) {
            createNodeField({
                node,
                name: 'author',
                value: users[node.frontmatter.author]
            });
        }
    }
    createNodeField({
        node,
        name: 'prefix',
        value: separtorIndex ? slug.substring(1, separtorIndex) : ""
    });
    createNodeField({
        node,
        name: 'source',
        value: source
    });
};

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;

    return new Promise((resolve, reject) => {
        const postTemplate = path.resolve("./src/templates/PostTemplate.js");
        const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
        const tagTemplate = path.resolve("./src/templates/TagTemplate.js");
        
        resolve(
            graphql(`
              {
                allMarkdownRemark(
                  filter: { fields: { slug: { ne: null } } }
                  sort: { fields: [fields___prefix], order: DESC }
                  limit: 1000
                ) {
                  edges {
                    node {
                      id
                      fields {
                        slug
                        prefix
                        source
                      }
                      frontmatter {
                        title
                        tags
                      }
                    }
                  }
                }
              }
            `).then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const items = result.data.allMarkdownRemark.edges;

                // Create tag list
                const tagSet = new Set();
                items.forEach(edge => {
                    const {
                        node: {
                            frontmatter: {tags}
                        }
                    } = edge;
                    
                    (tags || []).forEach(tag => tagSet.add(tag));
                });

                // Create tag pages
                tagSet.forEach(tag => {
                    createPage({
                        path: `/tag/${_.kebabCase(tag)}/`,
                        component: tagTemplate,
                        context: {
                            tag
                        }
                    });
                });

                // Create posts
                const posts = items.filter(item => item.node.fields.source === 'posts');
                posts.forEach(({node}, index) => {
                    const slug = node.fields.slug;
                    const next = index === 0 ? undefined : posts[index - 1].node;
                    const prev = index === posts.length - 1 ? undefined : posts[index + 1].node;
                    const source = node.fields.source;

                    createPage({
                        path: slug,
                        component: postTemplate,
                        context: {
                            slug,
                            prev,
                            next,
                            source
                        }
                    });
                });

                // and pages.
                const pages = items.filter(item => item.node.fields.source === 'pages');
                pages.forEach(({node}) => {
                    const slug = node.fields.slug;
                    const source = node.fields.source;

                    createPage({
                        path: slug,
                        component: pageTemplate,
                        context: {
                            slug,
                            source
                        }
                    });
                });
            })
        );
    });
};

exports.onCreateWebpackConfig = ({stage, actions}, options) => {
    switch (stage) {
        case `build-javascript`:
            actions.setWebpackConfig({
                plugins: [
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'static',
                        reportFilename: "./report/treemap.html",
                        openAnalyzer: true,
                        logLevel: 'error',
                        defaultSizes: 'gzip'
                    })
                ]
            });
    }
};

