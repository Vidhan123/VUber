import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Button, CssBaseline, Toolbar, Typography, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp, PersonAdd, PowerSettingsNew } from '@material-ui/icons';
import Home from './home';
import SignInSide from './logIn';
import SignUp from './register'; 
import Dashboard from './dashboard';
import useAuth from './useAuth';
import NotFound from './notFound/notFound';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginLeft: '30px',
  },
}));

export default function userRouter() {
  const classes = useStyles();
  const [authorise, unauthorise, ProtectedRoutes] = useAuth();

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Switch>
            <Route exact path='/dashboard'>
              <Typography component="h1" variant="h5" color="primary" noWrap className={classes.title}>
                Dashboard
              </Typography>
            </Route>
            <Route path='/dashboard/editprofile'>
              <Typography component="h1" variant="h5" color="primary" noWrap className={classes.title}>
                Update Profile
              </Typography>
            </Route>
            <Route path='/'>
              <Link to="/">
                <img src={require('../assets/images/vuberlogo.png')} height="60" alt="logo" />
              </Link>
            </Route>
          </Switch>
          </Typography>
          <Switch>
          <Route path="/dashboard">
            <Link to='/'>
            <IconButton onClick={() => unauthorise()}>
              <PowerSettingsNew style={{fill: "#3f51b5"}}/>
            </IconButton>
            </Link>
          </Route>
          <Route path='/'>
            {/* For sm-xl screen sizes */}
            <Box display={{ xs: 'none', sm: 'block' }}>
                <Link to="/logIn" style={{textDecoration:'none'}}>
                 <Button href="#" color="primary" variant="outlined" className={classes.link}>Login</Button>
                </Link>
                <Link to="/register" style={{textDecoration:'none'}}>
                  <Button href="#" color="primary" variant="outlined" className={classes.link}>Sign Up</Button>
                </Link>
            </Box>
            {/* for xs screen size */}
            <Box display={{ xs: 'block', sm: 'none' }}>
                <Link to="/logIn">
                  <Button href="#" color="primary">
                    <ExitToApp className={classes.link} />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button href="#" color="primary">
                    <PersonAdd className={classes.link} />
                  </Button>
                </Link>
            </Box>
          </Route>
        </Switch>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/logIn"><SignInSide/></Route>
        <Route path="/register"><SignUp /></Route>
        <ProtectedRoutes path="/dashboard"><Dashboard /></ProtectedRoutes>
        <Route exact path="/"><Home /></Route>
        <Route path="*"><NotFound /></Route>
      </Switch>
      </Router>
    </React.Fragment>
  );
}