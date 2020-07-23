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
import {MenuItem, MenuList} from '@material-ui/core'
import {Link} from 'react-router-dom'; 



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

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
     
      <AppBar
        position="fixed"
       color="secondary"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            SPOTLIGHT
          </Typography>
        </Toolbar>
        
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="contained"
        anchor="left"
        style={{backgroundColor: "primary"}}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}> 
             <IconButton variant="contained" color="secondary">
              DASHBOARD
             <CloseIcon variant="contained" color="secondary">
              </CloseIcon>
          </IconButton>
        </IconButton>
        </div>
        
        <Divider />
        <MenuList>
          <MenuItem >
          Activity
          </MenuItem>
          <MenuItem>
          Organisation
          </MenuItem>
          <MenuItem >
         Recognition
          </MenuItem>
          <MenuItem>
          Claim Rewards
          </MenuItem>
          </MenuList>
          <Divider/>
        <MenuList >
        <MenuItem>
          Activity
          </MenuItem>
          <MenuItem>
          Announcement
          </MenuItem>
          <MenuItem component={Link} to="/cards">
          Nominations
          </MenuItem>
          <MenuItem component={Link} to="/addMembers">
          Add Members
          </MenuItem>
          <MenuItem>
          Polls
          </MenuItem>
          <MenuItem component={Link} to="/ecard">
          Send Personal E-Card
          </MenuItem>
          <MenuItem component={Link} to="/">
            Logout
          </MenuItem>
        </MenuList>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
       
        <Typography paragraph>
         
        </Typography>
      </main>
    </div>
  );
}