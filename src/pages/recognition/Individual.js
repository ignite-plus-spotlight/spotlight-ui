import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Cookies from 'universal-cookie';
import Layout from '../layout/Layout'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(award_name, points, description, period, team) {
//   return { award_name, points, description, period, team };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  
// ];

export default function SimpleTable() {
  const classes = useStyles();

  
//   const url="http://localhost:8081/employee/${this.var}/employeeawards"
  
  
  const [stateAwards, setAwardsState] = useState([]) 
  
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;
//   console.log(value);
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
    .get(`http://localhost:8081/employee/${current}/employeeawards`).
    then(data=>{
    //   console.log(data);
    
      setAwardsState(data.data)
    })
    .catch(err=>alert(err));
  };

//   {console.log(stateAwards)}
//   {stateAwards.map(a=>{
  return (
    <Layout>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell>Award Name</TableCell>
            <TableCell align="left">Points</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Period</TableCell>
            {/* <TableCell align="right">Team Name</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {stateAwards.map(a=>  (
            <TableRow key={a.awardName}>
              <TableCell component="th" scope="row">
                {a.awardName}
              </TableCell>
              <TableCell align="left">{a.empPoints}</TableCell>
              <TableCell align="left">{a.description}</TableCell>
              <TableCell align="left">{a.periodName}</TableCell>
              {/* <TableCell align="right">{a.team}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Layout>
  );
 
        //   })}
}