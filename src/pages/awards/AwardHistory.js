import React,{useState, useEffect} from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import CONST from '../../constants/Constants';
import AdjustIcon from '@material-ui/icons/Adjust';

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
    minWidth: 700,
  },
});

export default function SimpleTable() {

  const classes = useStyles();
  
  const [stateAwards, setAwardsState] = useState([]) 
  
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );

  var current=value.data.empId;

  useEffect(()=> {
    getAward();
  },[]);
  
  const getAward=()=>{
    
    console.log(current)
      axios
      //employee awards controller
      .get(`http://localhost:8081/awardshistory/${current}`).
      then(data=>{
        console.log(data.data);
      
        setAwardsState(data.data)
      })
      .catch(err=>alert(err));
  };

  return (
    <>
    <TableContainer >
      <div>
        <h1 align="center" >GRANTS</h1>
         <Table className={classes.table} aria-label="customized table"  style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
            <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}}>
               <TableRow>
                 <StyledTableCell>Name </StyledTableCell>
                 <StyledTableCell align="left">Period</StyledTableCell>
                 <StyledTableCell align="left">Points</StyledTableCell>
                 <StyledTableCell align="left">Award</StyledTableCell>
               </TableRow>
            </TableHead>

            <TableBody>
              {stateAwards.map(a=> (          
                <>
                <StyledTableRow >
                  <StyledTableCell >{a.employee.firstName}</StyledTableCell>
                  <StyledTableCell align="left">{a.periodName}</StyledTableCell>
                  <StyledTableCell align="left"><AdjustIcon/>{a.empPoints}</StyledTableCell> 
                  <StyledTableCell align="left">{a.awardName}</StyledTableCell>
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