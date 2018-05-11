import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { InputAdornment } from 'material-ui/Input'
import IconButton from 'material-ui/IconButton';
import LockOutline from '@material-ui/icons/LockOutline'
import AssignmentInd from '@material-ui/icons/AssignmentInd'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
        passwordsMatchErrorMessage: '',
        passwordFormatMessage: 'Password must contain at least 8 characters including 1 number, 1 uppercase and lowercase letter, and 1 special character',
        showPassword: false,
        showConfirmPassword: false,
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        const { password } = this.state
        if (name === 'password'){
            !validatePassword(event.target.value) 
                ? this.setState({ passwordFormatMessage: 'Password must contain at least 8 characters including 1 number, 1 uppercase and lowercase letter, and 1 special character'})
                : this.setState((nextState, props) => ({...nextState, passwordFormatMessage: ''}))
        }
        if(name === 'confirmPassword' && validatePassword(password)){
            password !== event.target.value 
                ? this.setState({ passwordsMatchErrorMessage: "Passwords do not match. "})
                : this.setState((nextState, props) => ({...nextState, passwordsMatchErrorMessage: ''})) 
                
        }
    }

    handleClose = () => {
        this.setState({ 
            userExists: false,
            email: '',
            password: ''
        });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleClickShowConfirmPassword = () => {
        this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
    };

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
        const { email, password, confirmPassword, passwordsMatchErrorMessage, passwordFormatMessage } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        const isConfirmPasswordValid = validatePassword(confirmPassword)

        return (
            <Grid container spacing={0} className={classes.root}>
                <Paper elevation={2} className={classes.registrationContainer}>
                    <Typography variant='headline' className={classes.headline}>Sign Up</Typography>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            id="email"
                            label="Email"
                            value={email.toLowerCase()}
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
                            type={this.state.showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            helperText={passwordFormatMessage}
                            margin="normal"
                            onChange={this.handleChange('password')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockOutline />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            className={classes.textField}
                            type={this.state.showConfirmPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleChange('confirmPassword')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <LockOutline />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowConfirmPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {passwordsMatchErrorMessage !== '' &&
                            <p className={classes.error}>{passwordsMatchErrorMessage}</p>
                        }
                        
                        <Button color="primary" disabled={!(isEmailValid && isPasswordValid && isConfirmPasswordValid && (passwordsMatchErrorMessage === ''))} className={classes.button} onClick={this.submitRegistration}>
                            Sign up
                        </Button>
                    </form>
                    <div className={classes.link}>
                        <Link to="/confirmregistration" className={classes.linkmargin}>
                            Confirm Registration
                        </Link>
                        <Link to="/login" >
                            Sign In
                        </Link>
                    </div>      
                </Paper>
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

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    registrationContainer: {
        padding: '36px',
        borderRadius: '20px'
    },
    button: {
        color: '#ffffff',
        margin: '20px auto',
        width: '40%',
        backgroundColor: '#21a2ff',
        borderColor: '#21a2ff',
        borderRadius: '30px',
        '&:hover': {
        backgroundColor: '#20b4f9',
        borderColor: '#20b4f9',
        },
        '&:active': {
        boxShadow: 'none',
        backgroundColor: '#20b4f9',
        borderColor: '#20b4f9',
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
        marginRight: '55px'
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '5px'
    },
    headline: {
        textAlign: 'center',
        fontSize: '2rem'
    }
});
  
export default withStyles(styles)(Registration)