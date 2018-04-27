import React, { Component } from 'react'
import Member from './Member'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog,
  } from 'material-ui/Dialog'

class MembersList extends Component{
    state = {
        addMemberDialogOpen: false,
        memberNameField: ''
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    render(){
        const { members, classes, fullScreen } = this.props

        return(
            <Grid container className={classes.membersList}>
                <Grid item xs={12}>
                    <Button color="primary" className={classes.button} onClick={() => this.setState({ addMemberDialogOpen: true })}>
                        add member
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {members.map(m => <Member member={m} key={m.id} />)}
                </Grid>
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
    membersList:{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-start'
    }
});

export default withMobileDialog()(withStyles(styles)(MembersList))