import React,{useState, useEffect} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
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
  const [snackbarSuccess1, setsnackbarSuccess1] = React.useState(false);
  const [snackbarSuccess2, setsnackbarSuccess2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackbarFail1, setsnackbarFail1] = React.useState(false);
  const [snackbarFail2, setsnackbarFail2] = React.useState(false);
  const [stateNominee, setNomineeState] = useState([]) 
  const [nominee,setNominateValue]=useState({
  })

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarSuccess1(false);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarFail1(false);
  };

  const handleCloseRejection1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarSuccess2(false);
  };

  const handleCloseRejection2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackbarFail2(false);
  };

  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;
  const [data,setData]=useState({
  })

  useEffect(()=> {
    getNominee();
  },[]);
  
  const getNominee=()=>{
    
  console.log(current)
    axios
    //NominationsController
    .get(`http://localhost:8081/ApproveAlert/${current}`).
    then(data=>{
    setNominateValue(data.data)
    console.log(nominee);
      setNomineeState(data.data)
    })
    .catch(err=>alert(err));
  };

  //NominationsController
  const url1=`http://localhost:8081/OnclickApprove/${current}`
  function submit1(a) {
    console.log(a)
    axios.post(url1,a)
    .then(res=>{
        setOpen(false);
        setsnackbarSuccess1(true);
    })
    .catch(error=>{
        setsnackbarFail1(true);
    })
  }

  //RejectedNominationsController
  const url2=`http://localhost:8081/rejections/${current}`
  
  function submit2(a) {
    console.log(a)
    axios.post(url2,a)
    .then(res=>{
        setOpen(false);
        setsnackbarSuccess2(true);
    })
    .catch(error=>{
        setsnackbarFail2(true);
    })
  }

  return (
      <>
        <Snackbar open={snackbarSuccess1} autoHideDuration={6000} onClose={handleClose1}>
          <Alert onClose={handleClose1} severity="success">
            Approved Successfully
          </Alert>
        </Snackbar>

        <Snackbar open={snackbarFail1} autoHideDuration={6000} onClose={handleClose2}>
          <Alert onClose={handleClose2} severity="error">
          Connection Error ! Try Again 
          </Alert>
        </Snackbar>

        <Snackbar open={snackbarSuccess2} autoHideDuration={6000} onClose={handleCloseRejection1}>
          <Alert onClose={handleClose1} severity="success">
            Rejected Successfully
          </Alert>
        </Snackbar>

        <Snackbar open={snackbarFail2} autoHideDuration={6000} onClose={handleCloseRejection2}>
          <Alert onClose={handleClose2} severity="error">
          Connection Error ! Try Again 
          </Alert>
        </Snackbar>

        <TableContainer >
     
          <div>
          <Table className={classes.table} aria-label="customized table"  style={{ width: 600, margin: 'auto' }} Color= 'secondary'>

            <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}}>
              <TableRow>
                <StyledTableCell align="left">Process Name </StyledTableCell>
                <StyledTableCell align="left">Manager Name</StyledTableCell>
                <StyledTableCell align="left">Period</StyledTableCell>
                <StyledTableCell align="left">Nominee </StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
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
                <StyledTableCell align="left"><Fab variant="extended" size="medium" style={{backgroundColor:"green",color:"white"}} align="left" onClick={()=>submit1(a)} >Approve</Fab></StyledTableCell>
                <StyledTableCell align="left"><Fab variant="extended" size="medium" style={{backgroundColor:CONST.COLOR.PRIMARY,color:"white"}} align="left" onClick={()=>submit2(a)} >Reject</Fab></StyledTableCell>
                </StyledTableRow> 
                </>
              ))}  
            </TableBody>

          </Table>
          </div>
       </TableContainer>
    </>
  );
}