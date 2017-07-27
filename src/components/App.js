require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Article from './Article';
import Search from './Search';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route } from 'react-router-dom'
import history from '../history'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class AppComponent extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
        <MuiThemeProvider>
          <Router history={history}>
            <div className="page-view">
              <Route exact path="/" component={Search} />
              <Route exact path="/article/:name" component={Article} />
            </div>
          </Router>
        </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
