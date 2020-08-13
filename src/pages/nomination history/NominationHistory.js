import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import Layout from '../layout/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';



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



function NominationHistory() {
    const classes = useStyles();
    const [nomination, setNomination] = useState([]);
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem('userData')) 
      );
      var current=value.data.empId;
      useEffect(()=> {
        getNomination();
      },[]);

      const getNomination=()=>{
        console.log(current)
          axios
          .get(`http://localhost:8081/nominationhistoryfromdto/manager/${current}`).
          then(data=>{
            // console.log(data.data.teams[0].teamMembers[0]);
            console.log(data.data)
            setNomination(data.data)
            // console.log(team)
          })
          .catch(err=>alert(err));
        };
      
    return (
        <Layout>       
               {nomination.map(a=>  (     
           <> 
        <Hidden xlUp color="secondary">
               <h1 align="center">Nomination History</h1>
        </Hidden>
      <TableContainer>
      <Table className={classes.table} aria-label="customized table" style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead>
          <TableRow>
            <StyledTableCell> Poll Name</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Employee Name</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
 {/* {team.employee.map(teamMember=>( */}
             <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                
                {a.pollName}
              </StyledTableCell>
              <StyledTableCell align="left">{a.description}</StyledTableCell>
              <StyledTableCell align="left">{a.employee.firstName}</StyledTableCell>
              <StyledTableCell align="left">{a.createDate}</StyledTableCell>
            
            </StyledTableRow> 
   {/* ))}   */}
        </TableBody>
      </Table>
    </TableContainer>
    </>   
      ))}
    </Layout>
    )
}
export default NominationHistory