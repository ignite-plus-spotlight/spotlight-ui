import React,{useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Hidden from '@material-ui/core/Hidden';

import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

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


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [stateAwards, setAwardsState] = useState([]) 
  
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;

  const [data,setData]=useState({
    award_name:"",
    points:"",
    description:"",
    period:"",
    team:""
  })

  useEffect(()=> {
    getAward();
  },[]);

  const getAward=()=>{
    console.log(current)
    axios
    .get(`http://localhost:8081/employee/${current}`).
    then(data1=>{
      console.log(data1.data);
    })

    axios
    .get(`http://localhost:8081/teammember/${current}/teamawardstmd`).
    then(data=>{
      // console.log(data);
      setAwardsState(data.data)
    })
    .catch(err=>alert(err));
  };

    // {console.log(stateAwards)}
    const { width, height } = useWindowSize()

  return (
    <>
        <Hidden xlUp color="secondary">
          <h1 align="center" >My Team Awards</h1>
        </Hidden>
        <Confetti
      width={width}
      height={height}
    />
    <TableContainer >
      <Table className={classes.table} aria-label="customized table"  style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Award Name</StyledTableCell>
            <StyledTableCell align="left">points</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Team Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {stateAwards.map(a=>  (
            <StyledTableRow key={a.awardName}>
              <StyledTableCell component="th" scope="row">
              {a.awardName}
              </StyledTableCell>
              <StyledTableCell align="left">{a.teamPoints}</StyledTableCell>
              <StyledTableCell align="left">{a.description}</StyledTableCell>
              <StyledTableCell align="left">{a.teamName}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}