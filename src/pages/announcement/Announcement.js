import React, {useState, useEffect} from "react";
import { Form, Field } from 'react-final-form'
import { TextField, Checkbox } from 'final-form-material-ui';
import {
  Typography,
  Paper,
  Grid,
  Button,
  CssBaseline,
  FormControlLabel,
} from '@material-ui/core';
import Layout from '../layout/Layout';
import InputAdornment from '@material-ui/core/InputAdornment';
import CreateIcon from '@material-ui/icons/Create';
import axios from "axios";

const onSubmit = async values => {
};


function Announcement() {
  const url="http://localhost:8081/announcement"
const [data,setData]=useState({
    subject:"",
    description:""
    
  })
  

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


  return (
      // <Layout>
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
         Announcement
      </Typography>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        Enter the Announcement
      </Typography>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }} >
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={6}>
                  <Field
                    fullWidth
                    required
                    margin="dense"
                    name="Subject"
                    component={TextField}
                    type="text"
                    id="subject"
                    label="Subject"
                    color="secondary"
                    input onChange={(e)=>handle(e)}
                    value={data.subject}
                  />
                </Grid>
              
                <Grid item xs={12}>
                  <Field
                    name="content"
                    fullWidth
                    required
                    margin="dense"
                    component={TextField}
                    type="text"
                    label="Content"
                    color="secondary"
                    id="description"
                    input onChange={(e)=>handle(e)}
                    value={data.description}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                         < CreateIcon/>
                        </InputAdornment>
                      ),
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
                  onClick={(e)=>submit(e)}
                    variant="contained"
                    color="secondary"
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
    // </Layout>
  );
}

export default Announcement;

