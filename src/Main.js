import React from 'react';
import LoginByGoogle from './pages/home/LoginByGoogle';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';




function Main() {
    const theme= createMuiTheme({
      direction: "ltr",
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
      

      </div> 
      </Router>
    
    </MuiThemeProvider>
  
    );
  }
  
  export default Main;
  