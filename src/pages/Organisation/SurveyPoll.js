import React from 'react'
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Layout from '../layout/Layout';


export default function SurveyPoll() {
    return (
        <Layout>
        <div>
            <Hidden xlUp color="secondary">
          <Paper ><h1>Survey/Poll</h1></Paper>
        </Hidden>
        </div>
        </Layout>
    )
}