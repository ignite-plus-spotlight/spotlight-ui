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
      </div> 
      </Router>
   
     {/* <SignInSide/> */}
    </MuiThemeProvider>
  
    );
  }
  
  export default Main;
  