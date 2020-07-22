import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Layout from '../layout/Layout';

export default function AddMembers() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Layout>
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen} fullWidth>
        ADD MEMBERS
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent >
        <DialogTitle id="form-dialog-title" >ADD MEMBERS</DialogTitle>
          <DialogContentText>
            Please Enter The Details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Role"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="ff1744">
            Cancel
          </Button>
          <Button onClick={handleClose} color="ff1744">
            Confirm And Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </Layout>
  );
}
