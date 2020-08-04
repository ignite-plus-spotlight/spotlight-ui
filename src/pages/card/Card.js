import React, {useState, useEffect} from "react";
import { makeStyles,Card,CardHeader,CardMedia,CardContent,Avatar,IconButton,Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/Send';
import img1 from '../../assets/images/target5.jpg';
import Layout from '../layout/Layout';
import axios from "axios";
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { func } from "prop-types";




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

  const url="http://localhost:8081/nominations"
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [stateAwards, setAwardsState] = useState([]) 
  const [open, setOpen] = React.useState(false);
  const [data,setData]=useState({
    nominee:"",
    periodName:"",
    categoryName:"",
    award_name:"",
    nominated_by:"",
    message:""
  })



 

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

  function submit(e) {
    e.preventDefault()
    axios.post(url,data)
    .then(res=>{
      console.log(res.data)
    })
  }

  function handle(e) {
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }

  
  



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
      // <Layout>
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
            {/* <SendIcon /> */}
            <Fab variant="extended" color="secondary" onClick={handleClickOpen} >SEND</Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> Send Award</DialogTitle>
        <DialogContent>
        {/* <DialogContentText>
           
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="nominee"
            label="Nominee"
            type="text"
            input onChange={(e)=>handle(e)}
            value={data.nominee}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="periodName"
            label="Period"
            type="text"
            input onChange={(e)=>handle(e)}
            value={data.periodName}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category"
            type="text"
            input onChange={(e)=>handle(e)}
            value={data.categoryName}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="award_name"
            label="Award Name"
            type="text"
            input onChange={(e)=>handle(e)}
            value={data.award_name}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nominated_by"
            label="Nominated By"
            type="text"
            input onChange={(e)=>handle(e)}
            value={data.nominated_by}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            type="text"
            input onChange={(e)=>handle(e)}
            value={data.message}
            fullWidth
          />
        </DialogContent>
       
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={(e)=>submit(e)} color="secondary">
            Send <SendIcon/>
          </Button>
        </DialogActions>
      </Dialog>
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
    // </Layout>
  );
}
