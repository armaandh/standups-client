import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import { Auth } from 'aws-amplify';

class ConfirmRegistration extends Component{
    constructor(props){
        super(props)

        this.confirmRegistration = this.confirmRegistration.bind(this)
    }

    state = {
        email: '',
        code: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    confirmRegistration() {
        const { email, code } = this.state
        console.log(`Email: ${this.state.email} Code: ${this.state.code}`)
        /* Auth.signUp({
            username: email,
            password: password,
            attributes: {
            },
            validationData: []  //optional
        })
        .then(data => console.log(data))
        .catch(err => console.log(err)); */
    
        //console.log(code)
        Auth.confirmSignUp(email, code)
            .then(data => console.log(data))
            .catch(err => console.log(err));
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
                        />
                        <TextField
                            id="password"
                            label="Code"
                            className={classes.textField}
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleChange('password')}
                        />
                        <Button color="primary" className={classes.button} onClick={this.submitRegistration}>
                            Sign up
                        </Button>
     
                    </form>

                        <Button>Confirm</Button>
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
});

export default withStyles(styles)(ConfirmRegistration)