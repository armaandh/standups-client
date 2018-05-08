import React, { Component } from 'react'
import Team from './../components/Team'

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
//import GroupAdd from '@material-ui/icons/GroupAdd'
import Snackbar from 'material-ui/Snackbar';

class TeamList extends Component{
    state={
        addTeamDialogOpen: false,
        teamNameField: '',
        activeStep: 0,
        open: false,
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
    };

    render(){
        const { classes, subTeams, refetchTeamData } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} className={classes.actionBlock}>
                    <Button className={classes.button} onClick={() => this.setState({ addTeamDialogOpen: true })}>
                        add team
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
                            <Button color="inherit" onClick={() => this.setState({ addTeamDialogOpen: false, open: true })}>
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
                <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={4000}
                        onClose={this.handleClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">New team is added.</span>}
                        action={[
                            
                            <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                            >
                            <CloseIcon />
                            </IconButton>,
                        ]}
                />
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
        borderRadius: 4,
        backgroundColor: '#fcac3c',
        color: 'white',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#ffc472'
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