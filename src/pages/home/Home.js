import React from 'react';

import Tooltip from '@material-ui/core/Tooltip'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import img1 from '../../assets/images/target3.jpg';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Fab from '@material-ui/core/Fab';
import {Link} from 'react-router-dom';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";



 function Home(props) {
    return (
        <>
        <div>
            <AppBar  position="fixed" style={{ background: 'transparent', boxShadow: 'none'}}>
                <Toolbar>
                <Grid justify="space-between"  container spacing={24}>
                    <Typography class="display-2" variant="h2" color="white">SPOTLIGHT
                    </Typography>
                </Grid>
                    <Grid item>
                        <div>
                            <Tooltip title="Want to Login?">
                            <Fab variant="extended" color="secondary" component={Link} to="/dashboard"><AccountCircleSharpIcon  />LOGIN</Fab>
                            </Tooltip>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            <MDBContainer>
            <MDBCarousel
              activeItem={1}
              length={3}
              showControls={false}
              showIndicators={false}
              className="z-depth-1"
            >
              <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src={img1} width="100%" height="100%"
                    />
                  </MDBView>
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
          </MDBContainer>
          </div>
          </>
    )}

export default Home;
