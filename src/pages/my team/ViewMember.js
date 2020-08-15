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



function ViewMember() {
    const classes = useStyles();
    const [team, setTeam] = useState([]);
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem('userData')) 
      );
      var current=value.data.empId;
      useEffect(()=> {
        getTeam();
      },[]);

      const getTeam=()=>{
        console.log(current)
          axios
          .get(`http://localhost:8081/manager/${current}`).
          then(data=>{
            // console.log(data.data.teams[0].teamMembers[0]);
            console.log(data.data.teams)
            setTeam(data.data.teams)
            // console.log(team)
          })
          .catch(err=>alert(err));
        };
      
    return (
        <Layout>  
           <ParticlesBg color="#FF0000" type="cobweb" bg={true} />     
               {team.map(team=>  (     
           <> 
        <Hidden xlUp color="secondary">
               <h1 align="center">Team Name : {team.teamName}</h1>
        </Hidden>
      <TableContainer >
      <Table className={classes.table} aria-label="customized table" style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead>
          <TableRow>
            {/* <StyledTableCell> Employee Id</StyledTableCell> */}
            <StyledTableCell align="left">First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Email id</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
 {team.teamMembers.map(teamMember=>(
             <StyledTableRow >
              {/* <StyledTableCell component="th" scope="row">
                {()=>console.log(team[0])}
                {teamMember.empId}
              </StyledTableCell> */}
              <StyledTableCell align="left">{teamMember.firstName}</StyledTableCell>
              <StyledTableCell align="left">{teamMember.lastName}</StyledTableCell>
              <StyledTableCell align="left">{teamMember.empEmail}</StyledTableCell>
            
            </StyledTableRow> 
   ))}  
        </TableBody>
      </Table>
    </TableContainer>
    </>   
      ))}
    </Layout>
    )
}
export default ViewMember