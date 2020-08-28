import React from 'react';
import './App.css';
import Main from './Main';
// import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
// import red from '@material-ui/core/colors/red'

function App() {
  // const theme= createMuiTheme({
  //   // direction: "ltr",
  //   palette:{
  //     primary:{
  //       main:red[50],
  //       contrastText:'#fff',
  //     },
  //     secondary:{
  //       // main:'#E80018'
  //       main:'#b71c1c'

  //     }
  
  //   }
  // })
  return (
    <div className="App" >
      
      <Main/>
    </div>
  );
}

export default App;

