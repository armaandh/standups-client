import React, { Component } from 'react'
import Member from './../components/Member'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, { withMobileDialog } from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'

class MembersList extends Component{
    state = {
        addMemberDialogOpen: false,
        memberNameField: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    render(){
        const { members, classes } = this.props

        return(
            <Grid container className={classes.membersList}>
                <Grid item xs={12}>
                    <Button className={classes.button} onClick={() => this.setState({ addMemberDialogOpen: true })}>
                        add member
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {members.map(m => <Member member={m} key={m.id} />)}
                </Grid>
                <Dialog
                        fullScreen
                        open={this.state.addMemberDialogOpen}
                        onClose={() => this.setState({ addMemberDialogOpen: false })}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                            <IconButton color="inherit" onClick={() => this.setState({ addMemberDialogOpen: false })} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Add New Member
                            </Typography>
                            <Button color="inherit" onClick={() => this.setState({ addMemberDialogOpen: false })}>
                                save
                            </Button>
                            </Toolbar>
                        </AppBar>
                            <div className={classes.addMemberContent}>
                                <TextField
                                    id="team-name"
                                    label="Member's name"
                                    className={classes.textField}
                                    type="text"
                                    margin="normal"
                                    onChange={this.handleChange('memberNameField')}
                                />
                            </div>
                </Dialog>
            </Grid>
        )
    }
}

const styles = theme => ({
    membersList:{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start'
    },
    addMemberContent:{
        display: 'flex',
        flex: '1 1 auto',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    appBar: {
        position: 'relative',
        backgroundColor: '#FFD54F',
        color: '#795548'
      },
    flex: {
        flex: 1,
    },
    button: {
        margin: theme.spacing.unit,
        borderRadius: 4,
        backgroundColor: '#fcac3c',
        color: 'white',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#ffc472'
        },
    }
});

export default withMobileDialog()(withStyles(styles)(MembersList))