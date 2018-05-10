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
                    <Typography variant="headline" className={classes.title}>A new and bold way to record standup meetings.</Typography>
                    <Typography className={classes.description}>
                        This Standup app makes it easy to record standup meeting videos.
                        It consolidates standup meetings from all hierarchical levels - making 
                        it simpler to grow and manage at all levels.
                    </Typography>
                <Grid container spacing={0} className={classes.root}>
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
        // padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,  
        padding: '0px',
    },
    bgc: {
        backgroundColor: 'white',
    },
    progress: {
        color: '#795548'
    },
    title: {
        paddingTop: '30px',
    },
    description: {
        paddingTop: '20px',
        paddingBottom: '20px'
    },
});

export default withStyles(styles)(Home)