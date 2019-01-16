import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import { ThemeContext } from "../layouts";

const PostTemplate = props => {
  const {
    data: {
      post,
      authors,
      site: {
        siteMetadata: { facebook }
      }
    },
    pageContext: { next, prev }
  } = props;
  
  const authorNode = authors.edges.find(a => a.node.fields.username === post.frontmatter.author);
  const author = authorNode ? authorNode.node : undefined;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <Post
              post={post}
              next={next}
              prev={prev}
              author={author}
              facebook={facebook}
              theme={theme}
            />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo data={post} facebook={facebook} />
    </React.Fragment>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default PostTemplate;

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        prefix
        readingTime {
          text
        }
      }
      frontmatter {
        title
        author
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
        tags
      }
    }
    authors: allMarkdownRemark(filter:{fields: { source: { eq: "authors" } }}) {
      edges {
        node {
          id
          html
          frontmatter {
            name
            avatar
          }
          fields {
            username
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
