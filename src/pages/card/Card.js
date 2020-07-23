import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import img1 from '../../assets/images/target5.jpg';
import Layout from '../layout/Layout';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Cards(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [stateAwards, setAwardsState] = useState([])  

  useEffect(()=> {
    getAward();
  },[]);

  const getAward=()=>{
    axios
    .get("http://localhost:8081/awards").
    then(data=>{
      console.log(data);
      setAwardsState(data.data)
    })
    .catch(err=>alert(err));
  };


  return (
      <Layout>
          <div className="container">
          {console.log(stateAwards)}
    <Card className={classes.root} >
    {stateAwards.map(a=>{
       return(
        <>
      <CardHeader
        avatar={
          <Avatar aria-label="nomination" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={a.award_name}
        subheader={a.points}
      />
      <CardMedia
        className={classes.media}
        image={img1}
       
      />
      <CardContent>
        <Typography variant="body2" >
        {a.description}
        </Typography>
      </CardContent>
      </>
      )})}
      
    </Card>
    </div>
    </Layout>
  );
}
