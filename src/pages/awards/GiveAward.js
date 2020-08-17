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
  const [stateGiveAwards, setGiveAwardsState] = useState([]) 
  const [stateEmployee, setEmployeeState] = useState([]) 
  // ***********************
  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbarSuccess(false);
   

  };

  
 
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbarFail(false);
  };






//   ******************************************
const [data,setData]=useState({
  // empId:"",
  // awardName:"",
  // periodName:"",
  // department:"",
  // // period:"",
  // // team:""
})


   function submit(e) {
    axios.post(url,data)
    .then(res=>{
      // console.log(res)
    setsnackbarSuccess(true);
    reload();
        // console.log(res) 
    })
    .catch(error=>{
      setsnackbarFail(true);
    //   reload();

    })
  }

  function handle(e) {
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }


  const [award, setaward] = React.useState('');
  const handleChange = (event) => {
    setaward(event.target.value);
    console.log(event.target.value)
  };

  const [period, setperiod] = React.useState('');
  const handleChange2 = (event) => {
    setperiod(event.target.value);
    console.log(event.target.value)
  };

  const [department, setdepartment] = React.useState('');
  const handleChange3 = (event) => {
    setdepartment(event.target.value);
    console.log(event.target.value)
  };

  const [employee, setemployee] = React.useState('');
  const handleChange4 = (event) => {
    setemployee(event.target.value);
    console.log(event.target.value)
  };

  const url=`http://localhost:8081/employee/${employee}/employeeawards/award/${award}/period/${period}/department/${department}/manager/${current}`
//   const [stateAwards, setAwardsState] = useState([]) 
  
  useEffect(()=> {
      receiveAward();
    },[]);

    const reload=()=>window.location.reload();
  
  const receiveAward=()=>{
      
      // console.log(current)
        axios
        .get(`http://localhost:8081/employee/individualawards`).
        then(data=>{
          console.log(data.data);
        
          setGiveAwardsState(data.data)
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
            console.log(data.data.teams);
          
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
        Give Award
     </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <DialogContent >
            <DialogTitle id="form-dialog-title" >Give Award</DialogTitle>
                <DialogContentText>
                    Please Enter The Details
                </DialogContentText>
<div>

<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Employee</InputLabel>
                   <Select
                       labelId="demo-simple-select-outlined-label"
                       id="demo-simple-select-outlined"
                       value={employee}
                       onChange={handleChange4}
                       label="Employee"
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
        <InputLabel id="demo-simple-select-outlined-label">Award</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={award}
          onChange={handleChange}
          label="Award"
          // input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stateGiveAwards.map(a=> (
          <MenuItem value={a.awardName}>{a.awardName}</MenuItem>
          
          ))}
         
        </Select>
      </FormControl>
      </div>
      <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Period</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={period}
          onChange={handleChange2}
          label="Period"
          // input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         
          <MenuItem value={"monthly"}>Monthly</MenuItem>
          <MenuItem value={"quarterly"}>Quarterly</MenuItem>
          <MenuItem value={"yearly"}>yearly</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
        <Select
           labelId="demo-simple-select-outlined-label"
           id="demo-simple-select-outlined"
          value={department}
          onChange={handleChange3}
          label="Department"
          // input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         
          <MenuItem value={"Technology"}>Technology</MenuItem>
          <MenuItem value={"Management"}>Management</MenuItem>
          <MenuItem value={"Finance"}>Finance</MenuItem>
        </Select>
      </FormControl>
      </div>
    {/* </div> */}
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
                  
      </main>

    </React.Fragment>
 
  );
}

