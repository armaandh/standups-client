import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { InputAdornment } from 'material-ui/Input';
import LockOutline from '@material-ui/icons/LockOutline';
import AssignmentInd from '@material-ui/icons/AssignmentInd';

import { Auth } from 'aws-amplify';

class Registration extends Component{
    constructor(props){
        super(props)

        this.submitRegistration = this.submitRegistration.bind(this)
    }

    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    submitRegistration() {
        const { email, password, confirmPassword } = this.state
        console.log(`Email: ${this.state.email} P1: ${this.state.password} P2: ${this.state.confirmPassword}`)
        
        Auth.signUp({
            username: email,
            password: password,
            confirmPassword: confirmPassword,
            attributes: {
            },
            validationData: []  //optional
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    
        //console.log(code)
        // Auth.confirmSignUp('edgar.zapeka@gmail.com', '990722')
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Paper elevation={2} className={classes.registrationContainer}>
                    <Typography variant='headline'>Sign Up Account</Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            id="email"
                            label="Email"
                            defaultValue=""
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange('email')}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AssignmentInd />
                                  </InputAdornment>
                                ),
                              }}
                            
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleChange('password')}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOutline />
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleChange('confirmPassword')}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOutline />
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <Button color="primary" className={classes.button} onClick={this.submitRegistration}>
                            Sign up
                        </Button>
                    </form>
                    <div className={classes.link}>
                        <Link to="/forgotpassword" className={classes.linkmargin}>
                            Forgot Password?
                        </Link>
                        <Link to="/login" >
                            Sign in
                        </Link>
                    </div>      
                </Paper>
            </Grid>
        )
    }
}

const styles = theme => ({
    root:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    registrationContainer:{
        padding: '16px',
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 240,
    },
    link: {
      color: '#448AFF', 
    },
    linkmargin: {
        marginRight: '60px'
    }
});
  
export default withStyles(styles)(Registration)