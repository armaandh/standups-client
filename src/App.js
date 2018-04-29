import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Registration from './components/Registration'
import Home from './components/Home'
import TeamView from './components/TeamView'
import Main from './components/Main'

import { Link, Route } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import HomeIcon from '@material-ui/icons/Home'
import amber from 'material-ui/colors/amber';

import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

import Amplify, { Storage } from 'aws-amplify'
import { configuration } from './utils/amazonConfig'
Amplify.configure(configuration)


class App extends Component {
  constructor(props){
    super(props)
  }

  signOut = () => {
    Auth.signOut()
      .then(data => 
        {
          console.log(data)
          window.location.reload()
        })
      .catch(err => console.log(err));
  }

  render() {

    const { classes } = this.props

    return (
      <div className="App">
        <header>
          <div className={classes.root}>
          <MuiThemeProvider theme={theme1}>
            <AppBar position="static">
              <Toolbar className={classes.font}>
                <div className={classes.leftMenu}>
                  <Link to="/">
                    <Button color="inherit"><HomeIcon style={{ fontSize: 36 }}/></Button>
                  </Link>
                </div>
                {false && 
                (
                  <div>
                    <Link to="/login">
                      <Button color="inherit">Login</Button>
                    </Link>
                    <Link to="/registration">
                      <Button color="inherit">Registration</Button>
                    </Link>
                  </div>
                )
                }
                <Link to="#" onClick={this.signOut}>
                  <Button color="inherit">Logout</Button>
                </Link>
                <img src={require('./images/Hootsuite_logo.svg.png')} />
              </Toolbar>
            </AppBar>
          </MuiThemeProvider>
          </div>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/main" component={Main} />
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
  font:{
      color: '#795548'
  }
};

const theme1 = createMuiTheme({
  palette: {
    primary: {
      light: amber[300],
      main: '#FFD54F',
      
    },
  }
});

export default withAuthenticator(withStyles(styles)(App), false);
