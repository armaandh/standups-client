import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton';
import { InputAdornment } from 'material-ui/Input';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText } from 'material-ui/Dialog'
import LockOutline from '@material-ui/icons/LockOutline'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { validateEmail, validatePassword } from './../utils/functions';

import { Auth } from 'aws-amplify'

class Login extends Component{
    constructor(props){
        super(props)

        this.submitLogin = this.submitLogin.bind(this)
    }

    state = {
        email: '',
        password: '',
        invalidUser: false,
        showPassword: false,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleClose = () => {
        this.setState({ 
            invalidUser: false,
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

    submitLogin = () => {
        const { email, password } = this.state
        console.log(`Email: ${this.state.email} P: ${this.state.password} `)

        Auth.signIn(email, password)
             .then(user => {
                this.props.history.push("/home");
            })
            .catch(err => 
                this.setState({
                    invalidUser: true,
                }),
            )
    }

    render(){
        const { email, password } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
    
        return (
            <div className={classes.root}>
             <Grid container spacing={0} className={classes.root}>
                <Paper elevation={2} className={classes.loginContainer}>
                    <Typography variant='headline' className={classes.headline}>Sign In</Typography>
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
                                    <AccountCircle />
                                    </InputAdornment>
                                ),
                                }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            value={password || ''}
                            type={this.state.showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
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
                        <Button color="primary" disabled={!(isEmailValid && isPasswordValid)} className={classes.button} onClick={this.submitLogin}>
                            Sign in
                        </Button>
                    </form>

                    <div className={classes.link}>
                        <Link to="/forgotpassword" className={classes.linkmargin}>
                        Forgot Password?
                        </Link>
                        <Link to="/registration" >
                        Sign Up
                        </Link>
                    </div>
                </Paper>
                <Dialog
                    open={this.state.invalidUser}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Invalid login credentials.
                        Please try again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Close
                        </Button>
                    </DialogActions>
                </Dialog>       
            </Grid>
            </div>
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
        flexDirection: 'column',
    },
    loginContainer: {
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
        marginRight: '70px'
    },
    headline: {
        textAlign: 'center',
        fontSize: '2rem'
    },
});
  
export default withStyles(styles)(Login)