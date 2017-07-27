'use strict';

import React from 'react';
import { connect } from 'react-redux';
import WikiActions from '../actions.wiki'
import Markdown from 'react-remarkable'

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';


@connect(({ wiki }) => {
  return {
    name: wiki.name,
    markdown: wiki.markdown,
    isLoading: !!wiki.isLoading,
    isComplete: !!wiki.isComplete,
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

  openOriginalPage(event) {
    event.preventDefault();
    WikiActions.openOriginalPage(this.props.name);
  }

  openSearch(event) {
    event.preventDefault();
    WikiActions.openSearch();
  }

  render() {
    const { isComplete, isLoading, markdown, name, took, url, errorMessage } = this.props;

    if (!isComplete) return null;
    if (isLoading) return <center>Loading ...</center>;
    if (errorMessage) return <center><i>{errorMessage}</i></center>;
    
    return (
      <div className="article-page">
        <AppBar
            title={name}
            iconElementRight={<IconButton><NavigationClose /></IconButton>}
            onRightIconButtonTouchTap={this.openSearch.bind(this)}
            iconElementLeft={<IconButton><OpenInNew /></IconButton>}
            onLeftIconButtonTouchTap={this.openOriginalPage.bind(this)}
            />
        <div className="pad">
          <Markdown source={markdown} />
          <div className="pad">
            <div className="hint">it took {took} ms to load this page</div>
            <div className="hint mart"><a href={url} target="_BLANK">{url}</a></div>
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
