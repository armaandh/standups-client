import React, { Component, Fragment } from 'react'
import Video from './../components/Video'
import DateHeadlineSeparator from './../components/DateHeadlineSeparator'
import { compareDateByCalendarDay } from './../utils/functions'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

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
        padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default withStyles(styles)(VideoList)