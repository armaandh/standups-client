import React, { Component } from 'react'
import { getAllTeams } from './../utils/api'
import TeamList from './../containers/TeamList'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade'
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { API } from 'aws-amplify'
import { API_GATEWAY_NAME } from './../utils/amazonConfig'
import { sortTeamsAlphabetically, generateSnackbarMessage } from './../utils/functions'

class Home extends Component{
    state = {
        isDataFetched: false,
        teams: [],
        snackBarOpen: false,
        snackbarText:''
    }

    componentDidMount(){
        let params = {
            headers: {},
            body: {teamid: 'ROOT'}
        }
        API.post(API_GATEWAY_NAME, 'teaminfo', params)
                .then(response => {console.log('TEAM from API Gateway: ' + response.subteams); this.setState({
                    teams: response.subteams.sort((t1, t2) => {
                        if(t1.name.toLowerCase() < t2.name.toLowerCase()) return -1;
                        if(t1.name.toLowerCase() > t2.name.toLowerCase()) return 1;
                        return 0;
                        }),
                    isDataFetched: true})})
                .catch(error => console.log('Error from gateway', error))   
    }

    componentDidUpdate(){
        if (!this.state.isDataFetched){
            let params = {
                headers: {},
                body: {teamid: 'ROOT'}
            }
            API.post(API_GATEWAY_NAME, 'teaminfo', params)
                .then(response => {console.log('TEAM from API Gateway: ' + response.subteams); 
                this.setState({
                    teams: sortTeamsAlphabetically(response.subteams), 
                    isDataFetched: true})
                })
                .catch(error => console.log('Error from gateway', error))   
        }
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
        this.setState({ snackBarOpen: false });
    };

    refetchTeamData = (snackbarText) => {
        this.setState({
            isDataFetched: false,
            snackBarOpen: snackbarText === undefined ? false : true, 
            snackbarText: snackbarText === undefined ? '' : snackbarText 
        })
    }

    render(){
        const { isDataFetched, teams } = this.state
        const { classes } = this.props

        if (isDataFetched){
            return (
                <div className={classes.bgc}>           
                    <Typography variant="headline" className={classes.title}>A new and bold way to record standup meetings.</Typography>
                    <Typography className={classes.description}>
                        This Standup app makes it easy to record standup meeting videos.
                        It consolidates standup meetings from all hierarchical levels - making 
                        it simpler to grow and manage at all levels.
                    </Typography>
                <Grid container spacing={0} className={classes.root}>
                    <TeamList team={null} subTeams={teams} refetchTeamData={this.refetchTeamData}/>                   
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={generateSnackbarMessage(this.state.snackbarText)}
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
                </div> 
            )
        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Fade
                        in={!isDataFetched}
                        style={{
                            transitionDelay: !isDataFetched ? '800ms' : '0ms',
                            height: '100%',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress className={classes.progress}/>
                    </Fade>
                </Grid>
            )
        }
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
        // padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,  
        padding: '0px',
        alignSelf: 'center'
    },
    bgc: {
        backgroundColor: '#ffffff',
    },
    progress: {
        color: '#03A9F4'
    },
    title: {
        paddingTop: '30px',
    },
    description: {
        paddingTop: '20px',
        paddingBottom: '20px'
    },
});

export default withStyles(styles)(Home)