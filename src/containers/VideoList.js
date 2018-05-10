import React, { Component, Fragment } from 'react'
import Video from './../components/Video'
import DateHeadlineSeparator from './../components/DateHeadlineSeparator'
import { compareDateByCalendarDay } from './../utils/functions'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'

class VideoList extends Component{

    displayVideos = videos => {
        let videosArray = []
        let previousDate = null
        videos.map(v => {
            videosArray.push(
                <Fragment key={v.key}>
                    {(previousDate === null || !compareDateByCalendarDay(previousDate, parseInt(v.key.split('/')[2]))) && 
                        <DateHeadlineSeparator date={v.key}/>
                    }
                    <Video video={v.key} key={v.key}/>  
                </Fragment>
            )
            previousDate = parseInt(v.key.split('/')[2])
        })
        return videosArray
    }

    render(){
        const { videos, classes } = this.props
        console.log('VidosikiL', videos)

        return (
            <Fragment>
                <Grid container spacing={0} className={classes.root}>
                    <Typography className={classes.heading}>Videos</Typography>
                    {videos.length === 0 &&
                        <Typography>No uploaded videos</Typography>
                    }
                    {this.displayVideos(videos)}
                </Grid>
                <hr/>
            </Fragment>
        )
    }
}

const styles = theme => ({
    root:{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: '2rem',
        textAlign: 'left',
        padding: '20px 10px 10px 10px',
        backgroundColor: '#fcac3c',
        color: 'white',
        width: '100%',
        marginTop: '20px'
    }
});

export default withStyles(styles)(VideoList)