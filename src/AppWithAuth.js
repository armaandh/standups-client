import React, { Component, Fragment } from 'react'
import App from './App'

class AppWithAuth extends Component {
  render(){
    return (
      <Fragment>
          <App />
      </Fragment>
    );
  }
}

export default AppWithAuth;
