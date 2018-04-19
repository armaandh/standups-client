import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

function Team(props){
    return (
        <Link to={`/team/${props.team.id}`}>
            <Paper elevation={2} className={props.classes.teamCard}>
                <h1>{props.team.name}</h1>
            </Paper>
        </Link>
    )
}

const styles = theme => ({
    teamCard:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
    },
});
  

export default withStyles(styles)(Team)