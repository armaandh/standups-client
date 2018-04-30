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

import GroupAdd from '@material-ui/icons/GroupAdd'
import MobileStepper from 'material-ui/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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

    handleNext = () => {
        this.setState(prevState => ({
          activeStep: prevState.activeStep + 1,
        }));
      };
    
    handleBack = () => {
    this.setState(prevState => ({
        activeStep: prevState.activeStep - 1,
    }));
    };

    render(){
        const { classes, subTeams, team, fullScreen, theme, refetchTeamData } = this.props

        return (
            <Grid container spacing={0} className={classes.root}>
                <Grid item xs={12} className={classes.actionBlock}>
                    <Button color="primary" className={classes.button} className={classes.font} onClick={() => this.setState({ addTeamDialogOpen: true })}>
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

                <div><br/></div>
                 <MobileStepper
                    variant="text"
                    steps={6}
                    position="static"
                    activeStep={this.state.activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 5}>
                        Next
                        {/* {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />} */}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                        {/* {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />} */}
                        Back
                        </Button>
                    }
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
        // width: '40%',
        margin: 'auto',
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
    font:{
        color: '#1976D2',
        fontSize: '1.4rem'
    },
    mobileStepper:{
        background: 'white'
    }
});
  

export default withMobileDialog()(withStyles(styles)(TeamList))