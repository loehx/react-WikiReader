'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppActions from '../actions/AppActions'
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

const wikiLogoSrc = require('../images/wiki.png');
const RESULT_ITEM_LIMIT = 20;

class Search extends React.Component {

  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
  }

  componentWillMount() {
    AppActions.on('LOADING', (isLoading) => this.setState({ isLoading: isLoading }));
    AppActions.on('WIKI_SEARCH_RESULT', this.onSearchResult.bind(this));
    AppActions.on('ERROR', (error) => this.setState({ errorMessage: error }));
  }

  onSearchResult({ took, searchTerm, items }) {
      this.setState({
        took,
        searchTerm,
        results: items
      })
    }

  searchFor(event) {
    event.preventDefault();
    this.setState({
      errorMessage: null,
      isLoading: false,
      results: null,
      took: null
    });
    AppActions.searchFor(this.state.searchTerm, RESULT_ITEM_LIMIT);
  }

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  openArticle(articleInfo) {
    AppActions.openArticle(articleInfo);
  }

  renderResult(articleInfo) {
     return <ListItem
          key={articleInfo.name}
          primaryText={articleInfo.name}
          secondaryText={articleInfo.description}
          onClick={this.openArticle.bind(this, articleInfo)} />;
  }

  renderResults() {
    const { isLoading, results, errorMessage } = this.state;

    if (isLoading) return <center>Loading ...</center>;
    if (errorMessage) return <center><i>{errorMessage}</i></center>;
    if (!results) return null;
    if (results.length == 0) return <div>No results</div>

    return <List>
            <Subheader>{results.length} article(s) found in {this.state.took} ms</Subheader>
            {results.map(this.renderResult.bind(this))}
          </List>;
  }

  render() {
    return (
        <div className="search-page">

          <div className="row center-xs">
            <div className="col-xs-6 pad-xl mart">
              <img src={wikiLogoSrc} />
            </div>
          </div>

          <form className="row middle-xs center-xs" onSubmit={this.searchFor.bind(this)}>
            <div className="col-xs-10 col-md-6 pad">
              <TextField
                fullWidth={true}
                autoFocus
                hintText="Enter a keyword to look for ..."
                value={this.state.searchTerm}
                onChange={this.handleChange.bind(this)} />
            </div>

            <div className="col-xs-2 pad">
              <RaisedButton
                label="GO"
                fullWidth={true}
                primary={true}
                onClick={this.searchFor.bind(this)} />
            </div>
          </form>

          {this.renderResults()}

      </div>
    );
  }
}

Search.displayName = 'Search';

// Uncomment properties you need
Search.propTypes = {
  searchTerm: PropTypes.string
};

export default Search;
