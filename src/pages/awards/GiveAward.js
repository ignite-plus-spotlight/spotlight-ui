import React,{useState,useEffect}from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles ,withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Layout from '../layout/Layout';
import img1 from '../../assets/images/target1.jpg'
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from "axios";
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuItem from '@material-ui/core/MenuItem';

// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.secondary.main,
//     color: theme.palette.secondary.main,
//   },
//   body: {
//     fontSize: 14,
//   },
// }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.secondary.main,
//     },
//   },
// }))(TableRow);

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  // root: {
  //   maxWidth: 345,
  // },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
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
  


export default function MyTeam() {
  const classes = useStyles();
  // const [team, setTeam] = useState([]) 
  // const [member,  setMember] = useState([
  
  // ]) 



// *******************************************************

  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // }



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// *************************************************


  
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('userData')) 
  );
  var current=value.data.empId;
  const [stateAwards, setAwardsState] = useState([]) 
  

const [data,setData]=useState({
  // empId:"",
  // awardName:"",
  // periodName:"",
  // department:"",
  // // period:"",
  // // team:""
})

  useEffect(()=> {
    getAward();
  },[]);
  
  
const url=`http://localhost:8081/employee/${data.empId}/employeeawards/award/${data.awardName}/period/${data.periodName}/department/${data.department}/manager/${current}`
  const getAward=()=>{
    
  console.log(current)
    axios
    .get(`http://localhost:8081/employee/individualawards`).
    then(data=>{
      console.log(data.data);
    
      setAwardsState(data.data)
    })
    .catch(err=>alert(err));
  };
   function submit(e) {
    e.preventDefault()
    axios.post(url,data)
    .then(res=>{
      console.log(res.data)
    })
  }

  function handle(e) {
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }

  
const period = [
  {
    value: 'monthly',
    label: 'Monthly',
  },
  {
    value: 'quarterly',
    label: 'Quarterly',
  },
  {
    value: 'yearly',
    label: 'Yearly',
  },
];

const department = [
  {
    value: 'Technology',
    label: 'Technology',
  },
  {
    value: 'Management',
    label: 'Management',
  },
  {
    value: 'Finanace',
    label: 'Finanace',
  },
];

const [award, setaward] = React.useState('');
const handleChange = (event) => {
  setaward(event.target.value);
};

  return (
    <Layout>
    <React.Fragment>

      <CssBaseline />
      <main>
        <Button variant="contained" color="secondary" onClick={handleClickOpen} fullWidth>
                      Give Award
                    </Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                      <DialogContent >
                      <DialogTitle id="form-dialog-title" >Give Award</DialogTitle>
                        <DialogContentText>
                          Please Enter The Details
                        </DialogContentText>
                
                       <GiveAward2/>
                        
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={(e)=>submit(e)} color="secondary">
                        Send 
                        </Button>
                      </DialogActions>
                    </Dialog>
                  
      </main>

    </React.Fragment>
    </Layout>
  );
}