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
import BusinessIcon from '@material-ui/icons/Business';
import RedeemIcon from '@material-ui/icons/Redeem';
import SchoolIcon from '@material-ui/icons/School';
import NaturePeopleTwoToneIcon from '@material-ui/icons/NaturePeopleTwoTone';
import BallotIcon from '@material-ui/icons/Ballot';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CardMembershipRoundedIcon from '@material-ui/icons/CardMembershipRounded';
import Layout from '../layout/Layout'

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
        <ListItemText primary="Recognition" />
       
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <List>
              <ListItem button variant="outline" color="secondary" component={Link} to= "/individual"> 
              <ListItemIcon>{ <SchoolIcon color="inherit"/>}</ListItemIcon>
              <ListItemText primary="Individual" /> 
            </ListItem >
            <ListItem button variant="outline" color="secondary" component={Link} to= "team">
            <ListItemIcon>{ <SchoolIcon color="inherit"/>}</ListItemIcon>
            <ListItemText primary="Team" />
            </ListItem>
            
            </List>
            </ListItem>
            </List>
            </Collapse>   
            <ListItem button onClick={handleClick2}>
            <ListItemIcon>{ <BusinessIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Organisation" />
        
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open2}  timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <List>
              <ListItem button variant="outline" color="secondary" component={Link} to= "/members"> 
              <ListItemIcon>{ <NaturePeopleTwoToneIcon color="inherit"/>}</ListItemIcon>
              <ListItemText primary="Members" /> 
            </ListItem >
            <ListItem button variant="outline" color="secondary" component={Link} to="/surveypoll">
            <ListItemIcon>{ <HowToVoteIcon color="inherit"/>}</ListItemIcon>
            <ListItemText primary="Survey/Poll" />
            </ListItem>
            </List>
            </ListItem>
            </List>
            </Collapse>
            <ListItem button variant="outline" color="secondary" component={Link} to= "/ecard"  >
            <ListItemIcon>{ <RedeemIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="E-cards" />
      
      </ListItem>
       
      <Divider/>
      <ListItem button variant="outline" color="secondary" component={Link} to= "/announcement">
      <ListItemIcon>{ <CastForEducationIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Announcements"  />
      </ListItem>
      <ListItem button  variant="outline" color="secondary" component={Link} to="/cards">
      
      <ListItemIcon>{<BallotIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Nominations" />
      
      </ListItem>
      <ListItem button variant="outline" color="secondary" component={Link} to="/addMembers">
  <ListItemIcon>{ <PersonAddIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Add members" />
      </ListItem>
      <ListItem button variant="outline" color="secondary" component={Link} to="/addTeam">
      <ListItemIcon>{ <GroupAddIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Add team" />
      </ListItem>
      <ListItem button variant="outline" color="secondary" component={Link} to="/poll">
      <ListItemIcon>{ <HowToVoteIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Polls" />
      </ListItem>
      <ListItem button  variant="outline" color="secondary" component={Link} to="/ecard">
      <ListItemIcon>{ <CardMembershipRoundedIcon color="inherit"/>}</ListItemIcon>
        <ListItemText primary="Send personal E-card" />
      </ListItem>
 
   </List>
   
  );
}
