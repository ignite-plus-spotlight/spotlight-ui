import React from 'react';
import clsx from 'clsx';
import { makeStyles,Drawer,CssBaseline,AppBar,Toolbar,
  Typography,Divider,IconButton,Fab,Tooltip} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {Link} from 'react-router-dom'; 
import Grid from '@material-ui/core/Grid';
import ManagerDashboardList from './ManagerDashboardList'
import TeamDashboardList from './TeamDashboardList'
import VPDashboardList from './VPDashboardList'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import img1 from '../../assets/images/target7.jpg';
import Avatar from '@material-ui/core/Avatar';
import { useGoogleLogout } from 'react-google-login';
import Activity from '../activity/Activity';



const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
  
    display: 'flex',
   
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    
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
    backgroundColor: theme.palette.primary.main,
    
   
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    textAlign:'center',
    padding: theme.spacing(2, 0),
    // necessary for content to be below app bar
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
}));

export default function Dashboard(props) {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  // console.log(value);


  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    
  };
  // const [anchorEl, setAnchorEl] = React.useState(null);
 
  const handleDrawerClose = () => {
    setOpen(false);
  };
   
 

  return (
    <>
    <div className={classes.root}>
      
      <CssBaseline />
     
      <AppBar
        position="fixed"
        color = "secondary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        
        <Toolbar>
        <Grid justify="space-between"  container spacing={2}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            // className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
           
           <Typography variant="h6" noWrap>
            SPOTLIGHT
          </Typography>
          </IconButton>
          </Grid>
          <Grid item>
          {  <Avatar src={value.data.imageUrl}   className={classes.small} />}
          </Grid>
          <Grid item>
          {/* <Tooltip title="Want to Logout?">          */}
           {/* <Fab variant="extended" color="secondary" component={Link} to="/"><ExitToAppOutlinedIcon/>Logout</Fab> */}
           <Typography>{value.data.firstName}</Typography>

        {/* </Tooltip> */}
            </Grid>
        </Toolbar>
        
        
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="contained"
        
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div  className={classes.drawerHeader} >
        
        {  <Avatar src={value.data.imageUrl}   className={classes.large} />}
          <IconButton onClick={handleDrawerClose}>   
             <CloseIcon variant="contained" >
              </CloseIcon>
        </IconButton>
        </div>
      <h3 align="center">Welcome {value.data.firstName}  </h3>

        <ManagerDashboardList/>

        
         
        <Divider />
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>

    </>
  );
}