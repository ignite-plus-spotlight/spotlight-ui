import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Layout from '../layout/Layout';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { red } from '@material-ui/core/colors';

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
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
        
      borderBottom: 'unset',
    },
 

  }

});

function createData(Date,Awardname, Points,Period ) {
  return {
      
    Date,
    Awardname,
    Points,
    Period,
   
    history: [
      { awardedby: 'Anusha', description: 'hardworker' },
      
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
      
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Date}
        </TableCell>
        <TableCell align="right">{row.Awardname}</TableCell>
        <TableCell align="right">{row.Points}</TableCell>
        <TableCell align="right">{row.Period}</TableCell>
        
        
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Awarded by</StyledTableCell>
                    <StyledTableCell>description</StyledTableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.awardedby}>
                      <TableCell component="th" scope="row">
                        {historyRow.awardedby}
                      </TableCell>
                      <TableCell>{historyRow.description}</TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    
    Awardname: PropTypes.string.isRequired,
    Points: PropTypes.number.isRequired,
    Period: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        awardedby: PropTypes.number.isRequired,
       description: PropTypes.string.isRequired,
        
      }),
    ).isRequired,
    Date: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('12-11-20','leadership','60', 'monthly'),
  createData('01-11-20','leadership','60', 'monthly'),
  createData('30-11-20','leadership','60', 'monthly'),
  
];

export default function CollapsibleTable() {
  return (
    // <Layout>
                <div >
          <Hidden xlUp color="secondary">
          <Paper><h1 align="center" >Individual Awards</h1></Paper>
        </Hidden>
        
    {/* <Grid container alignItems="center" spacing={2} > */}
    {/* <Grid item xs={6}  > */}

    <TableContainer component={Paper} >
      <Table aria-label="collapsible table" style={{ width: 600, margin: 'auto' }} Color= 'secondary'
>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Awardname</StyledTableCell>
            <StyledTableCell align="right">points</StyledTableCell>
            <StyledTableCell align="right">period</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    {/* </Grid>
    </Grid> */}
    
    </div>

    // </Layout>
  );
}