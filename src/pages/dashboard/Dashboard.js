import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MyTeam from '../my team/MyTeam';
import ViewMember from '../my team/ViewMember';
import AwardsM from '../awards/AwardsM';
import Activity from '../activity/Activity'
import Team from '../recognition/Team'
import Individual from '../recognition/Individual';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import img1 from '../../assets/images/target1.jpg'
import Nomination from '../nominations/Nominations';
import NominationHistory from '../nomination history/NominationHistory';
import Poll from '../poll/Poll'

const drawerWidth = 240;

const levelA =["Activity", "Poll","Logout"];
const levelB =  ["Activity", "Team Awards", "Individual Awards","My Team","View Members","Awards","Nominate","Nomination History","Logout"];
const levelC = ["Activity", "Team Awards", "Individual Awards","Logout"]


const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});

class Dashboard extends React.Component {
    state = {
        open: false,
        finallevelType: [],
        finalContents:"",
     };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    componentDidMount = () => {
        this.getUserLevel()
    }

    knowMyName = (event) => {
      // alert(event)
      if(event === "Activity"){
         this.setState({finalContents:<Activity />}) 
      }
      if(event === "Team Awards"){
        this.setState({finalContents:<Team />})
      }
      if(event === "Individual Awards"){
        this.setState({finalContents:<Individual />})
      }
      if(event === "My Team"){
        this.setState({finalContents:<MyTeam />})
      }
      if(event === "View Members"){
        this.setState({finalContents:<ViewMember />})
      }
      if(event === "Awards"){
        this.setState({finalContents:<AwardsM />})
      }
      if(event === "Nominate"){
        this.setState({finalContents:<Nomination />})
      }
      if(event === "Nomination History"){
        this.setState({finalContents:<NominationHistory />})
      }
      if(event === "Poll"){
        this.setState({finalContents:<Poll />})
      }
      if(event === "Logout"){
          }
      
    
    }

    getUserLevel = () => {
        if (this.props.levelType === "levelA") {
            this.setState({ finallevelType: levelA })
        }
        else if (this.props.levelType === "levelB") {
            this.setState({ finallevelType: levelB })
        }
        else if (this.props.levelType === "levelC") {
            this.setState({ finallevelType: levelC })
        }
    }

    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        const value= JSON.parse(localStorage.getItem('userData')) 
        
        return (
            <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                color="secondary"
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            SPOTLIGHT
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                    {  <Avatar src={img1}   className={classes.small} />}
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {this.state.finallevelType.map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} onClick={()=>this.knowMyName(text)}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.state.finalContents}
                </main>
            </div>
            </>
        );
    }
}



export default withStyles(styles, { withTheme: true })(Dashboard);