import React, { Component } from 'react'
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";
import img1 from '../../assets/images/targetwelcome.png';
import Typical from 'react-typical'
// import LogoutButton from '@material-ui/core/Logout'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
import ParticlesBg from "particles-bg";
import Dashboard from '../dashboard/Dashboard.js';


export class Logintbygoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleName:''
    };
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

    // const cookies = new Cookies();
    // cookies.set('login', current, { path: '/' });
    // console.log(cookies.get('login')); 

    axios.post('http://localhost:8081/employee', googleresponse)
      .then((result) => {
        let responseJson = result;
        localStorage.setItem("userData", JSON.stringify(result));
        
      });
        
        axios.get(`http://localhost:8081/${current}/employeeroles`)
          .then(res => {
            const roles = res.data;
            this.setState({ roles });
              if (roles[0].roleName == "team member")
              {
                // this.props.history.push('/dashboard')
                return ReactDOM.render(<Dashboard levelType={"TeamMember"}/>,document.getElementById('root'))
              //  return  <DashboardV/>
              }
              else if(roles[0].roleName=="manager")
                {
                // this.props.history.push('/dashboard')
                  return ReactDOM.render(<Dashboard levelType={"Manager"}/>,document.getElementById('root'))
                  // return <DashboardM/>
                }
                else if(roles[0].roleName=="director")
                   {
                    // this.props.history.push('/dashboard')
                    return ReactDOM.render(<Dashboard levelType={"Director"}/>,document.getElementById('root'))
                    // return <DashboardT/>
                  }

                else if(roles[0].roleName=="vp")
                   {
                    // this.props.history.push('/dashboard')
                    return ReactDOM.render(<Dashboard levelType={"Vp"}/>,document.getElementById('root'))
                    // return <DashboardT/>
                  }
                  else if(roles[0].roleName=="admin")
                  {
                   // this.props.history.push('/dashboard')
                   return ReactDOM.render(<Dashboard levelType={"Admin"}/>,document.getElementById('root'))
                   // return <DashboardT/>
                 }

          })
  };

  render() {
    const responseGoogle = (response) => {
      console.log(response);
      this.signup(response);
    }
 
    return (
      <div className="App">
<AppBar  position="fixed" style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                <Grid justify="space-between"  container spacing={24}>
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

                      <GoogleLogin
                        clientId="487050070331-10md2t0pdqe7qtus6ig1ju6jtrdk22f4.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        scope="https://www.googleapis.com/auth/user.birthday.read" 
                        isSignedIn
                        />
                      
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