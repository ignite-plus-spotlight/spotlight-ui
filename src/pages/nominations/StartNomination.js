import React,{useState,useEffect}from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import TextField from '@material-ui/core/TextField';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ParticlesBg from "particles-bg";
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import CONST from '../../constants/Constants';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));



export default function StartNominaton() {

    const classes = useStyles();

    const [data,setData]=useState({
      pollName:"",
      description:"",
      pollStart:"",
      pollEnd:"",
      period :""
    })

    function handle(e) {
      const newdata={...data}
      newdata[e.target.id]=e.target.value
      setData(newdata)
      console.log(data);
    }
    const url=`http://localhost:8081/postmultiple`
   


  const onSubmit = e => {
    // e.preventDefault()
    axios.post(url,data,{
      headers: {
        'Content-Type': 'application/json',
    }
    }).then(res=>{
      setsnackbarSuccess(true);
    }).catch(error=>{
      setsnackbarFail(true);
    })
  }
    
  const [snackbarSuccess, setsnackbarSuccess] = React.useState(false);
  const [snackbarFail, setsnackbarFail] = React.useState(false);
 


  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbarSuccess(false);

  };

 
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbarFail(false);
  };

    return (
        <>
          <Snackbar open={snackbarSuccess} autoHideDuration={6000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="success">
          Nomination Process started successfully
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarFail} autoHideDuration={3000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error">
         Oops ! Try Again 
        </Alert>
      </Snackbar>
          <ParticlesBg color="#FF0000" type="cobweb" bg={true} />
          <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
             <CssBaseline />
            

             <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate >

                   <Paper style={{ padding: 16 }}>
                   <Typography variant="h4" align="center" component="h1" gutterBottom>
                      Start Nomination
                  </Typography>
                  <Typography variant="h5" align="center" component="h2" gutterBottom>
                        Enter the Details
                  </Typography>
                          <Grid container alignItems="flex-start" spacing={2}>

                    

                       <Grid item xs={12}>
                          <Field
                            fullWidth
                            required
                            id="pollName"
                            name="Poll Name"
                            component={TextField}
                            type="text"
                            label="Nomination Name"
                            color="secondary"
                            input onChange={(e)=>handle(e)}
                            value={data.pollName}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <Field
                            fullWidth
                            required
                            id="period"
                            name="Nomination period"
                            component={TextField}
                            type="text"
                            color="secondary"
                            label="Nomination Period"
                            input onChange={(e)=>handle(e)}
                            value={data.period}
                          />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          name="Nomination Description"
                          fullWidth
                          id="description"
                          // color={CONST.COLOR.PRIMARY}
                          component={TextField}
                          type="text"
                          label="Nomination Description"
                          color="secondary"
                          input onChange={(e)=>handle(e)}
                          value={data.description}
  
                        />
                      </Grid>
               
                      <Grid item xs={12}>
                 <TextField
                    id="pollStart"
                    label="Process Start Date"
                    type="datetime-local"                    
                    // defaultValue="2017-05-24T10:30"
                    input onChange={(e)=>handle(e)}
                    value={data.pollStartDate}
                    color="secondary"
                    // className={classes.textField}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                   <TextField
                    id="pollEnd"
                    label="Process End Date"
                    type="datetime-local"
                    // defaultValue="2017-05-24T10:30"
                    input onChange={(e)=>handle(e)}
                    value={data.pollEndDate}
                    color="secondary"
                    
                    // className={classes.textField}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                 </Grid>
               
                <Grid item style={{ marginTop: 16 }}>
                  
                   {/* <Button onClick={(e)=>onSubmit(e)} color="secondary">
       Send 
       </Button> */}
       <Button
                    variant="contained"
                    style={{backgroundColor:CONST.COLOR.PRIMARY,color:"white"}}
                    type="submit"
                    disabled={submitting}
                  >
                    START
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            </form>
        )}
      />
    </div>
        </>
    )
}