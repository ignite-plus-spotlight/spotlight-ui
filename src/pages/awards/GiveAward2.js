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



// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(5),
//     },
//   },
//   formControl: {
//     margin: theme.spacing(0),
//     minWidth: 500,
//   },

//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   // input: {
//   //   borderRadius: 4,
//   //   position: 'relative',
//   //   backgroundColor: theme.palette.background.paper,
//   //   border: '1px solid #ced4da',
//   //   fontSize: 13,
//   //   padding: '0px 25px 0px 23px',
//   //   transition: theme.transitions.create(['border-color', 'box-shadow']),
    
   
//   //   '&:focus': {
//   //     borderRadius: 4,
//   //     borderColor: '#80bdff',
//   //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//   //   },
//   // },
// }))(InputBase);

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
  const [stateAwards, setAwardsState] = useState([]) 
  const [stateEmployee, setEmployeeState] = useState([]) 
  

const [data,setData]=useState({
  // empId:"",
  // awardName:"",
  // periodName:"",
  // department:"",
  // // period:"",
  // // team:""
})


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
      getAward();
    },[]);
  
  const getAward=()=>{
      
      // console.log(current)
        axios
        .get(`http://localhost:8081/employee/individualawards`).
        then(data=>{
          console.log(data.data);
        
          setAwardsState(data.data)
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
      <Button variant="contained" color="secondary" onClick={handleClickOpen} fullWidth>
                      Give Award
      </Button>
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
          {stateAwards.map(a=> (
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
    </Layout>
  );
}
