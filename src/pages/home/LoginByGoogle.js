import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
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
import DashboardM from '../dashboard/DashboardM.js';
import Cookies from 'universal-cookie';
import DashboardT from '../dashboard/DashboardT';
import DashboardV from '../dashboard/DashboardV';
import ReactDOM from 'react-dom';
import ParticlesBg from "particles-bg";







export class Logintbygoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleName:''
    };

    // this.signup = this

    //   .signup

    //   .bind(this);

  }

  signup(res) {
    const googleresponse = {

      // emp_id: 1,
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
    // console.log(current);

    const cookies = new Cookies();
    cookies.set('login', current, { path: '/' });
    console.log(cookies.get('login')); 



    axios.post('http://localhost:8081/employee', googleresponse)
      .then((result) => {
        let responseJson = result;
        localStorage.setItem("userData", JSON.stringify(result));
        
      });
        
        axios.get(`http://localhost:8081/${current}/employeeroles`)
          .then(res => {
            const roles = res.data;
            this.setState({ roles });
            console.log(roles)
            if (roles[0].roleName == "leader")
            {
              // this.props.history.push('/DashboardV')
              // return ReactDOM.render(<DashboardV/>,document.getElementById('root'))
             return  <DashboardV/>
            }
            else {
              if(roles[0].roleName=="manager")
              {
              this.props.history.push('/DashboardM')
                // return ReactDOM.render(<DashboardM/>,document.getElementById('root'))
                return <DashboardM/>
              }
              else
              {
                if(roles[0].roleName=="team member")
                 {
                  this.props.history.push('/DashboardT')
                  // return ReactDOM.render(<DashboardT/>,document.getElementById('root'))
                  return <DashboardT/>
                }
                
              }
            }
            
           
          })
          
          
      
          
      // }
  };

  render() {
    const responseGoogle = (response) => {
      console.log(response);
      var res = response.profileObj;
      // console.log(res);
    //   debugger;
      this.signup(response);

    }

    return (
      <div className="App">
        {/* <ParticlesBg  type="cobweb" bg={true} /> */}

<AppBar  position="fixed" style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                <Grid justify="space-between"  container spacing={24}>
{/*                 
                    <Typography class="display-2" variant="h2" color="white">SPOTLIGHT
                    </Typography> */}
                    <Typical
        steps={['SPOTLIGHT', 1000, 'Employee Recognition Platform', 500]}
        loop={Infinity}
        wrapper="h1"
        text-color="black"
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
                scope="https://www.googleapis.com/auth/user.birthday.read" ></GoogleLogin>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
        
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* <MDBContainer>
            <MDBCarousel
              activeItem={1}
              length={3}
              showControls={false}
              showIndicators={false}
              className="z-depth-1"
            > */}
              {/* <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                  <MDBView> */}
                    <img
                      className="d-block w-100"
                      src={img1} width="100%" height="100%"
                    />
                  {/* </MDBView>
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel> */}
          {/* </MDBContainer> */}

      </div>
     

    )

  }

}


export default Logintbygoogle