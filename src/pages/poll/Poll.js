import React, { useState } from "react";
import Layout from '../layout/Layout'
import {
    Typography,
    Paper,
    Grid,
    Button,
    CssBaseline,
    FormControlLabel,
  } from '@material-ui/core';
  import { Form, Field } from 'react-final-form'
import { Checkbox } from 'final-form-material-ui';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

const onSubmit = async values => {
};

function Poll() {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  const classes = useStyles();

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };


  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Description: ""}]);
  };


//  const url=`http://localhost:8081/${pollname}/${description}/${nomstart}/${nomend}/${pollstart}/${pollend}/${pollid}`

  return (
    <Layout>
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
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    color="secondary"
                    name="Poll Name"
                    component={TextField}
                    type="text"
                    label="Poll Name"
                  />
                </Grid>
                
      {inputList.map((x, i) => {
        return (
        <Grid item xs={12}>
        <Grid item xs={12}>
              <Field
                    name="Poll Description"
                    color="secondary"
                    fullWidth
                    component={TextField}
                    type="text"
                    label="Poll Description"
                    value={x.firstName}
                    onChange={e => handleInputChange(e, i)}
                  />
 </Grid>
            <Grid item xs={2}>
              {/* {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>} */}
              {inputList.length - 1 === i && 
              <Fab color="secondary" size="small" aria-label="add" onClick={handleAddClick}>
             <AddIcon />
            </Fab>}
              </Grid>
          
         </Grid>
        );
       })} 
       <Grid item xs={12}>
                 <TextField
                    id="datetime-local"
                    label="Nomination Start Date"
                    type="datetime-local"
                    color="secondary"
                    // defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                   <TextField
                    id="datetime-local"
                    label="Nomination End Date"
                    type="datetime-local"
                    color="secondary"
                    // defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                 </Grid>
                 <Grid item xs={12}>
                 <TextField
                    id="datetime-local"
                    label="Poll Start Date"
                    type="datetime-local"
                    color="secondary"
                    // defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                   <TextField
                    id="datetime-local"
                    label="Poll End Date"
                    type="datetime-local"
                    color="secondary"
                    // defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                     shrink: true,
                    }}
                 />
                 </Grid>
               {/* </form> */}
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
    </Layout>
  );
}

export default Poll;