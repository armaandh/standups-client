import React from 'react'
import { withStyles } from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

function Member(props){
    return (
        <Chip
            avatar={<Avatar>MB</Avatar>}
            label={props.member.name}
            //onClick={handleClick}
            className={props.classes.chip}
        />
    )
}

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
    },
});

export default withStyles(styles)(Member)