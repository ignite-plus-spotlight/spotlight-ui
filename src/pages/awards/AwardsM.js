import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import Layout from '../layout/Layout';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';


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



function AwardsM() {
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
              {team.map(team=>  (     
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Team Name : {team.teamName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Id</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Email id</StyledTableCell>
            <StyledTableCell align="right">Reward</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
 {/* {team.teamMember.map(teamMember=>( */}
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">

              </StyledTableCell>
              {/* <StyledTableCell align="right">{teamMember.empId}</StyledTableCell>
                <StyledTableCell align="right">{teamMember.firstName}</StyledTableCell>
                <StyledTableCell align="right">{teamMember.lastName}</StyledTableCell>
                <StyledTableCell align="right">{teamMember.email}</StyledTableCell> */}
            </StyledTableRow>
 {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
          </Typography>
          {/* })} */}
        </AccordionDetails>
      </Accordion>
      ))}
          
    </Layout>
    )
}
export default AwardsM