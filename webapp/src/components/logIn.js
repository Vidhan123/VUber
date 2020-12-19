import React, { useEffect, useState }  from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Paper, Grid, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useLoginStyles from './customStyles/loginStyles';
import useDetails from './useDetails';
import useAuth from './useAuth';
import axios from 'axios';

export default function SignInSide() {
  let initVals = { email: '', password: '' };
  const [vals,setVal] = useState(initVals);
  const [warn,setWarn] = useState('');
  const [Res,setRes] = useState({});
  const history = useHistory();
  const { email, password } = vals;
  
  const [setData, getData, user] = useDetails();
  const [authorise, unauthorise, ProtectedRoutes] = useAuth();

  const RedirectTo = () => {
    if (warn === 'Logged In') {
      authorise();
      history.push('/dashboard');
    }
  };

  useEffect(() => {
    const handler = async () => {
      await setData(Res);
      RedirectTo();
    } 
    handler();
  }, [warn,Res])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVal({...vals, [name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/login', { 
        email,
        password
      })
      .then((res) => {
        setRes(res.data.details);
        setWarn(res.data.msg);
      })
      .catch((err) => console.log(err))
  };

  const classes = useLoginStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} lg={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} lg={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Button
          fullWidth
          variant="outlined"
          color="secondary"
          className={classes.button}
          startIcon={<img src={require('../assets/images/googleicon.png')} height='45' alt="googleicon" />}
          href='http://localhost:9000/auth/google'
          >
            Continue with Google
          </Button>
          <Typography component="h6" variant="h6">
            or
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Typography component="h6" variant="h6" className={warn !== '' ? classes.show : classes.hidden} id="msg">
              {warn}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}