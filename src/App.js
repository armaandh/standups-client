import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/Home'
import TeamView from './components/TeamView'

import { Link, Route } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import HomeIcon from '@material-ui/icons/Home'
import amber from 'material-ui/colors/amber';

class App extends Component {

  render() {

    const { classes } = this.props

    return (
      <div className="App">
        <header>
          <div className={classes.root}>
          <MuiThemeProvider theme={theme1}>
            <AppBar position="static">
              <Toolbar>
                <div className={classes.leftMenu}>
                  <Link to="/">
                    <Button color="inherit"><HomeIcon style={{ fontSize: 36 }}/></Button>
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
          </MuiThemeProvider>
          </div>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration} />
          <Route path="/team/:id" component={TeamView} />
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

const theme1 = createMuiTheme({
  palette: {
    primary: amber,
  }
});

export default withStyles(styles)(App);
