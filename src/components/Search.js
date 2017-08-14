'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import WikiActions from '../actions/wiki'
import AppActions from '../actions/app'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


const wikiLogoSrc = require('../images/wiki.png');
const RESULT_ITEM_LIMIT = 20;

@connect(({wiki, app}) => {
  return {
    articles: wiki.articles,
    took: wiki.took,
    isLoading: app.loading,
    isComplete: app.complete,
    errorMessage: app.errorMessage
  }
})
export default class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
  }

  onSearchResult({took, searchTerm, items}) {
    this.setState({
      took,
      searchTerm,
      results: items
    })
  }

  formSubmit(event) {
    event.preventDefault();
    this.searchForTerm();
  }

  searchForTerm() {
    if (this.state.searchTerm)
      WikiActions.searchFor(this.state.searchTerm, RESULT_ITEM_LIMIT);
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  openArticle(name, event) {
    event.preventDefault();
    AppActions.openArticle(name);
  }

  renderResult({name, description}) {
    return <ListItem key={ name } primaryText={ name } secondaryText={ description } onClick={ this.openArticle.bind(this, name) } />;
  }

  renderResults() {
    const {isComplete, isLoading, articles, took, errorMessage} = this.props;

    if (!isComplete) return null;
    if (isLoading) return <h3>Loading ...</h3>;
    if (errorMessage) return <h3>{ errorMessage }</h3>;
    if (!articles) return null;
    if (articles.length == 0) return <h3>No results</h3>

    return <List>
               <Subheader><span>{ articles.length }</span> article(s) found in <span>{ took }</span> ms</Subheader>
               { articles.map(this.renderResult.bind(this)) }
           </List>;
  }

  render() {
    return (
      <div className="search-page pad">
          <div className="row center-xs">
              <div className="col-sm-6 col-xs-8 pad-xl mart">
                  <img src={ wikiLogoSrc } />
              </div>
          </div>
          <form className="row middle-xs center-xs" onSubmit={ this.formSubmit.bind(this) }>
              <div className="col-xs-8 col-sm-6 pad">
                  <TextField fullWidth={ true } autoFocus hintText="Please enter a keyword ..." value={ this.state.searchTerm } onChange={ this.handleChange.bind(this) } />
              </div>
              <div className="col-xs-4 col-sm-2 pad">
                  <RaisedButton label="GO" fullWidth={ true } primary={ true } onClick={ this.searchForTerm.bind(this) } />
              </div>
          </form>
          { this.renderResults() }
      </div>
      );
  }
}

Search.displayName = 'Search';

// Uncomment properties you need
Search.propTypes = {
  searchTerm: PropTypes.string
};