import React from 'react';
import LoginByGoogle from './pages/home/LoginByGoogle';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";


function Main() {
    
   
    return (
     
      <Router>
      <div >
        <Route exact path="/" component={LoginByGoogle} />
      </div> 
      </Router>
    );
  }
  
  export default Main;
  