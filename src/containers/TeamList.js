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
import Snackbar from 'material-ui/Snackbar'

import { API_GATEWAY_NAME } from './../utils/amazonConfig'
import { API } from 'aws-amplify'

class TeamList extends Component{

    state={
        addTeamDialogOpen: false,
        teamNameField: '',
        isTeamSuccessfullyAdded: false,
        activeStep: 0,
        open: false,
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
        this.setState({ isTeamSuccessfullyAdded: false});
    }

    submitNewTeam = () => {

        // My Huge appologies. I know It's extremely ugly, but I have no time to optimise it
        // Also I'm a little bit drunk (pretty much extually) so I don't even bother :)
        let params = {
            body: {
                teamname: this.state.teamNameField
            }, 
            headers: {} 
        }

        API.post(API_GATEWAY_NAME, 'teaminfo',  {
                headers: {},
                body: {teamid: 'ROOT'}
            })
            .then(response => {
                let result = response.subteams.filter(t => t.name === this.state.teamNameField)
                console.log('************', result)
                if (result.length === 0){
                    API.post(API_GATEWAY_NAME, 'createteam', params).then(response => {
                        console.log('New Team Added: ', response)
                        if (this.props.team !== null){
                            let params = {
                                body: {
                                    parentid: this.props.team.id,
                                    teamid: response.teamid
                                },
                                headers: {}
                            }
                            console.log('Im goin to add ', params)
                            API.post(API_GATEWAY_NAME, 'addchildteam',params)
                                .then(response => {this.props.refetchTeamData(); console.log('Success for add child team')})
                                .catch(err => console.log('Error adding child team', err))
                        }
                    }).catch(error => {
                        console.log('New Team Error: ', error.response)
                    })
                }else{
                    let params = {
                        body: {
                            parentid: this.props.team.id,
                            teamid: result[0].teamid
                        },
                        headers: {}
                    }
                    console.log('Im goin to add ', params)
                    API.post(API_GATEWAY_NAME, 'addchildteam',params)
                        .then(response => {this.props.refetchTeamData(); console.log('Success for add child team')})
                        .catch(err => console.log('Error adding child team', err))
                }
                console.log('TEAM from API Gateway: ' + response.subteams);
                this.setState({teams: response.subteams, isDataFetched: true})
            })
            .catch(error => console.log('Error from gateway', error))
            .then(() =>  {
                this.props.refetchTeamData()
                this.setState({ addTeamDialogOpen: false, isTeamSuccessfullyAdded: true, teamNameField: ''})
            }) 
    }

    render(){
        const { classes, subTeams, refetchTeamData } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                {(window.location.pathname === '/home' || window.location.pathname === '/')  &&
                    <Typography className={classes.heading}>
                        Teams
                        <Button className={classes.button} onClick={() => this.setState({ addTeamDialogOpen: true })}>
                            Add Team
                        </Button>
                    </Typography>
                }

                {new RegExp("\/team\/[0-9]+").test(window.location.pathname) &&
                    <Typography className={classes.heading}>
                        Subteams
                        <Button className={classes.button} onClick={() => this.setState({ addTeamDialogOpen: true })}>
                            Add Team
                        </Button>
                    </Typography>
                }
                {subTeams.length === 0 && 
                    <Typography variant="headline" className={classes.noTeams}>
                        No Teams
                    </Typography>
                }
                {subTeams.map(t => <Team team={t} key={t.teamid} refetchTeamData={refetchTeamData}/>)}
                <Dialog
                    open={this.state.addTeamDialogOpen}
                    onClose={() => this.setState({ addTeamDialogOpen: false })}
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
                        <Button onClick={() => this.setState({ addTeamDialogOpen: false })} color="secondary">
                        Cancel
                        </Button>
                        <Button onClick={() => this.submitNewTeam()} color="primary" autoFocus>
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.isTeamSuccessfullyAdded}
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
        backgroundColor: 'rgb(87, 71, 58)',
        color: '#ffc472',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#ffc472',
            color: 'rgb(87, 71, 58)'
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
}); 

export default withMobileDialog()(withStyles(styles)(TeamList))