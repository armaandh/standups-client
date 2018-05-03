import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { InputAdornment } from 'material-ui/Input';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
  } from 'material-ui/Dialog';

import { validateEmail, validatePassword } from './../utils/functions';

class Login extends Component{
    constructor(props){
        super(props)

        this.submitLogin = this.submitLogin.bind(this)
    }

    state = {
        email: '',
        password: '',
        invalidUser: false,
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

    submitLogin = () => {
        this.props.submitLogin(this.state.email, this.state.password).then(data => {
            if (!data.error){
                console.log('****** ', this.props.history)
            }else{
                this.setState({
                    invalidUser: true,
                })   
            }  
        })
    }

    render(){
        const { email, password } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
    
        return (
        <Grid container spacing={0} className={classes.root}>
            <Paper elevation={2} className={classes.loginContainer}>
                <Typography variant='headline'>Sign In Account</Typography>
                <form className={classes.form} noValidate autoComplete="off">
                    <TextField
                        id="email"
                        label="Email"
                        value={email}
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
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        onChange={this.handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            ),
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
                    Sign up
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
    loginContainer:{
        padding: '36px',
    },
    button: {
        // margin: theme.spacing.unit,
        color: 'white',
        margin: '20px auto',
        width: '40%',
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
  
export default withStyles(styles)(Login)