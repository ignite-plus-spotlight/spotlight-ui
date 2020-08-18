import React, {useState, useEffect} from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Layout from '../layout/Layout';
import axios from "axios";
import img1 from '../../assets/images/target1.jpg'
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import ParticlesBg from "particles-bg";
import Nominate from './Nominate';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


export default function Activity() {
  const classes = useStyles();
  const [stateNomination, setNominationState] = useState([]) 

  useEffect(()=> {
    getNomination();
  },[]);
  

  const getNomination=()=>{
 
    axios
    .get(`http://localhost:8081/nominationalert`).
    then(data=>{
      console.log(data);
    
      setNominationState(data.data)
    })
    .catch(err=>alert(err));
  };

  return (
    <Layout>
    <React.Fragment>
    <ParticlesBg color="#FF0000" type="cobweb" bg={true} />
      <CssBaseline />
      <main>
        <div align="right">
      </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
          {stateNomination.map(a=>  (
          
              <Grid item  xs={12} sm={6} md={4}>
                <Card className={classes.card}  >
                  <CardMedia
                    className={classes.cardMedia}
                    image={img1}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                     {a.pollName}
                    </Typography>
                    <Typography>
                     {a.description}
                    </Typography>
                    {/* <Typography>
                     {a.nominationStartDate}-{a.nominationEndDate}
                    </Typography> */}
                  </CardContent>
                  <CardActions>
                  <Nominate/>
                  </CardActions>
                </Card>
              </Grid>
           
              ))}  
          </Grid>
        </Container>
      </main>
    </React.Fragment>
    </Layout>
  );
}
