require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Article from './Article';
import Search from './Search';
import AppActions from '../actions/AppActions'
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class AppComponent extends React.Component {

  constructor() {
    super();
    this.state = { page: 'search' };
  }

  componentWillMount() {
    AppActions.on('OPEN_ARTICLE', article => {
      this.setState({
        page: 'article',
        articleName: article.name
      });
    });

    AppActions.on('OPEN_SEARCH', () => {
      this.setState({
        page: 'search',
        articleName: null
      });
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="page-view ">
          {this.renderPage()}
        </div>
      </MuiThemeProvider>
    );
  }

  renderPage() {
    switch(this.state.page) {
      case 'search':  return <Search></Search>
      case 'article':  return <Article name={this.state.articleName}></Article>
      default: throw 'Unknown page: "${this.state.page}';
    }
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
