import React,{useState,useEffect}from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import axios from "axios";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../layout/Layout'
import { red } from '@material-ui/core/colors';
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
      formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
       
      }));

export default function CustomizedSelects() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;
  const [statePollName, setPollState] = useState([]) 
  const [stateEmployee, setEmployeeState] = useState([]) 
  


  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarSuccess(false);
    reload();

  };

  
 
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarFail(false);
  };



   function submit(e) {
    e.preventDefault()
    axios.post(url,data,{
      headers: {
        'Content-Type': 'application/json',
    }
    
  }) .then(res=>{
  setsnackbarSuccess(true);
  })
  .catch(error=>{
    setsnackbarFail(true);
  })
    
  }

  function handle(e) {
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }

  //poll

  const [pollName, setPollName] = React.useState('');
  const handleChange = (event) => {
    setPollName(event.target.value);
    console.log(event.target.value)
  };

  

  const [employee, setemployee] = React.useState('');
  const handleChange1 = (event) => {
    setemployee(event.target.value);
    console.log(event.target.value)
  };

  const [data,setData]=useState({
    description:"",
    managerId:current,   
  })
  const url=`http://localhost:8081/nominate/${pollName}/${employee}`
//   const [stateAwards, setAwardsState] = useState([]) 
const reload=()=>window.location.reload(); 

//poll
  useEffect(()=> {
    receivePollName();
    },[]);
  
  const receivePollName=()=>{
      
      // console.log(current)
        axios
        .get(`http://localhost:8081/poll`).
        then(data=>{
          // console.log(data.data);
        
          setPollState(data.data)
        })
        .catch(err=>alert(err));
      };

      useEffect(()=> {
        getEmployee();
      },[]);

      const getEmployee=()=>{
      
        // console.log(current)
          axios
          .get(`http://localhost:8081/manager/${current}`).
          then(data=>{
            // console.log(data.data.teams);
          
            setEmployeeState(data.data.teams)
          })
          .catch(err=>alert(err));
        };
      
  return (
    <React.Fragment>
    <Snackbar open={snackbarSuccess} autoHideDuration={10000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success">
          Awarded Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarFail} autoHideDuration={10000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error">
         Oops ! Try Again 
        </Alert>
      </Snackbar>
      <CssBaseline />
      <main>
      <Fab variant="extended" color="secondary" onClick={handleClickOpen} align="right">
        Nominate
     </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <DialogContent >
            <DialogTitle id="form-dialog-title" >Nominate</DialogTitle>
                <DialogContentText>
                    Please Enter The Details
                </DialogContentText>
<div>

<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label"  color="secondary">Employee</InputLabel>
                   <Select
                       labelId="demo-simple-select-outlined-label"
                       id="employeeId"
                       value={employee}
                       onChange={handleChange1}
                       label="Employee"
                       color="secondary"
                      //  input={<BootstrapInput />}
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
                <div>
                <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label"  color="secondary">Poll Name</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="pollId"
          value={pollName}
          onChange={handleChange}
          label="Poll"
          color="secondary"
          // input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {statePollName.map(a=> (
          <MenuItem value={a.pollId}>{a.pollName}</MenuItem>
          
          ))}
         
        </Select>
      </FormControl>
      </div>
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
      
    {/* </div> */}
    </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={(e)=>submit(e)} color="secondary">
                        Nominate 
                        </Button>
                      </DialogActions>
                    </Dialog>
                  
      </main>

    </React.Fragment>
  );
}