import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade'
import IconButton from 'material-ui/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

import VideoList from './VideoList'
import { Storage } from 'aws-amplify'

class UserContent extends Component{

    state = {
        videos: [],
        isVideosFetched: false
    }

    componentDidMount(){
        Storage.configure({
            bucket: 'transcoded-hootsuite-videos', //Your bucket ARN;
            region: 'us-east-1',//Specify the region your bucket was created in;
            identityPoolId: 'us-east-1:78ff47c8-6193-4413-b70c-5b643e0b132c' //Specify your identityPoolId for Auth and Unauth access to your bucket;
        }); 
        Storage.list('')
            .then((data) => 
            { 
                this.setState({
                    isVideosFetched: true, 
                    videos: data.filter(v => {
                        let videoPath = v.key.split('/')
                        return videoPath[1] === this.props.match.params.username
                    })
                })
                console.log(data)
            })
            .catch((error) => console.log('Fetch all videos ERROR: ', error));
    }

    render(){
        const { classes } = this.props
        const { videos, isVideosFetched } = this.state

        console.log('The videos: ', videos)

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} className={classes.teamHeader}>
                        <IconButton className={classes.button} color="primary" onClick={() => this.props.history.goBack()}>
                            <ArrowBack />
                        </IconButton>
                        <Typography className={classes.teamTitle} variant="headline"> 
                        {this.props.match.params.username}
                        </Typography>
                    </Grid>
                <Paper elevation={2} className={classes.userCard}>
                    <Typography variant="title">User's videos</Typography>
                    {isVideosFetched 
                        ? (<VideoList videos={videos}/>)
                        : ( 
                            <Fade
                                in={!isVideosFetched}
                                style={{
                                    transitionDelay: !isVideosFetched ? '800ms' : '0ms',
                                    height: '100%',
                                    display: 'flex',
                                    alignSelf: 'center'
                                }}
                                unmountOnExit
                            >
                                <CircularProgress className={classes.progress}/>
                            </Fade> )
                        }
                </Paper>
            </Grid>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userCard: {
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '16px',
        flex: '1' 
    },
    progress: {
        color: '#fcac3c',
    },
    teamHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    teamTitle: {
        alignSelf: 'center',
    },
    button: {
        margin: theme.spacing.unit,
        color: '#4f3e27',
        '&:hover': {
            backgroundColor: '#ffecd3'
        },
    },
})

export default withStyles(styles)(UserContent)