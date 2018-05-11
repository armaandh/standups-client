import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'

import { getInitialsFromName } from './../utils/functions'

function Member(props){
    return (
        <Link to={`/usercontent/${props.member.name}`}>
            <Chip
            avatar={<Avatar>{getInitialsFromName(props.member.name)}</Avatar>}
            label={props.member.name}
            //onClick={handleClick}
            className={props.classes.chip}
            />
        </Link>
    )
}

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
    },
});

export default withStyles(styles)(Member)