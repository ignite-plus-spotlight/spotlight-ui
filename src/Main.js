import React from 'react';
import LoginByGoogle from './pages/home/LoginByGoogle';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Nominations from './pages/nominations/Nominations.js';
import Nominate from './pages/nominations/Nominate.js';
import Individual from './pages/recognition/Individual';
import Team from './pages/recognition/Team';
import Activity from './pages/activity/Activity';
// import SurveyPoll from './pages/Organisation/SurveyPoll';
import Poll from './pages/poll/Poll';
import DashboardT from './pages/dashboard/DashboardT';
import DashboardM from './pages/dashboard/DashboardM';
import DashboardD from './pages/dashboard/DashboardD';
import MyTeam from './pages/my team/MyTeam';
import AwardHistory from './pages/awards/AwardHistory';
import MembersM from './pages/members/MembersM';
import GiveAward from './pages/awards/GiveAward'
import NominationHistory from './pages/nomination history/NominationHistory'
import MembersD from './pages/members/MembersD';
import MembersVp from './pages/members/MembersVp'
import DashboardV from './pages/dashboard/DashboardV'
import Check from './pages/awards/Check'
import DashboardA from './pages/dashboard/DashboardA'
import StartNomination from './pages/nominations/StartNomination'
import ApprovalD from './pages/approval/ApprovalD';
import ApprovalV from './pages/approval/ApprovalV';

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
        <Route exact path="/DashboardM" component={DashboardM}/>
        <Route exact path="/DashboardT" component={DashboardT}/>
        <Route exact path="/DashboardD" component={DashboardD}/>
        <Route exact path="/DashboardA" component={DashboardA}/>
        <Route exact path="/DashboardV" component={DashboardV}/>
        <Route exact path="/individual" component={Individual}/>
        <Route exact path="/team" component={Team}/>
        <Route exact path="/activity" component={Activity}/>
        <Route exact path="/myteam" component={MyTeam}/>
        <Route exact path="/nominations" component={Nominations}/>
        <Route exact path="/nominationhistory" component={NominationHistory}/>
        <Route exact path="/nominate" component={Nominate}/>
        <Route exact path="/poll" component={Poll}/>
        <Route exact path ="/awards" component={AwardHistory}/>
        <Route exact path="/giveAwards" component={GiveAward}/>
        <Route exact path="/viewMember" component={MembersM}/>
        <Route exact path="/members" component={MembersD}/>
        <Route exact path="/membersVp" component={MembersVp}/>
        <Route exact path="/check" component={Check}/>
        <Route exact path="/launch" component={StartNomination}/>
        <Route exact path="/approvald" component={ApprovalD}/>
        <Route exact path="/approvalv" component={ApprovalV}/>




      </div> 
      </Router>
   
    </MuiThemeProvider>
  
    );
  }
  
  export default Main;
  