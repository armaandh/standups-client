import React, { Component } from 'react'
import Team from './Team'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog,
  } from 'material-ui/Dialog'

import TextField from 'material-ui/TextField'

class TeamList extends Component{
    state={
        addTeamDialogOpen: false,
        teamNameField: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    render(){
        const { classes, subTeams, team, fullScreen } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} className={classes.actionBlock}>
                    <Button color="primary" className={classes.button} onClick={() => this.setState({ addTeamDialogOpen: true })}>
                        add team
                    </Button>
                </Grid>
                {subTeams.lenght === 0 && 
                    <Typography variant="subheading">
                        No Teams
                    </Typography>
                }
                {subTeams.map(t => <Team team={t} key={t.id}/>)}
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.addTeamDialogOpen}
                    onClose={() => this.setState({ addTeamDialogOpen: false })}
                    aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">{"Add New Team"}</DialogTitle>
                    <DialogContent>
                    <TextField
                        id="team-name"
                        label="Team Name"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        onChange={this.handleChange('teamNameField')}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ addTeamDialogOpen: false })} color="primary">
                            Add
                        </Button>
                        <Button onClick={() => this.setState({ addTeamDialogOpen: false })} color="secondary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
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
    },
    button: {
        margin: theme.spacing.unit,
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
});
  

export default withMobileDialog()(withStyles(styles)(TeamList))