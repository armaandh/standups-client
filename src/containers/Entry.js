import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

import Login from './../components/Login'
import Registration from './../components/Registration'
import ForgotPassword from './../components/ForgotPassword'
import ResetPassword from './../components/ResetPassword';

import Hootsuite_logo from './../images/252px-Hootsuite_logo.svg.png'
import ConfirmRegistration from '../components/ConfirmRegistration';

class Entry extends Component {
  // constructor(props){
  //   super(props)

  //   this.submitLogin = this.submitLogin.bind(this)
  // }

  // submitLogin(email, password){
  //   //const { email, password } = this.state
  //   //console.log(`Email: ${this.state.email} P: ${this.state.password} `)

  //   return Auth.signIn(email, password)
  //       .then(user => ({user: user}))
  //       .catch(err => ({error: err}))
  // }

  render() {
    const { classes } = this.props
    
    return(
      <div>
        <Grid container spacing={0} className={classes.root}>
          <div>
            <img src={Hootsuite_logo} alt="hootsuite_logo"/><br/><br/>
          </div>
          {/* <BrowserRouter> */}
          <Switch>
            <Route path="/login" component={Login}/>
            {/* <Login submitLogin={this.submitLogin} history= {history}/>
             */}
            <Route path="/registration" component={Registration} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/resetpassword" component={ResetPassword} />
            <Route path="/confirmregistration" component={ConfirmRegistration} />
            <Route path="/" component={Login} />
          </Switch>
          {/* </BrowserRouter> */}
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  root:{
    display: 'flex',
    height: '100%',
    padding: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#FFD54F',
  }
});

export default withStyles(styles)(Entry)