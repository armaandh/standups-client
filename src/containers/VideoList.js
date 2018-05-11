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

        return (
            <Fragment>
                <Grid container spacing={0} className={classes.root}>
                    <Grid item xs={12}>
                        <Typography className={classes.heading}>Videos</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.videos}>
                        {videos.length === 0 &&
                            <Typography className={classes.noVideos}>No uploaded videos</Typography>
                        }
                    </Grid>
                    {this.displayVideos(videos)}
                </Grid>
                <hr/>
            </Fragment>
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
    heading: {
        fontSize: '1.6rem',
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#37474F',
        color: '#ffffff',
        width: '100%',
    },
    videos: {
        textAlign: 'left'
    },
    noVideos: {
        display: 'flex',
        margin: '10px',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        fontSize: '1.3rem'
    },
});

export default withStyles(styles)(VideoList)