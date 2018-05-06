import React, { Component, Fragment } from 'react'
import MembersList from './MembersList'
import TeamList from './TeamList'
import VideoList from './VideoList'
import { Storage } from 'aws-amplify';

import { 
    startRecording, 
    stopRecording, 
    initVideoRecording , 
    getVideoRecordURL, 
    getVideoStreamURL,
    getVideoBlob,
    isMediaRecordingSupported
} from '../utils/videoRecording'

import { saveToAWS, getAllVideos, getTeam } from '../utils/api'

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
import AppBar from 'material-ui/AppBar'
import Dialog from 'material-ui/Dialog'
import Toolbar from 'material-ui/Toolbar'
import Input from 'material-ui/Input'
import Snackbar from 'material-ui/Snackbar';

import Stop from '@material-ui/icons/Stop'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'

class TeamView extends Component{
    state = {
        isTeamFetched: false,
        isVideosFetched: false,
        team: {},
        videos: [],
        addStanupDialogOpen: false,
        isVideoRecording: false,
        isVideoStreamEnabled: false,
        isVideoRecordingEnabled: true,
        recorderedVideo: null,
        videoStream: null,
        open: false,
    }

    componentDidMount(){
        this.setState({isVideoRecordingEnabled: isMediaRecordingSupported()})
        //this.setState({isVideoRecordingEnabled: false})
        const myPromise = (time) => new Promise((resolve) => setTimeout(resolve, time))
        if (!this.state.isTeamFetched){
            myPromise(2000).then(() => { 
                this.setState({
                    team: getTeam(this.props.match.params.id),
                    isTeamFetched: true
                })
            })
        }
        if (!this.state.isVideosFetched){
            Storage.list('')
                .then((data) => 
                {
                    console.log('*********** ', data)
                    this.setState({videos: data, isVideosFetched: true})
                })
                .catch((error) => console.log('Fetch all videos ERROR: ', error));   
        }
    }

    componentDidUpdate() {
        const myPromise = (time) => new Promise((resolve) => setTimeout(resolve, time))
        if (!this.state.isTeamFetched){
            myPromise(2000).then(() => { 
                this.setState({
                    team: getTeam(this.props.match.params.id),
                    isTeamFetched: true
                })
            })
        }
        if (!this.state.isVideosFetched){
            Storage.list('')
                .then((data) => 
                { 
                    this.setState({videos: data, isVideosFetched: true})
                })
                .catch((error) => console.log('Fetch all videos ERROR: ', error));   
        }
    }

    openVideoRecordingDialog = () => {
        this.setState({
            addStanupDialogOpen: true,
        })
    }

    submitVideo = () => {
        const { recorderedVideo } = this.state
        if (recorderedVideo !== null){
            Storage.put(Date.now().toString(), recorderedVideo)
                .then (result => {
                    this.setState({isVideosFetched: false, open: true})
                    console.log(result)
                })
                .catch(err => console.log(err))
                .then(() => this.handleAddVideoDialogClose());
        }else{
            this.handleAddVideoDialogClose()
        }
    }

    handleRecording = () => {
        if  (this.state.isVideoRecording){
            stopRecording()
            this.setState({
                recorderedVideo: getVideoBlob(), 
                videoStream: null, 
                isVideoRecording: !this.state.isVideoRecording, 
                isVideoStreamEnabled: false
            })
        }else{
            initVideoRecording()
                .then((data) => {
                    startRecording()
                    this.setState({
                        isVideoRecording: !this.state.isVideoRecording, 
                        videoStream: getVideoStreamURL(),
                        isVideoStreamEnabled: true,
                        recorderedVideo: null,
                        isVideoRecordingEnabled: true
                    })  
                })
                .catch(error => alert('Error: ', error))    
        }
    }

    handleAddVideoDialogClose = () => {
        stopRecording()
        this.setState({
            addStanupDialogOpen: false, 
            isVideoRecording: false,
            isVideoStreamEnabled: false,
            recorderedVideo: null,
            videoStream: null,
        })
    }

    refetchTeamData = () => {
        this.setState({ isTeamFetched: false })
    }
 
    handleFileUploading = (e) => {
        console.log(e.target.files[0])
        this.setState({
            recorderedVideo: e.target.files[0]
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };

    render(){
        const { videos, team, isTeamFetched, isVideoRecording, isVideoStreamEnabled, videoStream, recorderedVideo, isVideoRecordingEnabled } = this.state 
        const { classes } = this.props

        if (isTeamFetched){
            return (
                <div className={classes.bgc}>
                <Grid container spacing={0} className={classes.root}>
                    <Grid item xs={12} className={classes.teamHeader}>
                        <IconButton className={classes.button} aria-label="Delete" color="primary" onClick={() => {this.refetchTeamData(); this.props.history.goBack()}}>
                            <ArrowBack />
                        </IconButton>
                        <Typography className={classes.teamTitle} variant="headline"> 
                            {team.name}
                        </Typography>
                    </Grid>
                    <TeamList team={team} subTeams={team.subteams} refetchTeamData={this.refetchTeamData}/>
                    <VideoList videos={videos}/>
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
                            {recorderedVideo !== null &&
                                <Button color="inherit" onClick={this.submitVideo}>
                                    save
                                </Button>
                            }
                            </Toolbar>
                        </AppBar>
                        <div className={classes.addVideoContent}>
                            {isVideoRecordingEnabled ? 
                                (
                                    <Fragment>
                                        <div className={classes.streamVideo}>
                                        {isVideoStreamEnabled && 
                                            <video src={videoStream} muted autoPlay className={classes.streamVideo}></video>
                                        }
                                        {recorderedVideo !== null &&
                                            <video src={window.URL.createObjectURL(recorderedVideo)} muted controls className={classes.streamVideo}></video>
                                                
                                        }
                                        </div>
                                        <div>
                                        {isVideoRecording ? (
                                            <IconButton color="secondary" className={classes.button} aria-label="Stop Recording" onClick={this.handleRecording}>
                                                <Stop />
                                            </IconButton>
                                        ) : (
                                            <IconButton color="primary" className={classes.button} aria-label="Start Recording" onClick={this.handleRecording}>
                                                <FiberManualRecord />
                                            </IconButton>
                                        )}
                                        </div>
                                    </Fragment>
                                ) :
                                (
                                    <Fragment>
                                        {recorderedVideo !== null &&
                                            <video src={window.URL.createObjectURL(recorderedVideo)} muted controls className={classes.streamVideo}></video>
                                        }
                                        <Input type="file" inputProps={{'accept': 'video/*', 'capture':'user' }} onChange={this.handleFileUploading}/>
                                    </Fragment>
                                )
                            }
                        </div>
                    </Dialog>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={4000}
                        onClose={this.handleClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Video is successfully saved.</span>}
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
                </Grid>
                </div>
            )
        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Fade
                        in={!isTeamFetched}
                        style={{
                            transitionDelay: !isTeamFetched ? '800ms' : '0ms',
                            height: '100%',
                            marginTop: '250px'
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
        backgroundColor: '#FFD54F',
        color: '#795548'
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
    },
    bgc: {
        backgroundColor: 'white'
    }
});

export default withStyles(styles)(TeamView)