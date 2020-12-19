import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, TextField, Button, Link, Breadcrumbs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Create, Dashboard } from '@material-ui/icons';
import useDetails from './useDetails';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

function EditProfile () {
  const [setData, getData, user] = useDetails();
  const [file, setFile] = useState(null);
  const initials = {name:'',mobileNo:'',address:''};
  const [updated, setUpdate] = useState(initials);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate({...updated, [name]: value})
  };

  const onChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email',user.email);
    data.append('name',updated.name);
    data.append('mobileNo',updated.mobileNo);
    data.append('address',updated.address);
    data.append('file',file);
    const url = 'http://localhost:9000/dashboard/editprofile/upload';
    const res = await axios.post(url,data);
    console.log(res);
  };

  useEffect(()=> {
    getData();
	},[])

  const classes = useStyles();
  return(
    <React.Fragment>
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        href="/dashboard"
        className={classes.link}
      >
        <Dashboard className={classes.icon} />
        Dashboard
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        <Create className={classes.icon} />
        Edit Profile
      </Typography>
    </Breadcrumbs>
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={9} lg={7}>
      <Paper elevation={5}>
        <form onSubmit={handleSubmit}
         style={{
                margin:'5vh 10px 1.6vh 10px',
                padding:'5vh 10px',
                }}
         >
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} sm={7}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              placeholder={user.name}
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="mobileNo"
              label="Mobile Number"
              name="mobileNo"
              placeholder={user.mobileNo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              placeholder={user.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
          <Button variant="outlined" color="primary" component="label">
            Upload Image
            <input
            type="file"
            style={{display: "none"}}
            onChange={onChangeHandler}
            />
          </Button>
          </Grid>
          <Grid item xs={12} sm={7}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginBottom: '20px'}}
          >
            Update Profile
          </Button>
          </Grid>
      </Grid>
      </form>
      </Paper>
      </Grid>
    </Grid>
    </React.Fragment>
  )
};

export default EditProfile;