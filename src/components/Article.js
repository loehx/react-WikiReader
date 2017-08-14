'use strict';

import React from 'react';
import { connect } from 'react-redux';
import WikiActions from '../actions/wiki'
import AppActions from '../actions/app'
import Markdown from 'react-remarkable'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';


@connect(({wiki, app}) => {
  return {
    name: wiki.name,
    markdown: wiki.markdown,
    isLoading: app.loading,
    isComplete: app.complete,
    errorMessage: wiki.errorMessage,
    took: wiki.took,
    url: wiki.url
  }
})
class Article extends React.Component {

  componentWillMount() {
    if (this.props.match.params.name)
      WikiActions.fetchArticle(this.props.match.params.name);
  }

  onLeftIconButtonTouchTap = (event) => {
    event.preventDefault();
    AppActions.openOriginalPage(this.props.name);
  }

  onRightIconButtonTouchTap = (event) => {
    event.preventDefault();
    AppActions.openSearch();
  }

  render() {
    const {isComplete, isLoading, markdown, name, took, url, errorMessage} = this.props;

    if (!isComplete) return null;
    if (isLoading) return <center>Loading ...</center>;
    if (errorMessage) return <center><i>{ errorMessage }</i></center>;

    const closeButton = <IconButton>
                            <NavigationClose />
                        </IconButton>;
    const openArticleButton = <IconButton>
                                  <OpenInNew />
                              </IconButton>

    return (
      <div className="article-page">
          <AppBar title={ name } iconElementRight={ closeButton } onRightIconButtonTouchTap={ this.onRightIconButtonTouchTap } iconElementLeft={ openArticleButton } onLeftIconButtonTouchTap={ this.onLeftIconButtonTouchTap }
          />
          <div className="pad">
              <Markdown source={ markdown } />
              <div className="pad">
                  <div className="hint">it took <span>{ took }</span> ms to load this page</div>
                  <div className="hint mart">
                      <a href={ url } target="_BLANK">
                          { url }
                      </a>
                  </div>
              </div>
          </div>
      </div>
      );
  }
}

Article.displayName = 'Article';
Article.propTypes = {};
Article.defaultProps = {};

export default Article;
