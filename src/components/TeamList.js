import React, { Component } from 'react'
import Team from './Team'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
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
        addMemberDialogOpen: false,
        teamNameField: '',
        memberNameField: ''
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
                    {team == null && 
                        <Button color="primary" className={classes.button} onClick={() => this.setState({ addMemberDialogOpen: true })}>
                            add member
                        </Button>
                    }
                </Grid>
                {subTeams.map(t => <Team team={t}/>)}
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
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.addMemberDialogOpen}
                    onClose={() => this.setState({ addMemberDialogOpen: false })}
                    aria-labelledby="responsive-dialog-title"
                    >
                    <DialogTitle id="responsive-dialog-title">{"Add Member"}</DialogTitle>
                    <DialogContent>
                    <TextField
                        id="team-name"
                        label="Member's name"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        onChange={this.handleChange('memberNameField')}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ addMemberDialogOpen: false })} color="primary">
                            Add
                        </Button>
                        <Button onClick={() => this.setState({ addMemberDialogOpen: false })} color="secondary" autoFocus>
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
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});
  

export default withMobileDialog()(withStyles(styles)(TeamList))