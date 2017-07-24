'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class Article extends React.Component {
  render() {
    return (
      <div className="article-page">
        ARTICLE
      </div>
    );
  }
}

Article.displayName = 'Article';
Article.propTypes = {
  name: PropTypes.string.isRequired
};
Article.defaultProps = {};

export default Article;
