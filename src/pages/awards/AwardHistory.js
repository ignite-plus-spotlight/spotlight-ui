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
import Layout from '../layout/Layout';
import Fab from '@material-ui/core/Fab';
import GiveAward from './GiveAward'
import Grid from '@material-ui/core/Grid'
import ParticlesBg from "particles-bg";

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


export default function SimpleTable() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
//   const url="http://localhost:8081/employee/${this.var}/employeeawards"
  
  
  const [stateAwards, setAwardsState] = useState([]) 
  
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
    getAward();
  },[]);
  

  const getAward=()=>{
    
  console.log(current)
    axios
    .get(`http://localhost:8081/manager/${current}/history/givenawards`).
    then(data=>{
      console.log(data.data.empAwardWinnersUnderManagerDTOS);
    
      setAwardsState(data.data.empAwardWinnersUnderManagerDTOS)
    })
    .catch(err=>alert(err));
  };


  return (
    <Layout>
          <ParticlesBg color="#FF0000" type="cobweb" bg={true} />
    <TableContainer >
      {/* <div align="right" className="container"><GiveAward/></div> */}
      <div>
      <Table className={classes.table} aria-label="customized table"  style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead >
          <TableRow>
            <StyledTableCell>Name </StyledTableCell>
            
            <StyledTableCell align="left">Department</StyledTableCell>
            <StyledTableCell align="left">Period</StyledTableCell>
            <StyledTableCell align="left">Points</StyledTableCell>
            <StyledTableCell align="left">Award</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>

{stateAwards.map(a=> (          
             
            
              a.employeeAwardsTMS.map(b=>(
                
                <>
                <StyledTableRow >
                 <StyledTableCell >{a.employee.firstName}</StyledTableCell>
                <StyledTableCell align="left">{b.department}</StyledTableCell>
                <StyledTableCell align="left">{b.periodName}</StyledTableCell>
                <StyledTableCell align="left">{b.empPoints}</StyledTableCell> 
                <StyledTableCell align="left">{b.awardName}</StyledTableCell>
                </StyledTableRow> 
                </>
               
              ))
  
           ))}  
         

      </TableBody>
      </Table>
      </div>
    </TableContainer>
    </Layout>
  );
 
        //   })}
}