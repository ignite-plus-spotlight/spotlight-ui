import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import CONST from '../../constants/Constants';


const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.secondary.main,
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
}));



function HistoryVp() {
    const classes = useStyles();
    const [history, setHistory] = useState([]);
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem('userData')) 
      );
      var current=value.data.empId;
      useEffect(()=> {
        getHistory();
      },[]);

      const getHistory=()=>{
        console.log(current)
          axios
          .get(`http://localhost:8081/rejections/${current}`).
          then(data=>{
            // console.log(data.data.teams[0].teamMembers[0]);
            console.log(data.data)
            setHistory(data.data)
            // console.log(team)
          })
          .catch(err=>alert(err));
        };
      
    return (
      <> 
            
           
        <Hidden xlUp >
               <h1 align="center">Rejection History</h1>
        </Hidden>
      <TableContainer>
      <Table className={classes.table} aria-label="customized table" style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}}>
          <TableRow>
            {/* <StyledTableCell> Approved By</StyledTableCell> */}
            <StyledTableCell> Nominated By</StyledTableCell>
            <StyledTableCell> Nominee</StyledTableCell>
            <StyledTableCell >Description</StyledTableCell>
            {/* <StyledTableCell align="left">Process Name</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {history.map(a=>  (     
             <StyledTableRow >
              {/* <StyledTableCell component="th" scope="row">
                
                {a.directorName}
              </StyledTableCell> */}
              <StyledTableCell align="left">{a.managerName}</StyledTableCell>
              <StyledTableCell align="left">{a.nomineeName}</StyledTableCell>
              <StyledTableCell align="left">{a.description}</StyledTableCell>
            
            </StyledTableRow> 
              ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>   
    
   
    )
}
export default HistoryVp