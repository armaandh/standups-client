import React, { Component, Fragment } from 'react'
import App from './App'
// import { withAuthenticator } from 'aws-amplify-react';
// import { Authenticator } from 'aws-amplify-react'

class AppWithAuth extends Component {
  render(){
    return (
      <Fragment>
      {/* <Authenticator theme={Instagram} hideDefault={true}> */}
          <App />
      {/* </Authenticator> */}
      </Fragment>
    );
  }
}

export default AppWithAuth;
