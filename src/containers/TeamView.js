import React, { Component, Fragment } from 'react'
import MembersList from './MembersList'
import TeamList from './TeamList'
import VideoList from './VideoList'
import Amplify, { Storage, API, Auth } from 'aws-amplify'
import { API_GATEWAY_NAME } from './../utils/amazonConfig'
import classNames from 'classnames'
import { 
    startRecording, 
    stopRecording, 
    initVideoRecording , 
    getVideoRecordURL, 
    getVideoStreamURL,
    getVideoBlob,
    isMediaRecordingSupported
} from '../utils/videoRecording'

import { formatEmail, sortTeamsAlphabetically } from './../utils/functions'

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
        accessToken: null,
        isTeamFetched: false,
        isVideosFetched: false,
        team: {},
        videos: [],
        addStanupDialogOpen: false,
        isVideoRecording: false,
        isVideoStreamEnabled: false,
        isVideoRecordingEnabled: false,
        recorderedVideo: null,
        videoStream: null,
        open: false,
        snackBarOpen: false,
        snackbarText: ''
    }

    componentDidMount(){
        // do we need this??
        this.setState({isVideoRecordingEnabled: false})

        //Auth.currentSession()
        //.then(session => this.setState({accessToken: session.accessToken.jwtToken}))
        //.catch(error => console.log('*** Session ERROR: ', error))
        if (!this.state.isTeamFetched){
            let params = {
                headers: {},
                body: {teamid: this.props.match.params.id}
            }
            API.post(API_GATEWAY_NAME, 'teaminfo', params)
                .then(response => {console.log('TEAM from API Gateway: ', response); this.setState({team: response, isTeamFetched: true})})
                .catch(error => console.log('Error from gateway', error))
                .then(() => this.setState({isVideoRecordingEnabled: isMediaRecordingSupported()}))
            /* myPromise(1000).then(() => { 
                this.setState({
                    team: getTeam(this.props.match.params.id),
                    isTeamFetched: true
                })
            }).then(() => this.setState({isVideoRecordingEnabled: isMediaRecordingSupported()})) */
        }
    }

    componentDidUpdate() {
        if (!this.state.isTeamFetched){
            let params = {
                headers: {},
                body: {teamid: this.props.match.params.id}
            }
            API.post(API_GATEWAY_NAME, 'teaminfo', params)
                .then(response => {console.log('TEAM from API Gateway: ', response); this.setState({team: response, isTeamFetched: true})})
                .catch(error => console.log('Error from gateway', error))
        }
        if (!this.state.isVideosFetched && this.state.team !== undefined && this.state.isTeamFetched){
            console.log('List: ', this.state.team.name)
            this.setState({isVideosFetched: true})
            Storage.configure({
                bucket: 'transcoded-hootsuite-videos', //Your bucket ARN;
                region: 'us-east-1',//Specify the region your bucket was created in;
                identityPoolId: 'us-east-1:78ff47c8-6193-4413-b70c-5b643e0b132c' //Specify your identityPoolId for Auth and Unauth access to your bucket;
            }); 
            Storage.list(`${this.state.team.name}/`)
                .then((data) => 
                { 
                    this.setState({videos: data.sort((v1, v2 ) => parseInt(v2.key.split('/')[2]) > parseInt(v1.key.split('/')[2]))})
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
            Auth.currentUserInfo()
                .then(userDetails => {
                    //console.log('Session: ', userDetails.attributes.email)
                    Storage.configure({
                        bucket: 'ed-photoss', //Your bucket ARN;
                        region: 'us-east-1',//Specify the region your bucket was created in;
                        identityPoolId: 'us-east-1:78ff47c8-6193-4413-b70c-5b643e0b132c' //Specify your identityPoolId for Auth and Unauth access to your bucket;
                    });                    
                    Storage.put(`${this.state.team.name}/${formatEmail(userDetails.attributes.email)}/${Date.now().toString()}`, recorderedVideo)
                        .then (result => {
                            this.setState({isVideosFetched: false, open: true})
                            console.log(result)
                        })
                        .catch(err => console.log(err))
                        .then(() => this.handleAddVideoDialogClose());
                        })
                .catch(error => console.log('Coudn\' get user\'s details ', error))
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

    refetchTeamData = (snackbarText) => {
        this.setState({ isTeamFetched: false, isVideosFetched: false, snackBarOpen: true, snackbarText: snackbarText })
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
        this.setState({ open: false, snackBarOpen: false });
      };

    render(){
        const { videos, team, isTeamFetched, isVideoRecording, isVideoStreamEnabled, videoStream, recorderedVideo, isVideoRecordingEnabled } = this.state 
        const { classes } = this.props
        
        if (isTeamFetched){
            return (
                <div>
                    <Grid item xs={12} className={classes.teamHeader}>
                        <IconButton className={classNames(classes.button, classes.arrow)} aria-label="Delete" color="primary" onClick={() => {this.refetchTeamData(); this.props.history.goBack()}}>
                            <ArrowBack />
                        </IconButton>
                        <Typography className={classes.teamTitle} variant="headline"> 
                            Back
                        </Typography>
                    </Grid>
                <Grid container spacing={0} className={classes.root}>
                    <Typography className={classes.teamTitle} variant="headline"> 
                        {team.name}
                    </Typography>
                    <TeamList team={team} subTeams={sortTeamsAlphabetically(team.subteams)} refetchTeamData={this.refetchTeamData}/>
                    <MembersList team={team} members={team.members} refetchTeamData={this.refetchTeamData}/>
                    <VideoList videos={videos}/>
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
                                        {/* <Typography className={classes.videoNote}>Please click the button to start recording.</Typography> */}
                                        {isVideoStreamEnabled && 
                                            <video src={videoStream} muted autoPlay className={classes.streamVideo}></video>
                                        }
                                        {recorderedVideo !== null &&
                                            <video src={window.URL.createObjectURL(recorderedVideo)} muted controls="true" className={classes.streamVideo}></video>     
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
                                                <video height="250" width="250" controls>
                                                    <source src={window.URL.createObjectURL(recorderedVideo)} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>    
                                        }
                                        <Input type="file" inputProps={{'accept': 'video/mp4', 'capture':'user' }} onChange={this.handleFileUploading}/>
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
                        message={<span id="message-id">Video has been saved.</span>}
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
                    message={<span id="message-id">{this.state.snackbarText}</span>}
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
                        in={!isTeamFetched}
                        style={{
                            transitionDelay: !isTeamFetched ? '800ms' : '0ms',
                            height: '100%',
                            position: 'absolute',
                            top: '50%',
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

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
        // padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    teamHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    teamTitle: {
        alignSelf: 'center',
        padding: 20
    },
    button: {
        margin: theme.spacing.unit,
        color: '#4f3e27',
        '&:hover': {
            backgroundColor: '#ffecd3'
        },
    },
    recordVideoButton:{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        backgroundColor: '#fcac3c',
        '&:hover': {
            backgroundColor: '#ffbb5b'
        },
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
        backgroundColor: 'gray',
    },
    progress: {
        color: '#795548'
    },
    videoNote: {
        color: 'white',
        textAlign: 'center',
    },
    arrow: {
        color: '#795548'
    }
});

export default withStyles(styles)(TeamView)