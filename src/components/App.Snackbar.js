import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import AppActions from '../actions/app';

@connect(({app}) => {
  return {
    errorMessage: app.errorMessage || '',
    showError: !!app.errorMessage,
    showLoading: !!app.loading
  }
})
class SnackbarComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  handleActionTouchTap = () => {
    AppActions.hideError();
  };

  handleErrorRequestClose = () => {
    AppActions.hideError();
  };

  handleLoadingRequestClose = () => {
    // ignore
  };

  render() {
    return (
      <div>
          <Snackbar open={ this.props.showError } message={ this.props.errorMessage } action="OK" autoHideDuration={ 10000 } onActionTouchTap={ this.handleActionTouchTap } onRequestClose={ this.handleErrorRequestClose }
          />
          <Snackbar open={ this.props.showLoading } message="Loading ..." onRequestClose={ this.handleLoadingRequestClose } />
      </div>
      );
  }
}

SnackbarComponent.defaultProps = {
};

export default SnackbarComponent;
