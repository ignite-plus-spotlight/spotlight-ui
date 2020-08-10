import React,{useState,useEffect}from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import axios from "axios";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Layout from '../layout/Layout'
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


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


    //  function submit(e) {
    //   e.preventDefault()
    //   axios.post(url,data)
    //   .then(res=>{
    //     console.log(res.data)
    //   })
    // }
    const useStyles = makeStyles((theme) => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.secondary.main,
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

                <FormControl className={classes.margin}>
                   <InputLabel id="demo-customized-select-label">employee</InputLabel>
                   <Select
                       labelId="demo-customized-select-label"
                       id="demo-customized-select"
                       value={employee}
                       onChange={handleChange4}
                       input={<BootstrapInput />}
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

      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">award</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={award}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stateAwards.map(a=> (
          <MenuItem value={a.awardName}>{a.awardName}</MenuItem>
          
          ))}
         
        </Select>
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">period</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={period}
          onChange={handleChange2}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         
          <MenuItem value={"monthly"}>Monthly</MenuItem>
          <MenuItem value={"quarterly"}>Quarterly</MenuItem>
          <MenuItem value={"yearly"}>yearly</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">dep</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={department}
          onChange={handleChange3}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         
          <MenuItem value={"Technology"}>Technology</MenuItem>
          <MenuItem value={"Management"}>Management</MenuItem>
          <MenuItem value={"Finance"}>Finance</MenuItem>
        </Select>
      </FormControl>
      
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
