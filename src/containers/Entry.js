import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Route, Switch } from 'react-router-dom'

import Login from './../components/Login'
import Registration from './../components/Registration'
import Welcome from './../components/Welcome'
import ForgotPassword from './../components/ForgotPassword'
import ResetPassword from './../components/ResetPassword';

class Entry extends Component {
  render() {
    const { classes } = this.props
    
    return(
      <div>
        <Grid container spacing={0} className={classes.root}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/resetpassword" component={ResetPassword} />
          <Route path="/" component={Welcome} />
        </Switch>
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
  },
});

export default withStyles(styles)(Entry)