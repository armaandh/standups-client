import { Authenticator } from 'aws-amplify-react'
import App from './App'
import React, { Component } from 'react'
import Instagram from './utils/theme'

class AppWithAuth extends Component {
  render(){
    return (
      <div>
      <Authenticator theme={Instagram} hideDefault={true}>
        <App />
      </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;
