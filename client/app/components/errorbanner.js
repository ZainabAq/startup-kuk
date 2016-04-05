import React from 'react';
import {hideElement} from '../util';

export default class ErrorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      errors: ""
    };

    // ASSUMPTION: There is only one ErrorBanner component ever created.
    // By assigning to 'window', this is a global function. Global functions
    // are not typically a good idea, but they can be useful for adding basic
    // error handling to an application
    window.FacebookError = (errorText) => {
      this.setState({
        active: true,
        error: errorText
      })
    };
  }

  render() {
    return (
      <div className={"alert alert-warning " + hideElement(!this.state.active)} role="alert">
        Facebook was unable to complete a recent request: {this.state.error}<br />
        Please <a onClick={() => window.location.reload()}>refresh the web page</a> and try again.
      </div>
    );
  }
}
