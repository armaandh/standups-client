import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

class Login extends Component{
    constructor(props){
        super(props)

        this.submitLogin = this.submitLogin.bind(this)
    }

    state = {
        email: '',
        password: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    submitLogin(){
        console.log(`Email: ${this.state.email} P: ${this.state.password} `)
    }

    render() {
        const { classes } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Paper elevation={2} className={classes.loginContainer}>
                    <Typography variant='headline'>Login</Typography>
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
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={this.handleChange('password')}
                        />
                        <Button color="primary" className={classes.button} onClick={this.submitLogin}>
                            Login
                        </Button>
                    </form>
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
    loginContainer:{
        padding: '16px',
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});
  

export default withStyles(styles)(Login)