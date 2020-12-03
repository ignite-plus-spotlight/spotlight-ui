import React,{useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import Hidden from '@material-ui/core/Hidden';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
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

export default function CustomizedTables() {
  const classes = useStyles();
  const { width, height } = useWindowSize()
  const [stateAwards, setAwardsState] = useState([]) 
  
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );

  var current=value.data.empId;

  useEffect(()=> {
    getAward();
  },[]);

  const getAward=()=>{
    
    // console.log(current)
      axios
      //employee awards controller
      .get(`http://localhost:8081/employee/${current}/employeeawards`).
      then(data=>{
        console.log(data);
      
        setAwardsState(data.data)
        console.log(stateAwards)
      })
      .catch(err=>alert(err));
    };

  return (
      <>
            <Hidden xlUp color="secondary">
          <h1 align="center" >My Awards</h1>
        </Hidden>
        <Confetti
      width={width}
      height={height}
    />
    <TableContainer >
      <Table className={classes.table} aria-label="customized table"  style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}}>
          <TableRow>
            <StyledTableCell>Award Name</StyledTableCell>
            <StyledTableCell align="left">points</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Period</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {stateAwards.map(a=>  (
            <StyledTableRow key={a.awardName}>
              <StyledTableCell component="th" scope="row">
              {a.awardName}
              </StyledTableCell>
              <StyledTableCell align="left"><AdjustIcon/>{a.empPoints}</StyledTableCell>
              <StyledTableCell align="left">{a.description}</StyledTableCell>
              <StyledTableCell align="left">{a.periodName}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
  );
}