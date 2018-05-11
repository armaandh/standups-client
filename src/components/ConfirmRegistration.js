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
  } from 'material-ui/Dialog'

import { validateEmail, validateCode } from './../utils/functions';

import { Auth } from 'aws-amplify'

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
            email: '',
            code: ''
         });
    };

    confirmRegistration() {
        const { email, code } = this.state
        console.log(`Email: ${this.state.email} Code: ${this.state.code}`)
    
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
        const { email, code } = this.state 
        const { classes } = this.props
        const isEmailValid = validateEmail(email)
        const isCodeValid = validateCode(code)

        return (
            <Grid container spacing={0} className={classes.root}>
                <Paper elevation={2} className={classes.registrationContainer}>
                    <Typography variant='headline' className={classes.headline}>Confirm Sign Up</Typography>
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
                            id="code"
                            label="Code"
                            className={classes.textField}
                            value={code}
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
                    <div className={classes.link}>
                        <Link to="/forgotpassword" className={classes.linkmargin}>Resend Code</Link>
                        <Link to="/login">
                            Back to Sign In
                        </Link>
                    </div>
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
        // margin: theme.spacing.unit,
        width: '50%',
        margin: '8px auto',
        borderRadius: '30px',
        color: '#21a2ff'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 260,
    },
    link: {
        color: '#448AFF',
        marginTop: '10px'  
    },
    linkmargin: {
        marginLeft: '10px',
        marginRight: '55px'
    },
    headline: {
        textAlign: 'center',
        fontSize: '2rem'
    },
});

export default withStyles(styles)(ConfirmRegistration)