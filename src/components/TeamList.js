import React, { Component } from 'react'
import Team from './Team'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

class TeamList extends Component{
    render(){
        const { classes, subTeams, team } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} className={classes.actionBlock}>
                    <Button color="primary" className={classes.button}>
                        add team
                    </Button>
                    {team !== null && 
                        <Button color="primary" className={classes.button}>
                            add member
                        </Button>
                    }
                </Grid>
                {subTeams.map(t => <Team team={t}/>)}
            </Grid>
        )
    }
}

const styles = theme => ({
    root:{
        display: 'flex',
        flex: '1 wrap',
        padding: '10px',
        justifyContent: 'space-around',    
        flexDirection: 'column',
        alignSelf: 'flex-start'
    },
    button: {
        margin: theme.spacing.unit,
    },
    actionBlock: {
        display: 'flex',
        alignItems: 'flex-start'
    }
});
  

export default withStyles(styles)(TeamList)