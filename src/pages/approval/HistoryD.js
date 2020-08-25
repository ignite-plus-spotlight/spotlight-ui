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



function NominationHistory() {
    const classes = useStyles();
    const [approval, setApproval] = useState([]);
    const [rejection, setRejection] = useState([]);
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem('userData')) 
      );
      var current=value.data.empId;
      useEffect(()=> {
        getApproval();
      },[]);

      const getApproval=()=>{
        console.log(current)
          axios
          .get(`http://localhost:8081/approvalList/${current}`).
          then(data=>{
            // console.log(data.data.teams[0].teamMembers[0]);
            console.log(data.data)
            setApproval(data.data)
            // console.log(team)
          })
          .catch(err=>alert(err));
        };
        useEffect(()=> {
          getRejection();
        },[]);
  
        const getRejection=()=>{
          console.log(current)
            axios
            .get(`http://localhost:8081/rejections/${current}`).
            then(data=>{
              // console.log(data.data.teams[0].teamMembers[0]);
              console.log(data.data)
              setRejection(data.data)
              // console.log(team)
            })
            .catch(err=>alert(err));
          };
      
    return (
      <> 
               {/* <ParticlesBg color="#FF0000" type="cobweb" bg={true} /> */}
           
        <Hidden xlUp >
               <h1 align="center">Approval History</h1>
        </Hidden>
      <TableContainer>
      <Table className={classes.table} aria-label="customized table" style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}}>
          <TableRow>
            <StyledTableCell> Nominated By</StyledTableCell>
            <StyledTableCell align="left">Nominee</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {approval.map(a=>  (     
             <StyledTableRow >
        <StyledTableCell align="left">{a.managerName}</StyledTableCell>
        <StyledTableCell align="left">{a.nomineeName}</StyledTableCell>
        <StyledTableCell align="left">{a.description}</StyledTableCell>
            
            </StyledTableRow> 
               ))} 
        </TableBody>
      </Table>
    </TableContainer>


    {/* **************************Rejections******************* */}

    <Hidden xlUp >
               <h1 align="center">Rejection History</h1>
        </Hidden>
      <TableContainer>
      <Table className={classes.table} aria-label="customized table" style={{ width: 600, margin: 'auto' }} Color= 'secondary'>
        <TableHead style={{backgroundColor:CONST.COLOR.PRIMARY}}>
          <TableRow>
            <StyledTableCell> Nominated By</StyledTableCell>
            <StyledTableCell align="left">Nominee</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rejection.map(a=>  (     
             <StyledTableRow >
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
export default NominationHistory