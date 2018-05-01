import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Input from '@material-ui/icons/Input';
import Grid from 'material-ui/Grid'

import { Link } from 'react-router-dom'

class Welcome extends Component {
  render() {
    const { classes } = this.props
    
    return(
      <div>
        <Grid container spacing={0} className={classes.root}>
          <Card>
            <CardContent>
            <div><img src={require('../images/252px-Hootsuite_logo.svg.png')} alt="hootsuite_logo"/><br/><br/></div>
            <Link to="/login" className={classes.btn}>
            <Button
                variant="raised"
                color="primary"
                disableRipple
                className={classNames(classes.margin, classes.bootstrapRoot2)}
            >
            <Input className={classes.leftIcon}/>
                Sign In
            </Button>
            </Link>
            <br/>
            <Link to="/registration" className={classes.btn}>
            <Button
                variant="raised"
                color="primary"
                disableRipple
                className={classNames(classes.margin, classes.bootstrapRoot)}
            >
            <AssignmentInd className={classes.leftIcon}/>
                Sign Up
            </Button>
            </Link>

            <div className={classes.link}>
            <Link to="/forgotpassword">
            Forgot Password?
            </Link>
            </div>
            

            </CardContent>
          </Card>   
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
  btn:{
    display: 'block',
    textAlign: 'center',
  },
  bootstrapRoot: {
      boxShadow: 'none',
      textTransform: 'none',
      borderRadius: 4,
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  bootstrapRoot2: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: 4,
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#43A047',
    borderColor: '#43A047',
    '&:hover': {
      backgroundColor: '#388E3C',
      borderColor: '#388E3C',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#388E3C',
      borderColor: '#388E3C',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },  
  margin: {
      margin: theme.spacing.unit,
  },
  link: {
      color: '#448AFF',
      marginTop: '30px'  
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  
});

export default withStyles(styles)(Welcome)