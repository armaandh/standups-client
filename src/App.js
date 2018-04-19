import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/Home'

import { Link, Route } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
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
                <div className={classes.leftMenu}>
                  <Link to="/">
                    <Button color="inherit">Home</Button>
                  </Link>
                </div>
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
          <Route exact path="/" component={Home} />
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
  leftMenu: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default withStyles(styles)(App);
