import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import useHomeStyles from './customStyles/homeStyles';

export default function MainFeaturedPost() {
  const classes = useHomeStyles();
 
  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${require('../assets/images/homepage.jpg')})` }}>
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6} lg={4}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              VUber
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              VUber offers the safest and easiest way to ride, with multiple travel options and well-protected rides. With more than 3,00,000 vehicles in 100+ cities including Bangalore, Chennai, Delhi, Mumbai, Hyderabad, Kolkata, and Pune, VUber is the most popular ride hailing service in India.
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Where are you planning to go next? Complete our quick sign-up process and book your first ride.
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Some of the popular travel options available are: Micro, Mini, Prime and more.
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}