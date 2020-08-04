import React from 'react'
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Layout from '../layout/Layout';
import {Typography} from '@material-ui/core';

export default function Activity() {
    return (
        // <Layout>
         <div>
         <Hidden xlUp color="secondary">
             <Paper>
         <Typography variant="h4" align="center" component="h1" gutterBottom>
         MEMBERS
      </Typography>
            </Paper>
            </Hidden> 
         </div>
        // </Layout>
    )
}