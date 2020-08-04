import React from 'react';
import  Card  from './Card';
import Grid from '@material-ui/core/Grid';

function CardAlign(props) {
    const [spacing, setSpacing] = React.useState(2);
    return (
       
        <Grid container justify="center" spacing={spacing} setSpacing="2">
            <Grid item xs={12} s={6} md={4}>
            <Card/>
            </Grid>
           
            {/* <Grid item xs={12} s={6} md={4}>
            <Card/>
            </Grid>
            <Grid item xs={12} s={6} md={4}>
            <Card/>
            </Grid> */}

        </Grid>
        
    )
}

export default CardAlign
