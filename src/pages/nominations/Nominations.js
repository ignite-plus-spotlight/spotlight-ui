import React, {useState, useEffect} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from "axios";
import img1 from '../../assets/images/target1.jpg'
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CONST from '../../constants/Constants';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  
}));

export default function Nominations() {
  const classes = useStyles();
  const [stateNomination, setNominationState] = useState([]) 
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=> {
    getNomination();
  },[]);
  
  const [statePollName, setPollState] = useState([]) 
  const [stateEmployee, setEmployeeState] = useState([]) 
  const [pollId, setpollId] = useState([]) 
  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarSuccess(false);
  };

  function submit(e) {
    e.preventDefault()
    axios.post(url,data,{
      headers: {
        'Content-Type': 'application/json',
    }
  }) .then(res=>{
    setOpen(false)
    setsnackbarSuccess(true);
  })
  .catch(error=>{
    setsnackbarFail(true);
  })
    
  }
  const handleClickOpen = (a) => {
    console.log(a)
    setpollId(a)
            setOpen(true); 
            
  };

  const [employee, setemployee] = React.useState('');
  const handleChange1 = (event) => {
    setemployee(event.target.value);
    console.log(event.target.value)
  };
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;
  const [data,setData]=useState({
    description:"",
    managerId:current,   
  })

  //post nominate
  //nominations controller
  const url=`http://localhost:8081/nominate/${pollId}/${employee}`
  function handle(e) {
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarFail(false);
  };

  //all nominations present
  const getNomination=()=>{
 
    axios
    //NominationsDateController
    .get(`http://localhost:8081/nominationalert/${current}`).
    then(data=>{
      console.log(data);
      setNominationState(data.data)
    })
    .catch(err=>alert(err));
  };


      useEffect(()=> {
        getEmployee();
      },[]);

      //dropdown employees
      const getEmployee=()=>{
        // console.log(current)
          axios
          //EmployeeController
          .get(`http://localhost:8081/manager/${current}`).
          then(data=>{
            // console.log(data.data.teams);
            setEmployeeState(data.data.teams)
          })
          .catch(err=>alert(err));
        };


  return ( 
       <>
        <Snackbar open={snackbarSuccess} autoHideDuration={10000} onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="success">
            Nominated Successfully
          </Alert>
        </Snackbar>

        <Snackbar open={snackbarFail} autoHideDuration={10000} onClose={handleClose2}>
          <Alert onClose={handleClose2} severity="error">
          Oops ! Try Again 
          </Alert>
        </Snackbar>

      <CssBaseline />
        <main>
          <div align="right"></div>
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
                  </CardContent>                  
                  <CardActions> 
                    <Fab variant="extended" size="medium" style={{backgroundColor:CONST.COLOR.PRIMARY,color:"white"}} onClick={()=>handleClickOpen(a.processId)} align="right">
                      Nominate
                    </Fab>                 
                  </CardActions>              
                </Card>
              </Grid>
              ))}  
          </Grid>
        </Container>
      </main>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogContent >
          <DialogTitle id="form-dialog-title" >Nominate</DialogTitle>
            <DialogContentText>
                Please Enter The Details
            </DialogContentText>
              <div>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label"  color="secondary">
                  Employee
                </InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="employeeId"
                    value={employee}
                    onChange={handleChange1}
                    label="Employee"
                    color="secondary"
                >
                       <MenuItem value="">
                         <em>None</em>
                       </MenuItem>
                       {stateEmployee.map(a=> (
                         a.teamMembers.map(b=>(
                          <MenuItem value={b.empId}>{b.firstName}</MenuItem>
                         ))
                       ))}
         
                </Select>
                </FormControl>
                </div>
                <div> </div>
                <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                  label="Description" 
                  variant="outlined" 
                  color="secondary"
                  name="Poll Description"
                  fullWidth
                  id="description"
                  type="text"
                  input onChange={(e)=>handle(e)}
                  value={data.description}/>
                </FormControl>
                </div>

             </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} style={{color:CONST.COLOR.PRIMARY}}>
                          Cancel
                        </Button>
                        <Button onClick={(e)=>submit(e)} style={{color:CONST.COLOR.PRIMARY}}>
                        Nominate 
                        </Button>
                      </DialogActions>
                    </Dialog>
    </>
   
  );
}