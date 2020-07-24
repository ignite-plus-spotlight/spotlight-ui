import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import {Link} from 'react-router-dom'; 
import Grid from '@material-ui/core/Grid';
import DashboardList from './DashboardList'
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip'; 


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.primary.main,
   
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
  const classes = useStyles();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
 


  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
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
          <Tooltip title="Want to Logout?">         
           <Fab variant="extended" color="secondary" component={Link} to="/"><ExitToAppOutlinedIcon/>LOGout</Fab>
        </Tooltip>
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
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}> 
             <IconButton variant="contained" >
              DASHBOARD
             <CloseIcon variant="contained" >
              </CloseIcon>
          </IconButton>
        </IconButton>
        </div>
        <DashboardList/>
         
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
  );
}