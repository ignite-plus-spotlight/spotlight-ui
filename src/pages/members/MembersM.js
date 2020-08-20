import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import Layout from '../layout/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ViewMember() {
    const classes = useStyles();
    const [team, setTeam] = useState([]);
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem('userData')) 
      );
  var current=value.data.empId;
  const [stateGiveAwards, setGiveAwardsState] = useState([]) 
  const [open, setOpen] = React.useState(false);
  const [employee, setemployee] = React.useState('');
  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);
      

      const handleClickOpen = (teamMember) => {
        console.log(teamMember)
        setemployee(teamMember.empId)
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
        getTeam();
      },[]);

      const getTeam=()=>{
        console.log(current)
          axios
          .get(`http://localhost:8081/manager/${current}`).
          then(data=>{
            console.log(data.data)
            setTeam(data.data.teams)
          })
          .catch(err=>alert(err));
        };
      
       
        function submit(e) {
          axios.post(url,data)
          .then(res=>{
            // console.log(res)
            setOpen(false);  
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
               {team.map(team=>  (     
           <> 
        <Hidden xlUp color="secondary">
               <h1 align="center">Team Name : {team.teamName}</h1>
        </Hidden>
      <TableContainer >
      <Table className={classes.table} aria-label="customized table" style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead>
          <TableRow>
            {/* <StyledTableCell> Employee Id</StyledTableCell> */}
            <StyledTableCell align="left">First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Email id</StyledTableCell>
            <StyledTableCell align="left">Give Awards</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
 {team.teamMembers.map(teamMember=>(
             <StyledTableRow >
              <StyledTableCell align="left">{teamMember.firstName}</StyledTableCell>
              <StyledTableCell align="left">{teamMember.lastName}</StyledTableCell>
              <StyledTableCell align="left">{teamMember.empEmail}</StyledTableCell>
              <StyledTableCell align="left"><Fab variant="extended" color="secondary" onClick={()=>handleClickOpen(teamMember)} align="right">
        Give Award
     </Fab></StyledTableCell>

            </StyledTableRow> 
   ))}  
        </TableBody>
      </Table>
    </TableContainer>
    </>   
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
export default ViewMember