import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Typography, Divider, IconButton, Avatar, Paper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { ChevronLeft, Create, AccountCircle } from '@material-ui/icons';
import clsx from 'clsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useDashboardStyles from './customStyles/dashboardStyles';
import useDetails from './useDetails';
import EditProfile from './editProfile';
import Request from './request';
import NotFound from './notFound/notFound';

function Dashboard () {
  const classes = useDashboardStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [setData, getData, user] = useDetails();
  
  useEffect(() => {
    getData();
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const userDetails = [user.role, user.name, user.mobileNo, user.address]
  const dp = user.dp? user.dp:"/broken-image.jpg";

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography component="h1" variant="h5" color="primary" noWrap className={classes.title}>
            Profile
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft style={{fill: "#3f51b5"}} />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AccountCircle style={{fill: "#3f51b5"}} />
          </IconButton>
        </div>
        <Divider />
          <Paper className={classes.paper} elevation={3}>
            <Avatar variant={"square"} src={dp} style={{width: '100%',height: '100%'}} />
          </Paper>

          <Paper className={classes.paper} elevation={3}>
            <List>
            {['Role:', 'Name:', 'Mobile:', 'Address:'].map((text, index) => (
            <div>  
              <ListItem key={text}>
                <ListItemText primary={
                <div>
                  <Typography style={{color:'#808080'}}>{text}</Typography>
                  <Typography>{userDetails[index]}</Typography>
                </div>} 
                />
              </ListItem>
            </div>
            ))}
          </List>
          </Paper>
          <br/>
          <Paper className={classes.paper} elevation={3}>
            <a href='/dashboard/editprofile' className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
            </a>
          </Paper>

      </Drawer>
      <main className={classes.content}>
        {/* main content */}
        <Router>
          <Switch>
            <Route path="/dashboard/editprofile"><EditProfile /></Route>
            <Route exact path="/dashboard"><Request user={user} /></Route>
            <Route path="*"><NotFound /></Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default Dashboard;