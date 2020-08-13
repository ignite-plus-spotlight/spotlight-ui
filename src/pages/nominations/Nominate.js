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
  

const [data,setData]=useState({
  description:""
})


   function submit(e) {
    e.preventDefault()
    // axios.post(url,data)
    // .then(res=>{
    //   console.log(res.data)
    // })
  }

  function handle(e) {
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }

  //poll

  const [award, setaward] = React.useState('');
  const handleChange = (event) => {
    setaward(event.target.value);
    console.log(event.target.value)
  };

  

  const [employee, setemployee] = React.useState('');
  const handleChange4 = (event) => {
    setemployee(event.target.value);
    console.log(event.target.value)
  };

//   const url=`http://localhost:8081/employee/${employee}/employeeawards/award/${award}/period/${period}/department/${department}/manager/${current}`
//   const [stateAwards, setAwardsState] = useState([]) 
  

//poll
  useEffect(()=> {
      receiveAward();
    },[]);
  
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
    <Layout>
    <React.Fragment>

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
                       id="demo-simple-select-outlined"
                       value={employee}
                       onChange={handleChange4}
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
          id="demo-simple-select-outlined"
        //   value={poll}
          onChange={handleChange}
          label="Poll"
          color="secondary"
          // input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {/* {stateGiveAwards.map(a=> (
          <MenuItem value={a.awardName}>{a.awardName}</MenuItem>
          
          ))} */}
         
        </Select>
      </FormControl>
      </div>
      <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField id="outlined-basic" label="Description" variant="outlined" color="secondary"/>
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
    </Layout>
  );
}