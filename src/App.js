import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home'
import TeamView from './containers/TeamView'
import Entry from './containers/Entry'
import GitHub_logo from './images/GitHub-Mark-32px.png'

import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import HomeIcon from '@material-ui/icons/Home'

import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify'
import { configuration } from './utils/amazonConfig'
import UserContent from './containers/UserContent'
Amplify.configure(configuration)

class App extends Component {

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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1 user-scalable=no"/>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
        <header>
          <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
              <Toolbar className={classes.font}>
                <div className={classes.leftMenu}>
                  <Link to="/home">
                    <Button color="inherit" className={classes.menu}><HomeIcon style={{ fontSize: 36 }}/>Standups App</Button>
                  </Link>
                </div>
                <Link to="#" onClick={this.signOut} className={classes.menu}>
                  <Button color="inherit">Logout</Button>
                </Link>
              </Toolbar>
            </AppBar>
          </div>
        </header>
        <main>
          <Fragment>
            <Route path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route path="/team/:id" component={TeamView} />
            <Route exact path="/usercontent/:username" component={UserContent} />
          </Fragment>
        </main>
        <footer>
          <div>
            <ul>
              <li>&copy; 2018 Hootsuite Project</li>
              <li><a href="https://github.com/armaandh/standups-client"><img src={GitHub_logo} alt="GitHub_logo" className={classes.logo}/></a></li>
              <li>Made with <span style={{color: '#e25555'}}>&hearts;</span></li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

const styles = {
  overrides: { root: {
    flexGrow: 1,
    }
  },
  leftMenu: {
    display: 'flex',
    flex: 1,
    borderRadius: '20px'
  },
  font: {
    color: '#ffffff',
    paddingLeft: '10px',
    paddingRight: '10px'
  }, 
  logo: {
    width: '1.4rem'
  },
  navbar: {
    backgroundColor: '#37474F',
  },
  menu: {
    '&:hover': {
      backgroundColor: '#4c6675',
      borderRadius: '20px'
      },
    '&:active': {
      backgroundColor: '#557382',
      borderRadius: '20px'
    },
  }
};

export default withAuthenticator(withStyles(styles)(App), false, [<Entry />]);
