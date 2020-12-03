import React, { Component } from 'react'
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import img1 from '../../assets/images/t9.jpg';
import Typical from 'react-typical'
import ReactDOM from 'react-dom';
import Dashboard from '../dashboard/Dashboard.js';

//hashed
const CLIENT_ID = '487050070331-10md2t0pdqe7qtus6ig1ju6jtrdk22f4.apps.googleusercontent.com';

export class Logintbygoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleName:'',
      isLogined: false,
      accessToken: ''
    };
    //bind the callback functions
    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  
  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
    
      this.signup(response)
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  signup(res) {

    const googleresponse = {

      empId: res.profileObj.googleId,
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      empEmail: res.profileObj.email,
      imageUrl: res.profileObj.imageUrl,
      providerName: 'Google',
      dob:res.tokenObj.birthday,
      team_id:'null'

    };

    let current=res.profileObj.googleId;

    //Employee controller
    axios.post('http://localhost:8081/employee', googleresponse)
      .then((result) => {
        let responseJson = result;
        localStorage.setItem("userData", JSON.stringify(result));
        
      });
        
      //emp roles controller
      axios.get(`http://localhost:8081/${current}/employeeroles`)
        .then(res => {
          
          const roles = res.data;
           this.setState({ roles });
           
              if (roles[0].roleName == "team member")
              {

                return ReactDOM.render(<Dashboard levelType={"TeamMember"}/>,document.getElementById('root'))

              }
              else if(roles[0].roleName=="manager")
                {
                
                  return ReactDOM.render(<Dashboard levelType={"Manager"}/>,document.getElementById('root'))
                  
                }
                else if(roles[0].roleName=="director")
                   {
                    
                    return ReactDOM.render(<Dashboard levelType={"Director"}/>,document.getElementById('root'))
                    
                  }

                else if(roles[0].roleName=="vp")
                   {
                   
                    return ReactDOM.render(<Dashboard levelType={"Vp"}/>,document.getElementById('root'))
                   
                  }
                  else if(roles[0].roleName=="admin")
                  {
                   
                   return ReactDOM.render(<Dashboard levelType={"Admin"}/>,document.getElementById('root'))
                   
                 }

           })
    };



  render() {

     return (

        <div className="App">
            <AppBar  position="fixed" style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>

                   <Grid justify="space-between"  container spacing={24}>
                     {/* animation */}
                      <Typical
                        steps={['SPOTLIGHT', 1000, 'Employee Recognition Platform', 500]}
                        loop={Infinity}
                        wrapper="h1"
                      />
                    </Grid>

                <Grid item>
                  <div className="row">
                     <div style={{ 'paddingTop': "20px" }} className="col-sm-12">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4">

                      { this.state.isLogined ?
                            
                              <GoogleLogout
                                clientId={ CLIENT_ID }
                                buttonText='Logout'
                                //callback functions
                                onLogoutSuccess={ this.logout }
                                onFailure={ this.handleLogoutFailure }
                                icon={false}
                              >
                              </GoogleLogout>
                        
                              : 

                              <>
                                  <GoogleLogin
                                    clientId={ CLIENT_ID }
                                    buttonText='Login'
                                    onSuccess={ this.login }
                                    onFailure={ this.handleLoginFailure }
                                    cookiePolicy={ 'single_host_origin' }
                                    responseType='code,token'
                                    isSignedIn={true}
                                    type='submit'

                                  />
                              </>
                            }
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                </div>
        
                </Grid>
              </Toolbar>
            </AppBar>
              <img className="d-block w-100" src={img1} width="100%" height="100%"/>
      </div>
    
    )
  }
}


export default Logintbygoogle