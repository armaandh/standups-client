import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

import Typography from 'material-ui/Typography';

function Team(props){
    return (
        <Link to={`/team/${props.team.id}`}>
            <Paper elevation={2} className={props.classes.teamCard}>
                <Typography variant="display1" className={props.classes.font}>{props.team.name}</Typography>
            </Paper>
        </Link>
    )
}

const styles = theme => ({
    teamCard:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
    },
    font:{
        color: '#616161'
    }
});
  

export default withStyles(styles)(Team)