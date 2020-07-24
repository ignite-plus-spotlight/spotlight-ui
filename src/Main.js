import React from 'react';
import Home from './pages/home/Home';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
import CardAlign from './pages/card/CardAlign';
import AddMembers from './pages/add members/AddMembers';
import SignInSide from './pages/Sign-In/SignInSide';
import ECard from './pages/ecard/ECards';
import Announcement from './pages/announcement/Announcement';
import Individual from './pages/recognition/Individual';
import Team from './pages/recognition/Team';
import ClaimReward from './pages/claim reward/ClaimReward';
import Activity from './pages/activity/Activity';
import Members from './pages/Organisation/Members';
import SurveyPoll from './pages/Organisation/SurveyPoll';
import Poll from './pages/poll/Poll';

function Main() {
    const theme= createMuiTheme({
      palette:{
        primary:{
          main:red[50],
          contrastText:'#fff',
        },
        secondary:{
          main:'#E80018'
        }
    
      }
    })
    
    
    return (
      <MuiThemeProvider theme ={theme}>
      <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={SignInSide} />
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/cards" component={CardAlign}/>
        <Route exact path="/addMembers" component={AddMembers}/>
        <Route exact path="/ecard" component={ECard}/>
        <Route exact path="/announcement" component={Announcement}/>
        <Route exact path="/individual" component={Individual}/>
        <Route exact path="/team" component={Team}/>
        <Route exact path="/claimReward" component={ClaimReward}/>
        <Route exact path="/activity" component={Activity}/>
        <Route exact path="/members" component={Members}/>
        <Route exact path="/surveypoll" component={SurveyPoll}/>
        <Route exact path="/poll" component={Poll}/>





      </div> 
      </Router>
   
     {/* <SignInSide/> */}
    </MuiThemeProvider>
  
    );
  }
  
  export default Main;
  