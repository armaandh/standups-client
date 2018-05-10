import React, { Component } from 'react'
import Team from './../components/Team'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dialog, { withMobileDialog, 
    DialogActions,
    DialogContent,
    DialogTitle } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from 'material-ui/IconButton'
import Snackbar from 'material-ui/Snackbar';

class TeamList extends Component{

    state={
        addTeamDialogOpen: false,
        teamNameField: '',
        activeStep: 0,
        open: false,
        addMemberDialogOpen: false,
        openMember: false,
        memberNameField: '',

        teamOpen: false,
        addTeam: false,
        memberOpen: false,
        addMember: false,

    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false, openMember: false });
    };
    
    handleClickClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
    this.setState({ teamOpen: false, memberOpen: false });
    };

    render(){
        const { classes, subTeams, refetchTeamData } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} className={classes.actionBlock}>
                    <Button className={classes.button} onClick={() => this.setState({ addTeam: true })}>
                        Add Team
                    </Button>
                    {window.location.pathname !== '/home' &&
                    <Button className={classes.button} onClick={() => this.setState({ addMember: true })}>
                    Add Member
                    </Button>
                    }
                    
                </Grid>
                {window.location.pathname === '/home' &&
                    <Typography className={classes.heading}>Teams</Typography>
                }

                {new RegExp("\/team\/[0-9]+").test(window.location.pathname) &&
                    <Typography className={classes.heading}>Subteams</Typography>
                }
                {subTeams.length === 0 && 
                    <Typography variant="headline" className={classes.noTeams}>
                        No Teams
                    </Typography>
                }
                {subTeams.map(t => <Team team={t} key={t.id} refetchTeamData={refetchTeamData}/>)}
                <Dialog
                    open={this.state.addTeam}
                    onClose={() => this.setState({ addTeam: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Add a new team"}</DialogTitle>
                    <DialogContent>
                    <TextField
                        id="team-name"
                        label="Team Name"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        onChange={this.handleChange('teamNameField')}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ addTeam: false })} color="secondary">
                        Cancel
                        </Button>
                        <Button onClick={() => this.setState({ addTeam: false, teamOpen: true })} className={classes.btn} autoFocus>
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.addMember}
                    onClose={() => this.setState({ addMember: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Add a new member"}</DialogTitle>
                    <DialogContent>
                    <TextField
                        id="member-name"
                        label="Member Name"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        onChange={this.handleChange('memberNameField')}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ addMember: false })} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.setState({ addMember: false, memberOpen: true })} className={classes.btn} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.teamOpen}
                    autoHideDuration={3000}
                    onClose={this.handleClickClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">New team is added.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClickClose}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.memberOpen}
                    autoHideDuration={3000}
                    onClose={this.handleClickClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">New member is added to the team.</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClickClose}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </Grid>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        padding: '0px'
    },
    button: {
        margin: theme.spacing.unit,
        borderRadius: 4,
        backgroundColor: '#fcac3c',
        borderRadius: '20px',
        color: 'white',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#ffc472'
        },
    },
    actionBlock: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '16px',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    mobileStepper: {
        background: 'white'
    },
    heading: {
        fontSize: '2rem',
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#fcac3c',
        color: 'white',
        paddingLeft: '20px'
    },
    noTeams: {
        display: 'flex',
        margin: '10px',
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    btn: {
        color: '#21a2ff',
    }
}); 

export default withMobileDialog()(withStyles(styles)(TeamList))