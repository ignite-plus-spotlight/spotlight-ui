import React from 'react';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,
   Typography, Paper, Grid, CssBaseline,FormControlLabel, } from '@material-ui/core';
import { Form, Field } from 'react-final-form'
import Layout from '../layout/Layout';
import {makeStyles} from '@material-ui/core/styles'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';



export default function AddMembers(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async values => {
  };

  const useStyles = makeStyles((theme) => ({
    
    root: {
      
      '& > *': {
        margin: theme.spacing(3),
        width: '70ch',
        
      },
    },
  }));
  const classes = useStyles();

  return (
      // <Layout>
       <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      
      <Form
        
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}  className={classes.root} noValidate>
           
            <Paper style={{ padding: 16 }} >
            
            <Typography variant="h4" align="center" component="h1" gutterBottom>
           
         ADD MEMBERS
         
      </Typography>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
        
          <TextField
            // autoFocus
            required
            fullWidth
            margin="dense"
            id="name"
            label="Name"
            name="name"
            type="text"
            color="secondary"
            // variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}


          />

          <TextField
            required
            fullWidth
            margin="dense"
            id="name"
            label="Role"
            name="role"
            type="text"
            color="secondary"
            // variant="outlined"
          />

          <TextField
            required
            fullWidth
            margin="dense"
            id="name"
            label="Team"
            name="team"
            type="text"
            color="secondary"
            // variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                 < SupervisorAccountIcon/>
                </InputAdornment>
              ),
            }}
          />

         {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary">
            Confirm And Submit
          </Button>
        </DialogActions>
      {/* </Dialog> */}
     </Grid>
     </Grid>
     </Paper>
     </form>
        )}
     />
    </div>
    
  // </Layout>
  );
}
