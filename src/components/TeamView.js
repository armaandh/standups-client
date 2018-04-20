import React, { Component } from 'react'
import MembersList from './MembersList'
import TeamList from './TeamList'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { Typography } from 'material-ui'
import { CircularProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade'
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from 'material-ui/IconButton'

import { getTeam } from './../utils/api'

class TeamView extends Component{
    state = {
        isTeamFetched: false,
        team: {}
    }

    componentDidMount(){
        const myPromise = (time) => new Promise((resolve) => setTimeout(resolve, time))
        myPromise(2000).then(() => { 
            this.setState({
                team: getTeam(this.props.match.params.id),
                isTeamFetched: true
            })
        })
    }

    render(){
        const { team, isTeamFetched } = this.state 
        const { classes } = this.props

        if (isTeamFetched){
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Grid item xs={12} className={classes.teamHeader}>
                        <IconButton className={classes.button} aria-label="Delete" color="primary" onClick={() => this.props.history.goBack()}>
                            <ArrowBack />
                        </IconButton>
                        <Typography className={classes.teamTitle} variant="headline"> 
                            {team.name}
                        </Typography>
                    </Grid>
                    <TeamList team={team} subTeams={team.subteams}/>
                    <MembersList members={team.members} />
                </Grid>
            )
        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Fade
                        in={!isTeamFetched}
                        style={{
                            transitionDelay: !isTeamFetched ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
            </Grid>
            )
        }
    }
}

const styles = theme => ({
    root:{
        display: 'flex',
        height: '100%',
        padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamHeader:{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    teamTitle:{
        alignSelf: 'center',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

export default withStyles(styles)(TeamView)