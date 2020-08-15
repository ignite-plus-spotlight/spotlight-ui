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

export default function ADDMembers() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
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
  const [stateemployee, setemployeeState] = useState([]) 
  const [stateTeam, setTeamState] = useState([]) 
  

const [data,setData]=useState({
  // empId:"",
  // awardName:"",
  // periodName:"",
  // department:"",
  // // period:"",
  // // team:""
})

const reload=()=>window.location.reload();

function submit(e) {
  axios.post(url,data)
  .then(res=>{
    // console.log(res)
  setsnackbarSuccess(true);
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


  const [team, setTeam] = React.useState('');
  const handleChange = (event) => {
    setTeam(event.target.value);
    console.log(event.target.value)
  };

  const [employee, setemployee] = React.useState('');
  const handleChange2 = (event) => {
    setemployee(event.target.value);
    console.log(event.target.value)
  };



  const url=`http://localhost:8081/team/${employee}/${current}/${team}`
//   const [stateAwards, setAwardsState] = useState([]) 
  
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

      useEffect(()=> {
        getTeam();
      },[]);

      const getTeam=()=>{
      
        // console.log(current)
          axios
          .get(`http://localhost:8081/team/${current}`).
          then(data=>{
            console.log(data.data);
          
            setTeamState(data.data)
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
        ADD MEMBERS
     </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <DialogContent >
            <DialogTitle id="form-dialog-title" >Add Members</DialogTitle>
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
                       onChange={handleChange2}
                       label="Employee"
                      //  input={<BootstrapInput />}
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
                <div>
                <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Team</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={team}
          onChange={handleChange}
          label="Team"
          // input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stateTeam.map(a=> (
          <MenuItem value={a.teamId}>{a.teamName}</MenuItem>
          
          ))}
         
        </Select>
      </FormControl>
      </div>
     
      
    </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={(e)=>submit(e)} color="secondary">
                        confirm 
                        </Button>
                      </DialogActions>
                    </Dialog>
                  
      </main>
 
    </React.Fragment> 
  
  );
}