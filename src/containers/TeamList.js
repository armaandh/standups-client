import React, { Component } from 'react'
import Team from './../components/Team'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dialog, { 
    withMobileDialog, 
    DialogActions,
    DialogContent,
    DialogTitle } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

import { API_GATEWAY_NAME } from './../utils/amazonConfig'
import { API } from 'aws-amplify'

class TeamList extends Component{

    state={
        addTeamDialogOpen: false,
        teamNameField: '',
        activeStep: 0,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    submitNewTeam = () => {
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
                            console.log('About to add ', params)
                            API.post(API_GATEWAY_NAME, 'addchildteam',params)
                                .then(response => { 
                                    this.setState({ 
                                        addTeamDialogOpen: false, 
                                        teamNameField: ''
                                    })
                                    console.log('Successfully added child team')
                                    this.props.refetchTeamData('New team is successfully attached.')
                                })
                                .catch(err => console.log('Error in adding child team', err))
                        }else{
                            this.props.refetchTeamData('New team is successfully added.')
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
                    console.log('About to add ', params)
                    API.post(API_GATEWAY_NAME, 'addchildteam',params)
                        .then(response => { 
                            this.setState({ 
                                addTeamDialogOpen: false, 
                                teamNameField: ''
                            })
                            console.log('Successfully added child team')
                        })
                        .catch(err => console.log('Error adding child team', err))
                        .then(()  => this.props.refetchTeamData('The team is successfully attached.'))
                } 
            })
            .catch(error => console.log('Error from gateway', error))
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
                {this.props.team !== null &&
                    <Typography className={classes.heading}>
                        Subteams
                        <Button className={classes.button} onClick={() => this.setState({ addTeamDialogOpen: true })}>
                            Add Team
                        </Button>
                    </Typography>
                }
                <Grid item xs={12} className={classes.teams}>
                    {subTeams.length === 0 && 
                        <Typography variant="headline" className={classes.noTeams}>
                            No Teams
                        </Typography>
                    }
                    {subTeams.map(t => <Team team={t} key={t.teamid} refetchTeamData={refetchTeamData}/>)}
                </Grid>
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
                        <Button onClick={() => this.submitNewTeam()} className={classes.btn} autoFocus>
                        Save
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
        flexDirection: 'column',
        alignSelf: 'flex-start',
        padding: '0px'
    },
    button: {
        marginLeft: 20,
        marginBottom: 1,
        borderRadius: 20,
        backgroundColor: '#21a2ff',
        color: '#ffffff',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#84cbff',
        },
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    heading: {
        fontSize: '1.6rem',
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#37474F',
        color: '#ffffff',
        paddingLeft: '14px'
    },
    teams: {
        textAlign: 'left',
    },
    noTeams: {
        display: 'flex',
        margin: '10px',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        fontSize: '1.3rem',
        paddingLeft: '6px'
    },
    btn: {
        color: '#21a2ff',
    }
}); 

export default withMobileDialog()(withStyles(styles)(TeamList))