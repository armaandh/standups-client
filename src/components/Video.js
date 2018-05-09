import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { Storage } from 'aws-amplify'
import Typography from 'material-ui/Typography'
import { dateFormatForUploadedVideo } from './../utils/functions'
import { Link } from 'react-router-dom'

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

        return (
            <Paper elevation={2} className={this.props.classes.videoCard}>
                <Link to={`/usercontent/${authorEmail}`}>
                    <Typography>by {authorEmail}</Typography>
                </Link>
                <video height="250" width="250" controls>
                    <source src={this.state.videoURL} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Typography>{dateFormatForUploadedVideo(videoName)}</Typography>
            </Paper>
        )
    }
}

const styles = theme => ({
    videoCard:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        flexDirection: 'column',
        margin: '36px'
    },
});

export default withStyles(styles)(Video)