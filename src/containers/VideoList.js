import React, { Component, Fragment } from 'react'
import Video from './../components/Video'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

class VideoList extends Component{
    render(){
        const { videos, classes } = this.props
        console.log('VidosikiL', videos)

        return (
            <Fragment>
                <Grid container spacing={0} className={classes.root}>
                    {videos.map(v => <Video video={v.key} key={v.key}/>)}
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