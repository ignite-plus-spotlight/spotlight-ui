import React,{useState, useEffect} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Cookies from 'universal-cookie';
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import CONST from '../../constants/Constants';

const StyledTableCell = withStyles((theme) => ({
  head: {
   
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


const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }



export default function ApprovalD() {
  const classes = useStyles();
  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);
  const [stateNominee, setNomineeState] = useState([]) 
  const [nominee,setNominateValue]=useState({
    // approvedById: "",
    // description: "",
    // directorName: "",
    // endDate: "",
    // managerId: "",
    // managerName: "",
    // nominationId: "",
    // nomineeName: "",
    // nominee_id: "",
    // processId: ""
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

  
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;
//   console.log(value);
  const [data,setData]=useState({
    // award_name:"",
    // points:"",
    // description:"",
    // period:"",
    // team:""
  })

  useEffect(()=> {
    getNominee();
  },[]);
  

  const getNominee=()=>{
    
  console.log(current)
    axios
    .get(`http://localhost:8081/ApproveAlert/${current}`).
    then(data=>{
      console.log(data.data[0].nominee.firstName);
    setNominateValue(data.data[0])
    console.log(nominee);
      setNomineeState(data.data)
    })
    .catch(err=>alert(err));
  };

  const url=`http://localhost:8081/OnclickApprove/${current}`
  function submit(e) {
    axios.post(url,nominee)
    .then(res=>{
        setOpen(false);
        setsnackbarSuccess(true);
    })
    .catch(error=>{
        setsnackbarFail(true);
    })
  }

  return (
    <>
        <Snackbar open={snackbarSuccess} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success">
          Approved Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarFail} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error">
         Oops ! Try Again 
        </Alert>
      </Snackbar>
          {/* <ParticlesBg color="#FF0000" type="cobweb" bg={true} /> */}
    <TableContainer >
      {/* <div align="right" className="container"><GiveAward/></div> */}
      <div>
      <Table className={classes.table} aria-label="customized table"  style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}}>
          <TableRow>
            <StyledTableCell align="left">Process Name </StyledTableCell>
            <StyledTableCell align="left">Manager Name</StyledTableCell>
            <StyledTableCell align="left">Period</StyledTableCell>
            <StyledTableCell align="left">Nominee </StyledTableCell>
            <StyledTableCell align="left">Approve</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

{stateNominee.map(a=> (                 
                <>
                <StyledTableRow >
                 <StyledTableCell >{a.processName}</StyledTableCell>
                <StyledTableCell align="left">{a.head.firstName}</StyledTableCell>
                <StyledTableCell align="left">{a.period}</StyledTableCell>
                <StyledTableCell align="left">{a.nominee.firstName} {a.nominee.lastName}</StyledTableCell> 
                <StyledTableCell align="left"><Fab variant="extended" color="secondary" align="left" onClick={(e)=>submit(e)}>Approve</Fab></StyledTableCell>
                </StyledTableRow> 
                </>
           ))}  
      </TableBody>
      </Table>
      </div>
    </TableContainer>
    </>
  );
 
        //   })}
}