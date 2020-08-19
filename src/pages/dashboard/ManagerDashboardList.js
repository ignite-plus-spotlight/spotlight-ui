import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Divider, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import ScheduleIcon from '@material-ui/icons/Schedule';
import BallotIcon from '@material-ui/icons/Ballot';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CardMembershipRoundedIcon from '@material-ui/icons/CardMembershipRounded';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
 
export default function NestedList() {
  const classes = useStyles();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
 
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  
 
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}>
        
      <ListItem button variant="outline" color="secondary" component={Link} to= "/activity"  >
      <ListItemIcon>{ <ScheduleIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Activity" />
      </ListItem>

      <ListItem button onClick={handleClick1}>
      <ListItemIcon>{ <EmojiEventsIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary=" My Recognition" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <List>
              <ListItem button variant="outline" color="secondary" component={Link} to= "/individual"> 
              <ListItemIcon>{ <PersonIcon color="inherit"/>}</ListItemIcon>
              <ListItemText primary="Individual Awards" /> 
            </ListItem >
            <ListItem button variant="outline" color="secondary" component={Link} to= "team">
            <ListItemIcon>{ <GroupIcon color="inherit"/>}</ListItemIcon>
            <ListItemText primary="Team Awards" />
            </ListItem>
          </List>
          </ListItem>
         </List>
       </Collapse>   
       <Divider/>


       <ListItem button onClick={handleClick2}>
      <ListItemIcon>{ <GroupAddIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Team Outlook" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
<Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <List>
              <ListItem button variant="outline" color="secondary" component={Link} to= "/myteam"> 
              <ListItemIcon>{ <PersonIcon color="inherit"/>}</ListItemIcon>
              <ListItemText primary="Add to Team" /> 
            </ListItem >
            <ListItem button variant="outline" color="secondary" component={Link} to= "/members">
            <ListItemIcon>{ <GroupIcon color="inherit"/>}</ListItemIcon>
            <ListItemText primary="Reward" />
            </ListItem>
          </List>
          </ListItem>
         </List>
       </Collapse>   




            <ListItem button  variant="outline" color="secondary" component={Link} to="/awards">
            <ListItemIcon>{<EmojiEventsIcon color="inherit"/>}</ListItemIcon>
              <ListItemText primary="Grants" />
            </ListItem>

            <ListItem button  variant="outline" color="secondary" component={Link} to="/nominations">
                <ListItemIcon>{<BallotIcon color="inherit"/>}</ListItemIcon>
                  <ListItemText primary="Nominate" />
                </ListItem>

                <ListItem button variant="outline" color="secondary" component={Link} to="/nominationhistory">
            <ListItemIcon>{ <BallotIcon color="inherit"/>}</ListItemIcon>
            <ListItemText primary="Nomination Record" />
            </ListItem>

      

    {/* remove */}
      {/* <ListItem button  variant="outline" color="secondary" component={Link} to="/nominate">
      <ListItemIcon>{<EmojiEventsIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Nominate check" />
      </ListItem> */}

       

      
      <ListItem button  variant="outline" color="secondary" component={Link} to="/">
      <ListItemIcon>{<ExitToAppIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>

       

    
     
  
     
      {/* <ListItem button variant="outline" color="secondary" component={Link} to="/poll">
      <ListItemIcon>{ <HowToVoteIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Polls" />
      </ListItem> */}

     
 
   </List>
  );
}