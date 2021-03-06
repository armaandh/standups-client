import React, { Component } from 'react'
import Member from './../components/Member'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Dialog, { withMobileDialog, 
    DialogActions,
    DialogContent,
    DialogTitle } from 'material-ui/Dialog'

import { API } from 'aws-amplify'
import { API_GATEWAY_NAME } from './../utils/amazonConfig'
import { configuration } from './../utils/amazonConfig'

class MembersList extends Component{

    state = {
        addMemberDialogOpen: false,
        memberNameField: '',
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    submitAddMember = () => {
        let params = {
            body: {
                teamid: this.props.team.id,
                name: this.state.memberNameField,
                upoolid: configuration.Auth.userPoolId
            },
            headers: {}
        }
        console.log('About to add ', params)
        API.post(API_GATEWAY_NAME, 'createteammember',params)
            .then(response => {
                console.log('Success for adding child member', 
                response)
            })
            .catch(err => console.log('Error in adding child team', err))
            .then(() => {
                this.setState({
                    addMemberDialogOpen: false,
                    memberNameField: '',
                }) 
                this.props.refetchTeamData('New member is successfully added.')
             })
    }

    render(){
        const { members, classes } = this.props

        return(
            <Grid container className={classes.membersList}>
                <Grid item xs={12}>
                    <Typography className={classes.heading}>Members 
                        <Button className={classes.button} onClick={() => this.setState({ addMemberDialogOpen: true })}>
                            Add Member
                        </Button>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.members}>
                    {members.length === 0 &&
                        <Typography variant="headline" className={classes.noMembers}>
                            No Members
                        </Typography>
                    }
                    {members.map(m => <Member member={m} key={m.id} />)}
                </Grid>
                <Dialog
                    open={this.state.addMemberDialogOpen}
                    onClose={() => this.setState({ addMemberDialogOpen: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Add a member"}</DialogTitle>
                    <DialogContent>
                    <TextField
                        id="member-name"
                        label="Member Name"
                        className={classes.textField}
                        type="text"
                        margin="normal"
                        onChange={this.handleChange('memberNameField')}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({ addMemberDialogOpen: false })} color="secondary">
                        Cancel
                        </Button>
                        <Button onClick={() => this.submitAddMember()} color="primary" autoFocus>
                        Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}

const styles = theme => ({
    membersList: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        padding: '0px',
    },
    addMemberContent: {
        display: 'flex',
        flex: '1 1 auto',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        marginLeft: 20,
        marginBottom: 1,
        borderRadius: 20,
        backgroundColor: '#21a2ff',
        color: '#ffffff',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: '#84cbff',
        },
    },
    heading: {
        fontSize: '1.6rem',
        textAlign: 'left',
        padding: '10px',
        backgroundColor: '#37474F',
        color: '#ffffff',
        paddingLeft: '14px'
    },
    members: {
        textAlign: 'left'
    },
    noMembers: {
        display: 'flex',
        margin: '10px',
        flexDirection: 'column',
        alignSelf: 'flex-start',
        fontSize: '1.3rem',
        paddingLeft: '6px'
    }
});

export default withMobileDialog()(withStyles(styles)(MembersList))