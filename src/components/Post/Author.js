import React from "react";
import PropTypes from "prop-types";

const Author = props => {
    const { author, theme } = props;

    return (
        <React.Fragment>
            <div className="author">
                {author.frontmatter.avatar && (<div className="avatar">
                    <img
                        src={author.frontmatter.avatar}
                        alt={author.frontmatter.name}
                    />
                </div>)}
                <div className="note" dangerouslySetInnerHTML={{ __html: author.html }} />
            </div>

            {/* --- STYLES --- */}
            <style jsx>{`
                .author {
                  margin: ${theme.space.l} 0;
                  padding: ${theme.space.l} 0;
                  border-top: 1px solid ${theme.line.color};
                  border-bottom: 1px solid ${theme.line.color};
                }
                .avatar {
                  float: left;
                  border-radius: 65% 75%;
                  border: 1px solid ${theme.line.color};
                  display: inline-block;
                  height: 50px;
                  margin: 5px 20px 0 0;
                  overflow: hidden;
                  width: 50px;
                }
                .avatar img {
                  width: 100%;
                }
                .note {
                  font-size: 0.9em;
                  line-height: 1.6;
                }
                @from-width tablet {
                  .author {
                    display: flex;
                  }
                  .avatar {
                    flex: 0 0 auto;
                  }
                }
          `}</style>
        </React.Fragment>
    );
};

Author.propTypes = {
    author: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default Author;
