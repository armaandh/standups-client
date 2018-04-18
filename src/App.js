import React, { Component } from 'react';
import './App.css';
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/Menu'

class App extends Component {

  render() {

    const { classes } = this.props

    return (
      <div className="App">
        <header>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Title
                </Typography>
                <Button color="inherit">Login</Button>
                <Button color="inherit">Registration</Button>
              </Toolbar>
            </AppBar>
          </div>
        </header>
        <main>
          <h1>The body</h1>
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
