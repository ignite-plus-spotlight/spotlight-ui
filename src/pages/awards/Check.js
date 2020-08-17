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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';



const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

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
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
}));



function MembersVp() {
    const classes = useStyles();
    const [member, setMember] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem('userData')) 
      );
      var current=value.data.empId;
      const [entries, setEntries] = useState({
        data: [
            {
                firstName: "",
                lastName: "",
                email: "",
            }
        ]
    });

    const [state] = React.useState({
        columns: [
            { title: "First Name", field: "firstName"},
            { title: "Last Name", field: "lastName" },
            { title: "Email", field: "email" }
        ]
    });
     
      useEffect(()=> {
        getMember();
      },[]);

      const getMember=()=>{
        console.log(current)
          axios
          .get(`http://localhost:8081/levels/${current}`).
          then(res=>{
            let data = [];
            res.data.map(el => {
              el.children.map(emp=>{
                emp.children.map(em=>{
                  data.push({
                    firstName: em.value.firstName,
                    lastName: em.value.lastName,
                  email: em.value.empEmail,
                })
              })
               
            });
        });
            setEntries({ data: data });
            // console.log(data.data.teams[0].teamMembers[0]);
            // console.log(data.data[0].children[0].children[0].value.firstName)
            setMember(res.data)
            // console.log(team)
          })
          .catch(err=>alert(err));
        };
      
    return (
        <Layout>       
              {member.map(member=>  (     

        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><b> Director : </b>{member.value.firstName} {member.value.lastName}</Typography>
            <Typography className={classes.secondaryHeading}><b>Email : </b>{member.value.empEmail}</Typography>        
          </AccordionSummary>
           <Typography>
           {member.children.map(emp=> (  
             <>
            <AccordionSummary
          // expandIcon={<ExpandMoreIcon/>}
          // aria-controls="panel1a-content"
          // id="panel1a-header"
        >
          <Typography className={classes.heading}><b> Manager : </b>{emp.value.firstName} {emp.value.lastName}</Typography>
            <Typography className={classes.secondaryHeading}><b>Email : </b>{emp.value.empEmail}</Typography>        
          </AccordionSummary>
            <AccordionDetails>
            <MaterialTable
              title="Members"
              icons={tableIcons}
              columns={state.columns}
              data={entries.data}
              />
        </AccordionDetails>
        {/* </AccordionSummary> */}
        {/* </AccordionSummary> */}
        </>
        ))}
          </Typography>

  
         
       
      </Accordion>
          
       ))} 
          
    </Layout>
    )
}
export default MembersVp