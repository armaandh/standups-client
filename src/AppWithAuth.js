// import { Authenticator } from 'aws-amplify-react'
import App from './App'
import React, { Component, Fragment } from 'react'
// import Instagram from './utils/theme'

// import { Route } from 'react-router-dom'
// import Login from './components/Login'
// import Registration from './components/Registration'
// import Home from './components/Home'
// import TeamView from './components/TeamView'
// import Main from './components/Main'

// import { withAuthenticator } from 'aws-amplify-react';

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

// export default withAuthenticator(AppWithAuth, false);
export default AppWithAuth;
