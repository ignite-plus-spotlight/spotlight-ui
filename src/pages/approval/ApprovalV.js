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
  const [snackbarSuccess1, setsnackbarSuccess1] = React.useState(false);
  const [snackbarSuccess2, setsnackbarSuccess2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [snackbarFail1, setsnackbarFail1] = React.useState(false);
  const [snackbarFail2, setsnackbarFail2] = React.useState(false);
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
  const url2=`http://localhost:8081/vprejections/${current}`
  
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
                <StyledTableCell align="left"><Fab variant="extended" size="medium" style={{backgroundColor:"green",color:"white"}} align="left" onClick={()=>submit1(a)}>Approve</Fab></StyledTableCell>
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
 
        //   })}
}