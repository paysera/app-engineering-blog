import { FaTag } from 'react-icons/fa/';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { ThemeContext } from '../layouts';
import Article from '../components/Article/';
import Headline from '../components/Article/Headline';
import List from '../components/List';
import Seo from '../components/Seo';

const TagsPage = props => {
    const {
        data: {
            posts: { edges: posts },
            site: {
                siteMetadata: { facebook }
            }
        }
    } = props;

    // Create tag list
    const postsByTags = {};
    posts.forEach(edge => {
        const {
            node: {
                frontmatter: { tags }
            }
        } = edge;

        if (!tags) {
            return;
        }

        tags.forEach(tag => {
            if (!postsByTags[tag]) {
                postsByTags[tag] = [];
            }
            postsByTags[tag].push(edge);
        });
    });

    const tagList = [];

    for (let key in postsByTags) {
        tagList.push([key, postsByTags[key]]);
    }

    return (
        <React.Fragment>
            <ThemeContext.Consumer>
                {theme => (
                    <Article theme={theme}>
                        <header>
                            <Headline title="Posts by tags" theme={theme} />
                        </header>
                        {tagList.map(item => (
                            <section key={item[0]}>
                                <h2>
                                    <FaTag /> {item[0]}
                                </h2>
                                <List edges={item[1]} theme={theme} />
                            </section>
                        ))}
                        {/* --- STYLES --- */}
                        <style jsx>{`
                            h2 {
                                margin: 0 0 0.5em;
                            }
                            h2 :global(svg) {
                                height: 0.8em;
                                fill: ${theme.color.brand.primary};
                            }
                        `}</style>
                    </Article>
                )}
            </ThemeContext.Consumer>

            <Seo facebook={facebook} />
        </React.Fragment>
    );
};

TagsPage.propTypes = {
    data: PropTypes.object.isRequired
};

export default TagsPage;

//eslint-disable-next-line no-undef
export const query = graphql`
    query PostsQuery {
        posts: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "//posts/[0-9]+.*--/" } }
            sort: { fields: [fields___prefix], order: DESC }
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        slug
                        prefix
                    }
                    frontmatter {
                        title
                        author
                        tags
                        cover {
                            children {
                                ... on ImageSharp {
                                    fluid(maxWidth: 800, maxHeight: 360) {
                                        ...GatsbyImageSharpFluid_withWebp
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                facebook {
                    appId
                }
            }
        }
    }
`;
