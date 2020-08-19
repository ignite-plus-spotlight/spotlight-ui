import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import Layout from '../layout/Layout';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
  root: {
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function Members() {
    const classes = useStyles();
    const [member, setMember] = useState([]);
    const [open, setOpen] = React.useState(false);
  const [employee, setemployee] = React.useState('');
  const [stateGiveAwards, setGiveAwardsState] = useState([]) 
  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem('userData')) 
      );
      var current=value.data.empId;

      const handleClickOpen = (emp) => {
        console.log(emp)
        setemployee(emp)
                setOpen(true);
                
      };

      const handleClickOpen1 = (member) => {
        console.log(member)
        setemployee(member)
                setOpen(true);
                
      };

      const handleClose = () => {
        setOpen(false);
      };
      const [data,setData]=useState({
      })
      
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

      useEffect(()=> {
        getMember();
      },[]);

      const getMember=()=>{
        console.log(current)
          axios
          .get(`http://localhost:8081/levels/${current}`).
          then(data=>{
            // console.log(data.data.teams[0].teamMembers[0]);
            console.log(data.data[0].children[0].value.firstName)
            setMember(data.data)
            // console.log(team)
          })
          .catch(err=>alert(err));
        };
      
        function submit(e) {
          axios.post(url,data)
          .then(res=>{
            console.log(res)
          // setsnackbarSuccess(true);
          // reload();
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
        const url=`http://localhost:8081/employee/${employee}/employeeawards/award/${award}/period/${period}/department/${department}/manager/${current}`
     
        useEffect(()=> {
            receiveAward();
          },[]);
      
        const reload=()=>window.location.reload();
        
        const receiveAward=()=>{
              axios
              .get(`http://localhost:8081/employee/individualawards`).
              then(data=>{
                console.log(data.data);
                setGiveAwardsState(data.data)
              })
              .catch(err=>alert(err));
            };



    return (
        <Layout>     
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
              {member.map(member=>  (     
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><b> Manager : </b>{member.value.firstName} {member.value.lastName}</Typography>
            <Typography className={classes.secondaryHeading}><b>Email : </b>{member.value.empEmail}</Typography>        
          </AccordionSummary>
          <StyledTableCell align="left"><Fab variant="extended" color="secondary" onClick={()=>handleClickOpen1(member.value.empId)} align="right">
        Award
     </Fab></StyledTableCell> 
        <AccordionDetails>
            <Typography>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Email id</StyledTableCell>
            <StyledTableCell align="left">Give Award</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {member.children.map(emp=> (            
        <StyledTableRow >

                <StyledTableCell align="left">{emp.value.firstName}</StyledTableCell>
                <StyledTableCell align="left">{emp.value.lastName}</StyledTableCell>
                <StyledTableCell align="left">{emp.value.empEmail}</StyledTableCell>
                <StyledTableCell align="left"><Fab variant="extended" color="secondary" onClick={()=>handleClickOpen(emp.value.empId)} align="right">
             Award
            </Fab></StyledTableCell>

            </StyledTableRow>
  ))}
        </TableBody>
      </Table>


    </TableContainer>
          </Typography>
          {/* })} */}
        </AccordionDetails>
       
      </Accordion>
      
       ))} 
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <DialogContent >
            <DialogTitle id="form-dialog-title" >Give Award</DialogTitle>
                <DialogContentText>
                    Please Enter The Details
                </DialogContentText>
                <div>
                <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Award</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={award}
          onChange={handleChange}
          label="Award"
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
          {/* <MenuItem value={"quarterly"}>Quarterly</MenuItem>
          <MenuItem value={"yearly"}>yearly</MenuItem> */}
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
    </Layout>
    )
}
export default Members