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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MyTeam from '../my team/MyTeam';
import Activity from '../activity/Activity'
import Individual from '../recognition/Individual';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Nominations from '../nominations/Nominations';
import NominationHistory from '../nomination history/NominationHistory';
import CONST from '../../constants/Constants';
import MembersM from '../members/MembersM'
import MembersD from '../members/MembersD';
import MembersVp from '../members/MembersVp';
import AwardHistory from '../awards/AwardHistory'
import ApprovalD from '../approval/ApprovalD'
import ApprovalV from '../approval/ApprovalV'
import StartNomination from '../nominations/StartNomination'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import CreateAward from '../awards/CreateAward'
import HistoryD from '../approval/HistoryD'
import HistoryVP from '../approval/HistoryVP'

const CLIENT_ID = '487050070331-10md2t0pdqe7qtus6ig1ju6jtrdk22f4.apps.googleusercontent.com';

const drawerWidth = 240;

const TeamMember =["Activity", "Individual Awards"];
const Manager =  ["Activity","Individual Awards","Add To Team","Reward","Grants","Nominate","Nomination Record"];
const Director = ["Activity","Individual Awards","Add To Team","Reward ","Grants","Nominate","Nomination Record","Stamp of Approval","Approval/Rejection"]
const VP = ["Activity", "Reward  ", "Grants","Stamp of Approval ","Rejected List"]
const Admin = ["Activity","Start Nomination","Create Award"]

const reload=()=>window.location.reload();

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
        marginRight: theme.spacing(0),
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
        backgroundColor:CONST.COLOR.SECONDARY
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        textAlign:'center',
        padding: theme.spacing(2, 0),
        ...theme.mixins.toolbar,
        justifyContent: 'center',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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
    constructor(props){
    super(props)
    this.state = {
        open: false,
        finallevelType: [],
        finalContents:"",
        isLogined: true,
        accessToken: ''
     };
     this.login = this.login.bind(this);
     this.handleLoginFailure = this.handleLoginFailure.bind(this);
     this.logout = this.logout.bind(this);
     this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login (response) {
        if(response.accessToken){
          this.setState(state => ({
            isLogined: true,
            accessToken: response.accessToken
          }));
        }
      }
    
      logout (response) {
        this.setState(state => ({
          isLogined: false,
          accessToken: '',
        }));
        reload();
      }
    
      handleLoginFailure (response) {
        alert('Failed to log in')
      }
    
      handleLogoutFailure (response) {
        alert('Failed to log out')
      }

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
      if(event === "Activity"){
         this.setState({finalContents:<Activity />}) 
      }
      if(event === "Individual Awards"){
        this.setState({finalContents:<Individual />})
      }
      
      if(event === "Add To Team"){
        this.setState({finalContents:<MyTeam />})
      }
      if(event === "Reward"){
        this.setState({finalContents:<MembersM />})
      }
      if(event === "Reward "){
        this.setState({finalContents:<MembersD />})
      }
      if(event === "Reward  "){
        this.setState({finalContents:<MembersVp />})
      }
      if(event === "Grants"){
        this.setState({finalContents:<AwardHistory />})
      }
      if(event === "Nominate"){
        this.setState({finalContents:<Nominations />})
      }
      if(event === "Nomination Record"){
        this.setState({finalContents:<NominationHistory />})
      }
      if(event === "Stamp of Approval"){
        this.setState({finalContents:<ApprovalD />})
      }
      if(event === "Stamp of Approval "){
        this.setState({finalContents:<ApprovalV />})
      }
      if(event === "Start Nomination"){
        this.setState({finalContents:<StartNomination />})
      }
      if(event === "Create Award"){
          this.setState({finalContents:<CreateAward/>})
          }
    if(event === "Approval/Rejection"){
        this.setState({finalContents:<HistoryD/>})
            }
    if(event === "Rejected List"){
        this.setState({finalContents:<HistoryVP/>})
    }
    }

    getUserLevel = () => {
        if (this.props.levelType === "TeamMember") {
            this.setState({ finallevelType: TeamMember,finalContents:<Activity/> })
        }
        else if (this.props.levelType === "Manager") {
            this.setState({ finallevelType: Manager,finalContents:<Activity/> })
        }
        else if (this.props.levelType === "Director") {
            this.setState({ finallevelType: Director ,finalContents:<Activity/>})
        }
        else if (this.props.levelType === "Vp") {
            this.setState({ finallevelType: VP ,finalContents:<Activity/>})
        }
        else if (this.props.levelType === "Admin") {
            this.setState({ finallevelType: Admin ,finalContents:<Activity/>})
        }
    }

    render() {

        const { classes, theme } = this.props;
        const { open } = this.state;
        const value= JSON.parse(localStorage.getItem('userData')) 
        const logout = () => {
            alert("successfully logged out")
          }

        return (
            <>
            <div className={classes.root}>
                <CssBaseline />
                 <AppBar style={{backgroundColor:CONST.COLOR.PRIMARY}}
                        {...classes.theme}
                        position="fixed"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                        })} 
                  >
                  <Toolbar disableGutters={!open}>

                    <Grid justify="space-between"  container spacing={2}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                            <Typography variant="h6" color="inherit" noWrap>
                                SPOTLIGHT
                            </Typography>
                        </IconButton>
                    </Grid>

                    <Grid>
                        {  <Avatar src={value.data.imageUrl}   className={classes.small} />}
                   </Grid>

                    {/* <Grid item >
                        <Typography>{value.data.firstName}</Typography> 
                    </Grid> */}

                    <Grid item >
                      { this.state.isLogined ?
                        <GoogleLogout
                        clientId={ CLIENT_ID }
                        buttonText='Logout'
                        onLogoutSuccess={ this.logout }
                        onFailure={ this.handleLogoutFailure }
                        isSignedIn={false}
                        icon={false}
                        >
                        </GoogleLogout>
                        
                        :<div></div>
                     }
                    </Grid>

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
                     {  <Avatar  src={value.data.imageUrl}   className={classes.large} />}

                     <IconButton onClick={this.handleDrawerClose}>   
                         <CloseIcon variant="contained" >
                         </CloseIcon>
                     </IconButton>
                    </div>

                    <h3 align="center">Welcome {value.data.firstName}  </h3>

                    <Divider />

                        <List>
                            {this.state.finallevelType.map((text, index) => (
                                <ListItem button key={text} >
                                    <ListItemIcon>{index % 2 === 0 ? <DoubleArrowIcon /> : <DoubleArrowIcon />}</ListItemIcon>
                                    <ListItemText primary={text} onClick={()=>this.knowMyName(text)} />
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