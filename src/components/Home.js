import React, { Component } from 'react'
import { getAllTeams } from './../utils/api'
import TeamList from './TeamList'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import { CircularProgress } from 'material-ui/Progress'
import Fade from 'material-ui/transitions/Fade'

import Button from 'material-ui/Button';
import classNames from 'classnames';
import Card, { CardContent } from 'material-ui/Card';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Input from '@material-ui/icons/Input';

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
                <div>
                <Grid container spacing={0} className={classes.root}>
                    {/* <Grid item xs={6} sm={4} zeroMinWidth> */}
                    <TeamList team={null} subTeams={teams}/>
                    {/* </Grid> */}

                    
                </Grid>
                <Card className={classes.card}>
                    <CardContent>
                    <div><img src={require('../images/252px-Hootsuite_logo.svg.png')} /><br/><br/></div>
                    <Button
                        variant="raised"
                        color="primary"
                        disableRipple
                        className={classNames(classes.margin, classes.bootstrapRoot2)}
                    >
                    <Input className={classes.leftIcon}/>
                        Sign In
                    </Button>
                    <br/>
                    <Button
                        variant="raised"
                        color="primary"
                        disableRipple
                        className={classNames(classes.margin, classes.bootstrapRoot)}
                    >
                    <AssignmentInd className={classes.leftIcon}/>
                        Sign Up
                    </Button>
                    </CardContent>
                </Card>
                </div> 
            )
        }else{
            return (
                <Grid container spacing={0} className={classes.root}>
                    <Fade
                        in={!isDataFetched}
                        style={{
                            transitionDelay: !isDataFetched ? '800ms' : '0ms',
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
    root:{
        display: 'flex',
        height: '100%',
        padding: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    bootstrapRoot: {
        boxShadow: 'none',
        textTransform: 'none',
        borderRadius: 4,
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        '&:hover': {
          backgroundColor: '#0069d9',
          borderColor: '#0062cc',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      },
      bootstrapRoot2: {
        boxShadow: 'none',
        textTransform: 'none',
        borderRadius: 4,
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        backgroundColor: '#43A047',
        borderColor: '#43A047',
        '&:hover': {
          backgroundColor: '#388E3C',
          borderColor: '#388E3C',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#388E3C',
          borderColor: '#388E3C',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      },  
    margin: {
        margin: theme.spacing.unit,
    },
    card: {
        maxWidth: 650,
        margin: 'auto'
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
});

export default withStyles(styles)(Home)