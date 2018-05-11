import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { Storage } from 'aws-amplify'
import Typography from 'material-ui/Typography'
import { dateFormatForUploadedVideo } from './../utils/functions'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

class Video extends Component{
    constructor(props){
        super(props)
    }

    state = {
        videoName: '',
        authorEmail: '',
        teamName: '',
        videoURL: ''
    }

    componentDidMount(){
        let videoMetaData = this.props.video.split('/')
        this.setState({
            teamName: videoMetaData[0],
            authorEmail: videoMetaData[1],
            videoName: videoMetaData[2]
        })
        Storage.get(this.props.video)
            .then(result => {
                this.setState({videoURL: result})
            })
            .catch(err => console.log(err))
    }

    render(){
        const { authorEmail, videoName } = this.state
        const { classes } = this.props

        return (
            <Paper elevation={2} className={this.props.classes.videoCard}>
                <Link to={`/usercontent/${authorEmail}`}>
                    <Typography className={this.props.classes.heading}>By {authorEmail}</Typography>
                </Link>
                <div className={`${classes.vidContainer} profile-vid-container`}>
                    <video className={`${this.props.classes.video} profile-video`} src={this.state.videoURL} width="444" height="333" type="video/mp4" playsInline controls preload="auto">
                        <source src={this.state.videoURL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Typography className={this.props.classes.heading}>{dateFormatForUploadedVideo(videoName)}</Typography>
            </Paper>
        )
    }
}

const styles = theme => ({
    videoCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: '20px',
        paddingLeft: '20px',
        flexDirection: 'column',
        margin: '36px',
        maxWidth: '500px',
        width: '100%'
    },
    heading: {
        padding: '10px',
        fontSize: '1.2rem'
    },
    video: {
        width: '100%',
        height: '342px',
        objectFit: 'contain'
    },
    vidContainer: {
        width: '100%',
        maxWidth:'500px',
        position: 'relative'
    },    
});

export default withStyles(styles)(Video)