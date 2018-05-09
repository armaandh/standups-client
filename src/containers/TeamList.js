import React, { Component } from 'react'
import Team from './../components/Team'
import classNames from 'classnames'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dialog, { withMobileDialog, 
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
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
                    <Button className={classes.button} onClick={() => this.setState({ addMember: true })}>
                        Add Member
                    </Button>


                    {/* <Button className={classes.button} onClick={() => this.setState({ addTeamDialogOpen: true })}>
                        add team
                    </Button>
                    <div><br/></div>
                    <Button className={classes.button} onClick={() => this.setState({ addMemberDialogOpen: true })}>
                        add member
                    </Button> */}
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
                {/* <Dialog
                        fullScreen
                        open={this.state.addTeamDialogOpen}
                        onClose={() => this.setState({ addTeamDialogOpen: false })}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                            <IconButton color="inherit" onClick={() => this.setState({ addTeamDialogOpen: false })} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Add New Team
                            </Typography>
                            <Button color="inherit" onClick={() => this.setState({ addTeamDialogOpen: false, open: true })}>
                                save
                            </Button>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.addTeamContent}>
                        <TextField
                            id="team-name"
                            label="Team Name"
                            className={classes.textField}
                            type="text"
                            margin="normal"
                            onChange={this.handleChange('teamNameField')}
                        />
                        </div>
                </Dialog>
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
                            <Button color="inherit" onClick={() => this.setState({ addMemberDialogOpen: false, openMember: true })}>
                                save
                            </Button>
                            </Toolbar>
                        </AppBar>
                            <div className={classes.addMemberContent}>
                                <TextField
                                    id="member-name"
                                    label="Member's name"
                                    className={classes.textField}
                                    type="text"
                                    margin="normal"
                                    onChange={this.handleChange('memberNameField')}
                                />
                            </div>
                </Dialog> */}
                {/* <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
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
                            onClick={this.handleClose}
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
                        open={this.state.openMember}
                        autoHideDuration={3000}
                        onClose={this.handleClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">New member is added.</span>}
                        action={[
                            
                            <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                            >
                            <CloseIcon />
                            </IconButton>,
                        ]}
                /> */}

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
                        <Button onClick={() => this.setState({ addTeam: false, teamOpen: true })} color="primary" autoFocus>
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
                        <Button onClick={() => this.setState({ addMember: false, memberOpen: true })} color="primary" autoFocus>
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
        // padding: '10px',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        padding: '0px'
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
    addTeamContent: {
        display: 'flex',
        flex: '1 1 auto',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appBar: {
        position: 'relative',
        backgroundColor: '#FFD54F',
        color: '#795548'
      },
    flex: {
        flex: 1,
    },
    addMemberContent: {
        display: 'flex',
        flex: '1 1 auto',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
}); 

export default withMobileDialog()(withStyles(styles)(TeamList))