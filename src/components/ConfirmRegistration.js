import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { InputAdornment } from 'material-ui/Input';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Lock from '@material-ui/icons/Lock';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
  } from 'material-ui/Dialog';

import { validateEmail, validateCode } from './../utils/functions';

import { Auth } from 'aws-amplify';

class ConfirmRegistration extends Component{
    constructor(props){
        super(props)

        this.confirmRegistration = this.confirmRegistration.bind(this)
    }

    state = {
        email: '',
        code: '',
        invalidConfirmation: false,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleClose = () => {
        this.setState({ 
            invalidConfirmation: false,
         });
    };

    confirmRegistration() {
        const { email, code } = this.state
        console.log(`Email: ${this.state.email} Code: ${this.state.code}`)
    
        //console.log(code)
        Auth.confirmSignUp(email, code)
            .then(data => {
                this.props.history.push("/login");
            })
            .catch(err => 
                this.setState({
                    invalidConfirmation: true
                })
            );
    }

    render() {
        const { email, code, invalidConfirmation } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)
        const isCodeValid = validateCode(code)

        if(!invalidConfirmation){
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Paper elevation={2} className={classes.registrationContainer}>
                        <Typography variant='headline'>Confirm Sign Up</Typography>
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
                                id="code"
                                label="Code"
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
                            <Button color="primary" disabled={!(isEmailValid && isCodeValid)} className={classes.button} onClick={this.confirmRegistration}>
                                Confirm
                            </Button>
         
                        </form>
                            <Link to="/forgotpassword" className={classes.linkmargin}>Resend Code</Link>
                    </Paper>
                </Grid>
            )
        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Paper elevation={2} className={classes.registrationContainer}>
                        <Typography variant='headline'>Confirm Sign Up</Typography>
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
                                id="code"
                                label="Code"
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
                            <Button color="primary" disabled={!(isEmailValid && isCodeValid)} className={classes.button} onClick={this.confirmRegistration}>
                                Confirm
                            </Button>
         
                        </form>
                            <Link to="/forgotpassword" className={classes.linkmargin}>Resend Code</Link>
                    </Paper>
                    <Dialog
                        open={this.state.invalidConfirmation}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Invalid confirmation credentials. Please try again.
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
    linkmargin: {
        marginLeft: '10px',
        color: '#448AFF',
    }
});

export default withStyles(styles)(ConfirmRegistration)