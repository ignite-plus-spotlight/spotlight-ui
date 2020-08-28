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
import CONST from '../../constants/Constants';
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';

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
    minWidth: 1000,
  },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }



export default function ApprovalD() {
  const classes = useStyles();
  const [snackbarSuccessApprove, setsnackbarSuccessApprove] = React.useState(false);
  const [snackbarSuccessReject, setsnackbarSuccessReject] = React.useState(false);
  const [snackbarFailReject, setsnackbarFailReject] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackbarFailApprove, setsnackbarFailApprove] = React.useState(false);
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

  const handleCloseApprove1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarSuccessApprove(false);
    

  };

  const handleCloseApprove2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarFailApprove(false);
  };

  const handleCloseReject1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarSuccessReject(false);
    

  };

  const handleCloseReject2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarFailReject(false);
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
    .get(`http://localhost:8081/vpsApprovalList/${current}`).
    then(data=>{
      console.log(data.data);
    setNominateValue(data.data[0])
    console.log(nominee);
      setNomineeState(data.data)
    })
    .catch(err=>alert(err));
  };

  const urlApprove=`http://localhost:8081/award/${current}`
  function submitApprove(a) {
    axios.post(urlApprove,a)
    .then(res=>{
        setOpen(false);
        setsnackbarSuccessApprove(true);
    })
    .catch(error=>{
        setsnackbarFailApprove(true);
    })
  }
  const urlReject=`http://localhost:8081/vprejections/${current}`
  function submitReject(a) {
    axios.post(urlReject,a)
    .then(res=>{
        setOpen(false);
        setsnackbarSuccessReject(true);
    })
    .catch(error=>{
        setsnackbarFailReject(true);
    })
  }

  return (
    <>
        <Snackbar open={snackbarSuccessApprove} autoHideDuration={6000} onClose={handleCloseApprove1}>
        <Alert onClose={handleCloseApprove1} severity="success">
          Approved Successfully and Award is sent!
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarFailApprove} autoHideDuration={6000} onClose={handleCloseApprove2}>
        <Alert onClose={handleCloseApprove2} severity="error">
         Oops ! Try Again 
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarSuccessReject} autoHideDuration={6000} onClose={handleCloseReject1}>
        <Alert onClose={handleCloseReject1} severity="success">
          Rejected !
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarFailReject} autoHideDuration={6000} onClose={handleCloseReject2}>
        <Alert onClose={handleCloseReject2} severity="error">
         Oops ! Try Again 
        </Alert>
      </Snackbar>
          {/* <ParticlesBg color="#FF0000" type="cobweb" bg={true} /> */}
    <TableContainer >
      {/* <div align="right" className="container"><GiveAward/></div> */}
      <div>
      <Table className={classes.table} aria-label="customized table"  style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}} >
          <TableRow>
            <StyledTableCell align="left">Director </StyledTableCell>
            <StyledTableCell align="left">Manager </StyledTableCell>
            <StyledTableCell align="left">Nominee</StyledTableCell>
            <StyledTableCell align="left">Description </StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>

{stateNominee.map(a=> (                 
                <>
                <StyledTableRow >
                 <StyledTableCell >{a.directorName}</StyledTableCell>
                <StyledTableCell align="left">{a.managerName}</StyledTableCell>
                <StyledTableCell align="left">{a.nomineeName}</StyledTableCell>
                <StyledTableCell align="left">{a.description}</StyledTableCell> 
                <StyledTableCell align="left"><Fab variant="extended" size="medium" style={{backgroundColor:"green",color:"white"}} align="left" onClick={()=>submitApprove(a)}>Approve</Fab></StyledTableCell>
                <StyledTableCell align="left"><Fab variant="extended" size="medium" style={{backgroundColor:CONST.COLOR.PRIMARY,color:"white"}} align="left" onClick={()=>submitReject(a)}>Reject</Fab></StyledTableCell>

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