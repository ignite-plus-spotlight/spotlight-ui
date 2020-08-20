import React, {useState, useEffect} from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import ParticlesBg from "particles-bg";


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
  const [stateAwards, setAwardsState] = useState([]) 

  useEffect(()=> {
    getAward();
  },[]);
  

  const getAward=()=>{
    axios
    .get(`http://localhost:8081/employee/employeeawards`).
    then(data=>{
      setAwardsState(data.data)
    })
    .catch(err=>alert(err));
  };

  return (
    <>
        <ParticlesBg color="#FF0000" type="cobweb" bg={true} />
      <CssBaseline />
      <main>
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            "Gratitude is the most exquisite form of courtesy."
            </Typography>
          </Container>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
            {stateAwards.map(a=>  (
                <Grid item  xs={12} sm={6} md={4}>
                  <Card className={classes.card}  >
                    <CardMedia
                      className={classes.cardMedia}
                      image={a.imgsrc}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h1">
                      {a.awardName} 
                      </Typography>
                      <Typography>
                        {a.department} - {a.periodName}
                      </Typography>
                      <Typography>
                        {a.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="secondary">
                        Like 
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
      </main>
    </>
  );
}