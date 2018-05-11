import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
// import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemSecondaryAction } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChevronRight from '@material-ui/icons/ChevronRight'
import IconButton from 'material-ui/IconButton'

const Team = (props) => {
    console.log('TEAM PROPS: ', props.team)
    return (
        <div className={props.classes.root}>
        <Link to={`/team/${props.team.teamid}`} onClick={() => props.refetchTeamData()}>
            {/* <Paper elevation={1} className={props.classes.teamCard}> */}
            <div>
            <List component="nav" className={props.classes.list}>
                <ListItem button className={props.classes.teamCard}>
                    <Typography variant="headline" className={props.classes.font}>{props.team.name}</Typography>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Chevron">
                        <ChevronRight />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider />
            </List>
            </div>
                {/* <Typography variant="display1" className={props.classes.font}>{props.team.name}</Typography>
            </Paper> */}
        </Link>
        </div>
    )
}

const styles = theme => ({
    root: {
        width: '100%',
        padding: '0px'
    },
    teamCard: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    font: {
        color: '#616161',
        fontSize: '1.3rem'
    },
    list: {
        paddingTop: '0px',
        paddingBottom: '0px',
    }
});

export default withStyles(styles)(Team)