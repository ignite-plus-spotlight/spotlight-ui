import React from 'react';
import LoginByGoogle from './pages/home/LoginByGoogle';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import CardAlign from './pages/card/CardAlign';
import SignInSide from './pages/Sign-In/SignInSide';
import Individual from './pages/recognition/Individual';
import Team from './pages/recognition/Team';
import Activity from './pages/activity/Activity';
// import SurveyPoll from './pages/Organisation/SurveyPoll';
import Poll from './pages/poll/Poll';
import DashboardT from './pages/dashboard/DashboardT';
import DashboardM from './pages/dashboard/DashboardM';
import DashboardV from './pages/dashboard/DashboardV';
import MyTeam from './pages/my team/MyTeam';
import AwardsM from './pages/awards/AwardsM';
import ViewMember from './pages/my team/ViewMember';
import GiveAward from './pages/awards/GiveAward2'


function Main() {
    const theme= createMuiTheme({
      palette:{
        primary:{
          main:red[50],
          contrastText:'#fff',
        },
        secondary:{
          // main:'#E80018'
          main:'#b71c1c'

        }
    
      }
    })
   
    return (
      <MuiThemeProvider theme ={theme}>
      <Router>
      <div >
        <Route exact path="/" component={LoginByGoogle} />
        <Route exact path="/login" component={SignInSide} />
        <Route exact path="/DashboardM" component={DashboardM}/>
        <Route exact path="/DashboardT" component={DashboardT}/>
        <Route exact path="/DashboardV" component={DashboardV}/>
        <Route exact path="/cards" component={CardAlign}/>
        <Route exact path="/individual" component={Individual}/>
        <Route exact path="/team" component={Team}/>
        <Route exact path="/activity" component={Activity}/>
        <Route exact path="/myteam" component={MyTeam}/>
        {/* <Route exact path="/surveypoll" component={SurveyPoll}/> */}
        <Route exact path="/poll" component={Poll}/>
        <Route exact path ="/awards" component={AwardsM}/>
        <Route exact path="/viewMember" component={ViewMember}/>
        <Route exact path="/giveawards" component={GiveAward}/>

      </div> 
      </Router>
   
     {/* <SignInSide/> */}
    </MuiThemeProvider>
  
    );
  }
  
  export default Main;
  