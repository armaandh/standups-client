import React from 'react'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { endpointUrl } from '../utils/api'

function Video(props){
    return (
        <Paper elevation={2} className={props.classes.videoCard}>
            <video src={endpointUrl + props.video.Key} controls height={300} width={300}/>
        </Paper>
    )
}

const styles = theme => ({
    videoCard:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
    },
});
  

export default withStyles(styles)(Video)