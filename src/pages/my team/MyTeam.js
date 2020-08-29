import React,{useState,useEffect}from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import img1 from '../../assets/images/target1.jpg'
import axios from "axios";
import { red } from '@material-ui/core/colors';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ParticlesBg from "particles-bg";
import Fab from '@material-ui/core/Fab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CONST from '../../constants/Constants';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';


const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.secondary.main,
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
    // backgroundColor: theme.palette.primary.main,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
  
// }));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function MyTeam() {
  const classes = useStyles();
  const [team, setTeam] = useState([]) 




// *******************************************************

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (a) => {
    console.log(a)
    setTeamState(a);
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
  const [stateemployee, setemployeeState] = useState([]) 
  const [employee, setemployee] = React.useState('');
  const [stateTeam, setTeamState] = useState([]) 
  const handleChange2 = (event) => {
    setemployee(event.target.value);
    console.log(event.target.value)
  };

  
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
  
const url=`http://localhost:8081/team/${employee}/${current}/${stateTeam}`
  

  const getTeam=()=>{
    
  console.log(current)
    axios
    .get(`http://localhost:8081/manager/${current}`).
    then(data=>{
      console.log(data);
      setTeam(data.data.teams)
      // console.log(team)
    })
    .catch(err=>alert(err));
  };


  
  useEffect(()=> {
    employeeget();
  },[]);

const employeeget=()=>{
    
    
      axios
      .get(`http://localhost:8081/employee`).
      then(data=>{
        console.log(data.data);
      
        setemployeeState(data.data)
      })
      .catch(err=>alert(err));
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }    

  
  function submit(e) {
    e.preventDefault()
    axios.post(url,data)
    .then(res=>{
      setOpen(false)
      setsnackbarSuccess(true);
    }).catch(error=>{
      setsnackbarFail(true);
    })
  }

  function handle(e) {
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbarSuccess(false);


  };

  
  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);
  const reload=()=>window.location.reload();
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbarFail(false);
  };


  
  return (
   
    <React.Fragment>
    {/* <ParticlesBg color="#FF0000" type="cobweb" bg={true} /> */}
    <Snackbar open={snackbarSuccess} autoHideDuration={10000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success">
         Member Added Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarFail} autoHideDuration={10000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error">
         Oops ! Try Again 
        </Alert>
      </Snackbar>
      <CssBaseline />
      <main>
        <div align="right">
      
      </div>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
        
              <Grid item  xs={12} sm={6} md={4}>
                <Card className={classes.card}  >
                {team.map(a=>  (
                   <>
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
                    <>
                  <Fab variant="extended" size="medium" style={{backgroundColor:CONST.COLOR.PRIMARY,color:"white"}} onClick={()=>handleClickOpen(a.teamId)} align="right">
                    ADD MEMBERS
                </Fab>
                  </>
                  </CardActions>
                  </>
                         ))}
                        
                   </Card>
                   </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <DialogContent >
            <DialogTitle id="form-dialog-title" >Add Members</DialogTitle>
                <DialogContentText>
                    Please Enter The Details
                </DialogContentText>
<div>

<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label" color="secondary">Employee</InputLabel>
                   <Select
                       labelId="demo-simple-select-outlined-label"
                       id="demo-simple-select-outlined"
                       value={employee}
                       onChange={handleChange2}
                       label="Employee"
                       color="secondary"
                      
                   >
                       <MenuItem value="">
                         <em>None</em>
                       </MenuItem>
                       {stateemployee.map(a=> (
                        //  a.teamMembers.map(b=>(
                          <MenuItem value={a.empId}>{a.firstName}</MenuItem>
                        //  ))
                         
          
                       ))}
         
                    </Select>
                </FormControl>
                </div>
    </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} style={{color:CONST.COLOR.PRIMARY}}>
                          Cancel
                        </Button>
                        <Button onClick={(e)=>submit(e)} style={{color:CONST.COLOR.PRIMARY}}>
                        confirm 
                        </Button>
                      </DialogActions>
                    </Dialog>
        </Container>
            </main>
    </React.Fragment>
  
  );
}