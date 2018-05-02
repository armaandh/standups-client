import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { InputAdornment } from 'material-ui/Input';
import LockOutline from '@material-ui/icons/LockOutline';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
  } from 'material-ui/Dialog';

import { validateEmail, validatePassword } from './../utils/functions';

import { Auth } from 'aws-amplify';

class Registration extends Component{
    constructor(props){
        super(props)

        this.submitRegistration = this.submitRegistration.bind(this)
    }

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        userExists: false,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleClose = () => {
        this.setState({ userExists: false });
    };

    // handlePasswordComparison = () => {
    //     if(this.state.password.value !== this.state.confirmPassword.value){
    //         console.log('passwords do not match');
    //     }
    // };

    submitRegistration() {
        const { email, password, confirmPassword } = this.state
        console.log(`Email: ${this.state.email} P1: ${this.state.password} P2: ${this.state.confirmPassword}`)
        
        Auth.signUp({
            username: email,
            password: password,
            confirmPassword: confirmPassword,
        })
            .then(data => {
                this.props.history.push("/confirmregistration");
            })
            .catch(err => 
                this.setState({
                userExists: true
                })
            );
    }

    render() {
        const { email, password, userExists } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        console.log(isEmailValid && isPasswordValid)

        if(!userExists){
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
                                helperText="Password must contain at least 8 characters including 1 number, 1 uppercase and lowercase letter, and 1 Special Character"
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
                                // onKeyUp={this.handlePasswordComparison}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutline />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            
                            <Button color="primary" disabled={!(isEmailValid && isPasswordValid)} className={classes.button} onClick={this.submitRegistration}>
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

        }else{
            return(
                <Grid container spacing={0} className={classes.root}>
                <Dialog
                    open={this.state.userExists}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        User already exists in the system.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Close
                        </Button>
                    </DialogActions>
                </Dialog>
                </Grid>
            )
        }
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
        padding: '36px',
    },
    button: {
        color: 'white',
        margin: '20px auto',
        width: '40%',
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 260,
    },
    link: {
      color: '#448AFF',
      marginTop: '10px', 
    },
    linkmargin: {
        marginLeft: '10px',
        marginRight: '70px'
    }
});
  
export default withStyles(styles)(Registration)