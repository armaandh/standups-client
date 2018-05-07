import React, { Component } from 'react'
import { getAllTeams } from './../utils/api'
import TeamList from './../containers/TeamList'

import { withStyles } from 'material-ui/styles'
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
                            marginTop: '250px'
                        }}
                        unmountOnExit
                    >
                        <CircularProgress />
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
    }
});

export default withStyles(styles)(Home)