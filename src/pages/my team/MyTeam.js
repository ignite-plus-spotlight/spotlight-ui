import React,{useState,useEffect}from 'react';
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
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Layout from '../layout/Layout';
import img1 from '../../assets/images/target1.jpg'
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';






const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);





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
  // root: {
  //   maxWidth: 345,
  // },
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
  root: {
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
  
// }));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function MyTeam() {
  const classes = useStyles();
  const [team, setTeam] = useState([]) 
  const [member,  setMember] = useState([
  
  ]) 



// *******************************************************

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// *************************************************


  
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;
  const[teamMember,setTeamMember]=useState([]);
  
//   console.log(value);
// const[MemberList,setMember]=useState([])
  
const [data,setData]=useState({
  managerId:"",
  teamId:"",
  teamName:"",
  members:"",
  
})

  
  useEffect(()=> {
    getTeam();
  },[]);
  
const url=`http://localhost:8081/team/${data.members}/${data.managerId}/${data.teamId}`
  

  const getTeam=()=>{
    
  console.log(current)
    axios
    .get(`http://localhost:8081/manager/${current}`).
    then(data=>{
      console.log(data.data.teams[0].teamMembers);
      // const[teamMember,setTeamMember]=useState([]);
      setTeamMember(data.data.teams[0].teamMembers)
      console.log(teamMember)
      // console.log(data)

    
      setTeam(data.data.teams)
      // console.log(team)
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



  
  return (
    <Layout>
    <React.Fragment>

      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {team.map(a=>  (
            // {cards.map((card) => (
              <Grid item  xs={12} sm={6} md={4}>
                <Card className={classes.card}  >
                  <CardMedia
                    className={classes.cardMedia}
                    image={img1}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     Team Name : {a.teamName}
                    </Typography>
                    <Typography>
                      Team id :{a.teamId}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small" color="secondary">
                      Add Members
                    </Button> */}

            
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Button variant="contained" color="secondary" onClick={handleClickOpen} fullWidth>
                      ADD MEMBERS 
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                      <DialogContent >
                      <DialogTitle id="form-dialog-title" >ADD MEMBERS</DialogTitle>
                        <DialogContentText>
                          Please Enter The Details
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="managerId"
                          label="Manager Id"
                          type="text"
                          input onChange={(e)=>handle(e)}
                          value={data.managerId}
                          fullWidth
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="teamId"
                          label="Team id"
                          type="text"
                          input onChange={(e)=>handle(e)}
                          value={data.teamId}
                          fullWidth
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="teamName"
                          label="Team name"
                          type="text"
                          input onChange={(e)=>handle(e)}
                          value={data.teamName}
                          fullWidth
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="members"
                          label=" Members"
                          type="text"
                          input onChange={(e)=>handle(e)}
                          value={data.members}
                          fullWidth
                        />
                        
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={(e)=>submit(e)} color="secondary">
                        Send 
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button variant="contained" color="secondary" component={Link} to="/viewMembers"  fullWidth>
                      VIEW MEMBERS  
                    </Button>           
      </main>

    </React.Fragment>
    </Layout>
  );
}