import React,{useState,useEffect}from 'react';
import axios from 'axios';
import { Form, Field } from 'react-final-form'
import { Checkbox } from 'final-form-material-ui';
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



export default function Poll() {

    const classes = useStyles();

    const [data,setData]=useState({
      pollName:"",
      // pollId:"",
      description:"",
      pollStart:"",
      pollEnd:"",
      nomStart:"",
      nomEnd:""
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
    })
    
};    
    return (
          <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
             <CssBaseline />
             <Typography variant="h4" align="center" component="h1" gutterBottom>
                 POLL
             </Typography>
             <Typography variant="h5" align="center" component="h2" gutterBottom>
                   Enter the Details
             </Typography>
             <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate >

                   <Paper style={{ padding: 16 }}>
                     <Grid container alignItems="flex-start" spacing={2}>
                       <Grid item xs={12}>
                          <Field
                            fullWidth
                            required
                            id="pollName"
                            name="Poll Name"
                            component={TextField}
                            type="text"
                            label="Poll Name"
                            input onChange={(e)=>handle(e)}
                            value={data.pollName}
                          />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          name="Poll Description"
                          fullWidth
                          id="description"
                          component={TextField}
                          type="text"
                          label="Poll Description"
                          input onChange={(e)=>handle(e)}
                          value={data.description}
                        />
                      </Grid>
               
                      <Grid item xs={12}>
                        <TextField
                            id="nomStart"
                            label="Nomination Start Date"
                            type="datetime-local"
                            input onChange={(e)=>handle(e)}
                            value={data.nominationStartDate}
                            // className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                      
                        <TextField
                          id="nomEnd"
                          label="Nomination End Date"
                          type="datetime-local"
                          input onChange={(e)=>handle(e)}
                          value={data.nominationEndDate}
                          InputLabelProps={{
                          shrink: true,
                          }}
                        />
                      </Grid>

                 <Grid item xs={12}>
                 <TextField
                    id="pollStart"
                    label="Poll Start Date"
                    type="datetime-local"
                    input onChange={(e)=>handle(e)}
                    value={data.pollStartDate}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                   <TextField
                    id="pollEnd"
                    label="Poll End Date"
                    type="datetime-local"
                    input onChange={(e)=>handle(e)}
                    value={data.pollEndDate}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                 </Grid>
               
                <Grid item xs={12}>
                  <FormControlLabel
                    label="Confirm"
                    control={
                      <Field
                        name="confirm"
                        component={Checkbox}
                        type="checkbox"
                      />
                    }
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={submitting}
                  >
                    Post
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            </form>
        )}
      />
    </div>
    )
}