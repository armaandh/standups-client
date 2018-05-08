import React, { Component } from 'react'
import { getAllTeams } from './../utils/api'
import TeamList from './../containers/TeamList'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade'

class Home extends Component{
    state = {
        isDataFetched: false,
        teams: []
    }

    componentDidMount(){
        const myPromise = (time) => new Promise((resolve) => setTimeout(resolve, time))
        myPromise(2000).then(() => {
            const data = getAllTeams()
            this.setState({
                teams: data,
                isDataFetched: true
            })
        })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    }

    render(){
        const { isDataFetched, teams } = this.state
        const { classes } = this.props

        if (isDataFetched){
            return (
                <div className={classes.bgc}>
                <Grid container spacing={0} className={classes.root}>
                <Typography variant="headline">A new and bold way to record standup meetings.</Typography>
                <Typography>
                    This Standup app makes it easy to record standup meeting videos.
                    It consolidates standup meetings from all hierarchical levels - making 
                    it simpler to grow and move the business forward.
                </Typography>
                    <TeamList team={null} subTeams={teams}/>
                </Grid>
                </div> 
            )
        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Fade
                        in={!isDataFetched}
                        style={{
                            transitionDelay: !isDataFetched ? '800ms' : '0ms',
                            height: '100%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginRight: '-50%',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress className={classes.progress}/>
                    </Fade>
                </Grid>
            )
        }
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh',
        padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,  
    },
    bgc: {
        backgroundColor: 'white'
    },
    progress: {
        color: '#fcac3c'
    }
});

export default withStyles(styles)(Home)