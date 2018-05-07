import React, { Component } from 'react'
import Team from './../components/Team'
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dialog, { withMobileDialog} from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from 'material-ui/IconButton'
import GroupAdd from '@material-ui/icons/GroupAdd'

class TeamList extends Component{
    state={
        addTeamDialogOpen: false,
        teamNameField: '',
        activeStep: 0,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    render(){
        const { classes, subTeams, refetchTeamData } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} className={classes.actionBlock}>
                    <Button color="primary" className={classNames(classes.button, classes.font)} onClick={() => this.setState({ addTeamDialogOpen: true })}>
                        <GroupAdd /> . add team
                    </Button>
                    <div><br/></div>
                </Grid>
                {subTeams.lenght === 0 && 
                    <Typography variant="subheading">
                        No Teams
                    </Typography>
                }
                {subTeams.map(t => <Team team={t} key={t.id} refetchTeamData={refetchTeamData}/>)}
                <Dialog
                        fullScreen
                        open={this.state.addTeamDialogOpen}
                        onClose={() => this.setState({ addTeamDialogOpen: false })}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                            <IconButton color="inherit" onClick={() => this.setState({ addTeamDialogOpen: false })} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Add New Team
                            </Typography>
                            <Button color="inherit" onClick={() => this.setState({ addTeamDialogOpen: false })}>
                                save
                            </Button>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.addTeamContent}>
                        <TextField
                            id="team-name"
                            label="Team Name"
                            className={classes.textField}
                            type="text"
                            margin="normal"
                            onChange={this.handleChange('teamNameField')}
                        />
                        </div>
                </Dialog>
                <div><br/></div>
            </Grid>
        )
    }
}

const styles = theme => ({
    root:{
        display: 'flex',
        padding: '10px',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        // margin: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
        '&:hover': {
            backgroundColor: '#ffecd3'
        },
    },
    actionBlock: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    font:{
        color: '#fcac3c',
        fontSize: '1.4rem'
    },
    mobileStepper:{
        background: 'white'
    },
    addTeamContent:{
        display: 'flex',
        flex: '1 1 auto',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appBar: {
        position: 'relative',
        backgroundColor: '#FFD54F',
        color: '#795548'
      },
    flex: {
        flex: 1,
    },
}); 

export default withMobileDialog()(withStyles(styles)(TeamList))