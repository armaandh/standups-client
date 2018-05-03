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
import LockOutline from '@material-ui/icons/LockOutline';
import Lock from '@material-ui/icons/Lock';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
  } from 'material-ui/Dialog';

import { validateEmail, validatePassword, validateCode } from './../utils/functions';

import { Auth } from 'aws-amplify'

class ResetPassword extends Component{
    constructor(props){
        super(props)

        this.submitResetPassword = this.submitResetPassword.bind(this)
    }

    state = {
        code: '',
        email: '',
        new_password: '',
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
         });
    };

    submitResetPassword(){
        const { email, code, new_password } = this.state
        console.log(`Code: ${this.state.code} P: ${this.state.new_password}`)

        // Collect confirmation code and new password, then
        Auth.forgotPasswordSubmit(email, code, new_password)
            .then(data => 
              this.props.history.push('/login'))
            .catch(err => 
                this.setState({
                    invalidUser: true
                })
            );
    }

    render() {
        const { email, code, new_password, invalidUser } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(new_password)
        const isCodeValid = validateCode(code)

        if(!invalidUser){
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Paper elevation={2} className={classes.resetpasswordContainer}>
                        <Typography variant='headline'>Reset Your Password</Typography>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                id="email" // code
                                label="Email"
                                defaultValue=""
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
                                id="code" // code
                                label="Code"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange('code')}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <TextField
                                id="new_password"
                                label="New Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={this.handleChange('new_password')}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutline />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <Button color="primary" disabled={!(isEmailValid && isPasswordValid && isCodeValid)} className={classes.button} onClick={this.submitResetPassword}>
                                Submit
                            </Button>
                        </form>
                        <div className={classes.link}>
                            <Link to="/login" className={classes.linkmargin}>
                                Back to Sign in
                            </Link>
                            <Link to="/forgotpassword">
                                Resend Code
                            </Link>
                        </div> 
                    </Paper>
                </Grid>
            )

        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Paper elevation={2} className={classes.resetpasswordContainer}>
                        <Typography variant='headline'>Reset Your Password</Typography>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                id="email" // code
                                label="Email"
                                defaultValue=""
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
                                id="code" // code
                                label="Code"
                                defaultValue=""
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChange('code')}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <Lock />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <TextField
                                id="new_password"
                                label="New Password"
                                className={classes.textField}
                                type="password"
                                autoComplete="current-password"
                                margin="normal"
                                onChange={this.handleChange('new_password')}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LockOutline />
                                      </InputAdornment>
                                    ),
                                  }}
                            />
                            <Button color="primary" disabled={!(isEmailValid && isPasswordValid && isCodeValid)} className={classes.button} onClick={this.submitResetPassword}>
                                Submit
                            </Button>
                        </form>
                        <div className={classes.link}>
                            <Link to="/login" className={classes.linkmargin}>
                                Back to Sign in
                            </Link>
                            <Link to="/forgotpassword">
                                Resend Code
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
                            Invalid credentials. Please try again.
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
    resetpasswordContainer:{
        padding: '36px',
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 260,
    },
    link: {
      color: '#448AFF', 
    },
    linkmargin: {
        marginLeft: '10px',
        marginRight: '60px'
    }
});

export default withStyles(styles)(ResetPassword)