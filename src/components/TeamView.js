import React, { Component } from 'react'
import MembersList from './MembersList'
import TeamList from './TeamList'

import { 
    startRecording, 
    stopRecording, 
    initVideoRecording , 
    getVideoRecordURL, 
    getVideoStreamURL
} from '../utils/videoRecording'

import { saveToAWS, getAllVideos } from '../utils/api'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade'
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import Videocam from '@material-ui/icons/Videocam'
import Typography from 'material-ui/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from 'material-ui/transitions/Slide'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import Toolbar from 'material-ui/Toolbar'

import Stop from '@material-ui/icons/Stop'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import PlayArrow from '@material-ui/icons/PlayArrow'

import { getTeam } from './../utils/api'

class TeamView extends Component{
    state = {
        isTeamFetched: false,
        team: {},
        addStanupDialogOpen: false,
        isVideoRecoring: false,
        isVideoStreamEnabled: false,
        recorderedVideo: null,
        videoStream: null,
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

    openVideoRecordingDialog = () => {
            this.setState({
                addStanupDialogOpen: true,
            })
    }

    submitVideo = () => {
        saveToAWS(this.state.recorderedVideo, Date.now.toString())
            .then(() => this.handleAddVideoDialogClose())
    }

    handleRecording = () => {
        if  (this.state.isVideoRecoring){
            stopRecording()
            this.setState({videoStream: null})
            this.setState({
                recorderedVideo: getVideoRecordURL(), 
                videoStream: null, 
                isVideoRecoring: !this.state.isVideoRecoring, 
                isVideoStreamEnabled: false
            })
        }else{
            initVideoRecording().then(() => {
                startRecording()
                this.setState({
                    isVideoRecoring: !this.state.isVideoRecoring, 
                    videoStream: getVideoStreamURL(),
                    isVideoStreamEnabled: true,
                    recorderedVideo: null
                })
            })    
        }
    }

    handleAddVideoDialogClose = () => {
        stopRecording()
        this.setState({
            addStanupDialogOpen: false, 
            addStanupDialogOpen: false,
            isVideoRecoring: false,
            isVideoStreamEnabled: false,
            recorderedVideo: null,
            videoStream: null,
        })
    }
 
    playRecorderedVideo = () => {

    }

    render(){
        const { team, isTeamFetched, isVideoRecoring, isVideoStreamEnabled, videoStream, recorderedVideo } = this.state 
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
                    <Button variant="fab" color="primary" className={classes.recordVideoButton} onClick={this.openVideoRecordingDialog}>
                        <Videocam />
                    </Button>

                    <Dialog
                        fullScreen
                        open={this.state.addStanupDialogOpen}
                        onClose={() => this.setState({addStanupDialogOpen: false})}
                        transition={Transition}
                        >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                            <IconButton color="inherit" onClick={this.handleAddVideoDialogClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Add Standup
                            </Typography>
                            <Button color="inherit" onClick={() => this.setState({addStanupDialogOpen: false})}>
                                save
                            </Button>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.addVideoContent}>
                            <div >
                                {isVideoStreamEnabled && 
                                    <video src={videoStream} muted autoPlay className={classes.streamVideo}></video>
                                }
                                {recorderedVideo !== null &&
                                    <video src={recorderedVideo} muted controls className={classes.streamVideo}></video>
                                }
                            </div>
                            <div>
                                {isVideoRecoring ? (
                                    <IconButton color="secondary" className={classes.button} aria-label="Stop Recording" onClick={this.handleRecording}>
                                        <Stop />
                                    </IconButton>
                                ) : (
                                    <IconButton color="primary" className={classes.button} aria-label="Start Recording" onClick={this.handleRecording}>
                                        <FiberManualRecord />
                                    </IconButton>
                                )}
                                {recorderedVideo !== null &&
                                    <IconButton color="default" className={classes.button} aria-label="Play record" onClick={this.handleRecording}>
                                        <PlayArrow onClick={this.playRecorderedVideo}/>
                                    </IconButton>
                                }
                            </div>
                        </div>
                    </Dialog>
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


const Transition = (props) => {
    return <Slide direction="up" {...props} />;
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
    recordVideoButton:{
        position: 'fixed',
        right: '20px',
        bottom: '20px'
    },
    appBar: {
        position: 'relative',
      },
      flex: {
        flex: 1,
    },
    addVideoContent:{
        display: 'flex',
        flex: '1 1 auto',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    streamVideo:{
        width: "300px",
        height: "300px",
        backgroundColor: 'gray'
    }
});

export default withStyles(styles)(TeamView)