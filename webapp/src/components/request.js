import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, ListItem, ListItemText, ListItemIcon, Stepper, Step, StepLabel, Button, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@material-ui/core';
import MyMap from './map/map';
import { Adjust, Room, Event, ExpandMore } from '@material-ui/icons';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Swal from 'sweetalert2';
import useDetails from './useDetails';
import useMainStyles from './customStyles/mainStyles';
import axios from 'axios';

const getSteps= () => {
  return ['Select Pickup location', 'Select Drop location', 'Select Pickup time'];
};

const VerticalLinearStepper = (props) => {
  const classes = useMainStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [buttonText, setBT] = useState('Get Set Go');  
  const steps = getSteps();
  const Accepted = false;
  const { step, pU, d, t, sS } = props;

  const [setData, getData, user] = useDetails();

  const handleNext = () => {
    setActiveStep(step);
  };

  const handleReset = async () => {
    const res = await axios({
      method: 'DELETE',
      url: 'http://localhost:9000/request',
      data: {
        createdBy: user._id
      } 
    });
    console.log(res);
    sS(0);
    setActiveStep(0);
  };

  const handleRide = () => {
    Swal.fire(
      {
        title:`${Accepted?'Cab is on the way':'Looking for Cabs nearby...'}`,
        text: `${pU.address}`,
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Cancel my Ride',
        cancelButtonText: 'Edit my Ride',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleReset();
          setBT('Get Set Go');
          Swal.fire(
            'Cancelled!',
            'Your Ride has been cancelled.',
            'success'
          )
        }
        else if (result.dismiss === Swal.DismissReason.cancel) {
          setBT('Edit Your Ride');
          Swal.fire(
            'Edit your Ride!',
            '',
            'info'
          )
        }
      }
    );
  };

  const handleCreateRide = async (e) => {
    e.preventDefault();
    const data = {
      userId: user._id,
      pU: `${pU.address}|+|${pU.lat}|+|${pU.lng}`,
      d: `${d.address}|+|${d.lat}|+|${d.lng}`,
      time: t,
    };
    const res = await axios.post('http://localhost:9000/request',data);
    console.log(res);
    handleRide();
  };

  const handleEditedRide = async (e) => {
    e.preventDefault();
    const data = {
      createdBy: user._id,
      pU: `${pU.address}|+|${pU.lat}|+|${pU.lng}`,
      d: `${d.address}|+|${d.lat}|+|${d.lng}`,
      time: t,
    };
    const res = await axios.put('http://localhost:9000/request',data);
    console.log(res);
    handleRide();
  };

  useEffect(() => {
    handleNext()
  }, [step])

  useEffect(() => {
    getData();
  },[])

  return (
    <div className={classes.root}>  
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep >= steps.length && (
        <Paper square elevation={0}>
          <ListItem>
            <ListItemIcon>
              <Adjust />
            </ListItemIcon>
            <ListItemText secondary={pU.address} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Room />
            </ListItemIcon>
            <ListItemText secondary={d.address} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText secondary={" "+ t + ""} />
          </ListItem>
          <Button
            onClick={
              buttonText === 'Get Set Go'? handleCreateRide : handleEditedRide
            }
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:'10px'}}
          >
            {buttonText}
          </Button>
        </Paper>
      )}
    </div>
  );
};

function Request(props) {
  const pickUpInit = {address:'', lat:0, lng:0};
  const [pickUp,setPickUp] = useState(pickUpInit);
  const dropInit = {address:'', lat:0, lng:0};
  const [drop,setDrop] = useState(dropInit);
  const [time,setTime] = useState(new Date('2020-12-18T21:11:54'));
  const [reqs,setReqs] = useState([]);
  const [buttonText, setBT] = useState('Choose your customer');
  const [mapInit, setMapInit] = useState(false);

  const [step, setStep] = useState(0);
  const { user } = props;
  const isDriver = user.role === 'Driver' ? true : false;

  const classes = useMainStyles();

  useEffect(() => {
    const getReqs = async () => {
      const res = await axios.get('http://localhost:9000/allReqs');
      setReqs(res.data);
      console.log(res.data);
    }
    getReqs();
  }, []);

  const handleRideAlreadyAccepted = () => {
    Swal.fire(
      'Already accepted a Ride!',
      '',
      'info'
    )
  };

  return(
    <React.Fragment>
      <Grid container spacing={5} justify="center">
        <Grid item xs={12} md={9}>
          <Paper elevation={5}>
            <MyMap 
            pU={pickUp} sPU={setPickUp} d={drop} sD={setDrop} iD={isDriver}
            sS={setStep} mI={mapInit}
            />
          </Paper>
        </Grid>

        {/* Customer side */}
        {!isDriver && 
        <React.Fragment>
          <Grid item xs={12} md={3}>
          {/* Date/Time */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose Pickup Date"
                value={time}
                disabled={step >= 2 ? false:true}
                onChange={(time) => setTime(time)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Choose Pickup Time"
                value={time}
                onChange={(time) => {
                  setTime(time);
                  setStep((prev) => prev + 1);
                }}
                disabled={step >= 2 ? false:true}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          {/* Progress */}
          <VerticalLinearStepper step={step} pU={pickUp} d={drop} t={time} 
          sS={setStep} />
          </Grid>
        </React.Fragment>}

        {/* Driver side */}
        {isDriver && 
        <React.Fragment>
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              style={{marginBottom:'10px'}}
            >
              {buttonText}
            </Button>
            {reqs.map(req => 
              <Accordion key={reqs.indexOf(req)+1}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Customer {reqs.indexOf(req)+1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                  <ListItem>
                    <ListItemIcon>
                      <Adjust />
                    </ListItemIcon>
                    <ListItemText secondary={req.pickupAddress.split("|+|")[0]} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Room />
                    </ListItemIcon>
                    <ListItemText secondary={req.dropAddress.split("|+|")[0]} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Event />
                    </ListItemIcon>
                    <ListItemText secondary={`${new Date(req.time)}`} />
                  </ListItem>
                  </div>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    onClick={
                      buttonText === 'Choose your customer' ?
                      async () => {
                        const data = {
                          userId: user._id,
                          createdBy: req.createdBy,
                        };
                        const res = await axios.post('http://localhost:9000/acceptReq', data);
                        setPickUp({
                          address: req.pickupAddress.split("|+|")[0], 
                          lat: req.pickupAddress.split("|+|")[1], 
                          lng: req.pickupAddress.split("|+|")[2],
                        });
                        setDrop({
                          address: req.dropAddress.split("|+|")[0], 
                          lat: req.dropAddress.split("|+|")[1], 
                          lng: req.dropAddress.split("|+|")[2],
                        });
                        setTime(req.time);
                        setMapInit(true);
                        setBT('Reach on time');
                        console.log(res);
                      } :
                      handleRideAlreadyAccepted
                    }
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Accept
                  </Button>
                </AccordionActions>
              </Accordion>
            )}
          </Grid>
        </React.Fragment>}
      </Grid>
    </React.Fragment>
  )
};

export default Request;