import React, { Component } from 'react';
import './App.css';
import Login from './components/login'
import Registration from './components/registration'

import { Link, Route } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

class App extends Component {

  render() {

    const { classes } = this.props

    return (
      <div className="App">
        <header>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Title
                </Typography>
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
                <Link to="/registration">
                  <Button color="inherit">Registration</Button>
                </Link>
              </Toolbar>
            </AppBar>
          </div>
        </header>
        <main>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration} />
        </main>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default withStyles(styles)(App);
