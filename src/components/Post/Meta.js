import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import _ from "lodash";

import {FaCalendar} from "react-icons/fa/";
import {FaUser} from "react-icons/fa/";
import {FaTag} from "react-icons/fa/";
import {FaClock} from "react-icons/fa/";

const Meta = props => {
    const {prefix, authorName, theme, readingTime, tags} = props;
    
    return (
        <p className="meta">
            {readingTime && (<span>
                <FaClock size={18}/> {readingTime}
            </span>)}
            <span>
                <FaCalendar size={18}/> {prefix}
            </span>
            {authorName && (<span>
                <FaUser size={18}/> {authorName}
            </span>)}
            {tags && tags.map(tag =>
                <span>
                    <FaTag size={18}/>
                    <Link to={`/tag/${_.kebabCase(tag)}`}>{tag}</Link>
                </span>
            )}
    
            {/* --- STYLES --- */}
            <style jsx>{`
                .meta {
                  display: flex;
                  flex-flow: row wrap;
                  font-size: 0.8em;
                  margin: ${theme.space.m} 0;
                  background: transparent;
        
                  :global(svg) {
                    fill: ${theme.icon.color};
                    margin: ${theme.space.inline.xs};
                  }
                  span {
                    align-items: center;
                    display: flex;
                    text-transform: uppercase;
                    margin: ${theme.space.xs} ${theme.space.s} ${theme.space.xs} 0;
                  }
                }
                @from-width tablet {
                  .meta {
                    margin: ${`calc(${theme.space.m} * 1.5) 0 ${theme.space.m}`};
                  }
                }
            `}</style>
        </p>
    );
};

Meta.propTypes = {
    prefix: PropTypes.string.isRequired,
    authorName: PropTypes.string,
    readingTime: PropTypes.string,
    tags: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
};

export default Meta;
