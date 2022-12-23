import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {PostAsync} from '../api/http'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  {
    title: 'Plan A',
    price: '2000',
    description: [
      'This is a basic life insurance plan which provides all the basic needs you have. After you have spent 500 dollars on your behalf, we will undertake 70% of your rest payment',
    ],
    // buttonText: 'Sign up for free',
    // buttonVariant: 'outlined',
  },
  {
    title: 'Plan B',
    subheader: 'Most popular',
    price: '5000',
    description: [
      'This is a premium life insurance plan which provides all the basic needs you have. After you have spent 300 dollars on your behalf, we will undertake 80% of your rest payment',
      ],
    // buttonText: 'Get started',
    // buttonVariant: 'contained',
  },
  {
    title: 'Plan C',
    price: '10000',
    description: [
      'This is a ultimate life insurance plan which provides all the basic needs you have. After you have spent 100 dollars on your behalf, we will undertake 90% of your rest payment',
    ],
    // buttonText: 'Contact us',
    // buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

function PricingContent() {
  const [open, setOpen] = React.useState(false);
  const [openComfirm, setOpenComfirm] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  const handleCloseComfirm = ()  => {
    setOpenComfirm(false)
  }


  const handleClose = () => {
    setOpen(false);
  };

  const handlePay = () => {
    setOpen(false)
    setOpenComfirm(true)

  }

  const firstNameField = useRef('')
  const middleNameField = useRef('')
  const lastNameField = useRef('')
  const streetAddressLine1Field = useRef('')
  const streetAddressLine2Field = useRef('')
  const stateField = useRef('')
  const cityField = useRef('')
  const zipCodeField = useRef('')
  const phoneNumberField = useRef('')
  const emailField = useRef('')
  const monthField = useRef('')
  const dayField = useRef('')
  const yearField = useRef('')
  const heightField = useRef('')
  const weightField = useRef('')
  const BMIField = useRef('')
  const RaceField = useRef('')
  const GeneralHealthField = useRef('')
  const SleepTimeField = useRef('')

  const [diseasesState, setDiseasesState] = React.useState({
    smoking: false,
    AlcoholDrink: false,
    hd: false,
    Stroke: false,
    Diabetes: false,
    asthma: false,
  })

  const handleDiseaseChange = (event) => {
    setDiseasesState({...diseasesState, [event.target.name]: event.target.checked})
  }
  

  const [plan, setPlan] = React.useState('');
  const [sex, setSex] = React.useState('');
  const [race, setRace] = React.useState('');
  const [walk, setWalk] = React.useState('');
  const [physical, setPhysical] = React.useState('');
  const [health, setHealth] = React.useState('');
  const handleChange = (event) => {
    setPlan(event.target.value);
  };
  const handleChange1 = (event) => {
    setSex(event.target.value);
  };
  const handleChange2 = (event) => {
    setRace(event.target.value);
  };
  const handleChange3 = (event) => {
    setWalk(event.target.value);
  };
  const handleChange4 = (event) => {
    setPhysical(event.target.value);
  };
  const handleChange5 = (event) => {
    setHealth(event.target.value);
  };

  const handleSubmit = async (event) => {

    var userForm = {
      firstName: firstNameField.current.value,
      middleName: middleNameField.current.value,
      lastName: lastNameField.current.value,
      streetAddressLine1: streetAddressLine1Field.current.value,
      streetAddressLine2: streetAddressLine2Field.current.value,
      state: stateField.current.value,
      city: cityField.current.value,
      zipCode: zipCodeField.current.value,
      phoneNumber: phoneNumberField.current.value,
      email: emailField.current.value,
      month: monthField.current.value,
      day: dayField.current.value,
      year: yearField.current.value,
      height: heightField.current.value,
      weight: weightField.current.value,
      BMI: BMIField.current.value,
      Race: RaceField.current.value,
      GeneralHealth: GeneralHealthField.current.value,
      SleepTime: SleepTimeField.current.value,
      diseasesState,
      sex,
      race,
      walk,
      physical,
      health,
      plan
    }
    console.log(userForm)
    const res = await PostAsync('/price', userForm);
    setPrice(res.data.price)
    setOpen(true)
  }
  return (
    <React.Fragment>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Price
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your insurance's price is ${price} totally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handlePay}>Pay Now</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openComfirm}
        onClose={handleCloseComfirm}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Payment Comfirm
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            A bill letter and all other forms and information have been sent to your email: {emailField.current.value}, please pay it after you have reviewed the terms of use.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseComfirm}>
            OK
          </Button>
          </DialogActions>
      </Dialog>


      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Best Insurance Company
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Below is our currently avalable plans. Please note that this is not the final price. You need to fill out the form below in order to get the quote.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Plan B' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

      </Container>

      <Container maxWidth="md" component="main" sx={{ pt: 2, pb: 6 }}>
      <Typography
          component="h"
          variant="h7"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Please refer to the CDC website for what is basic needs.
        </Typography>

      <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Buy it now!
        </Typography>

      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <p>Full Name</p>
      <div id="nameInfo">
        <TextField
          required
          id="standard-required"
          label="First Name"
          placeholder="Chen"
          variant="standard"
          inputRef={firstNameField}
        />
        <TextField
          id="standard-required"
          label="Middle Name"
          placeholder="Colin"
          variant="standard"
          inputRef={middleNameField}
        />
        <TextField
          required
          id="standard-required"
          label="Last Name"
          placeholder="Dong"
          variant="standard"
          inputRef={lastNameField}
        />
      </div>

      <p>Address</p>
      <div>
      <TextField
          required
          id="standard-required"
          label="Street Address Line 1"
          placeholder="Chen"
          variant="standard"
          inputRef={streetAddressLine1Field}
        />
      </div>

      <div>
      <TextField
          id="standard-required"
          label="Street Address Line 2"
          placeholder="Chen"
          variant="standard"
          inputRef={streetAddressLine2Field}
        />
      </div>
        <div>
        <TextField
          required
          id="standard-required"
          label="Sate/Province"
          placeholder="New York"
          variant="standard"
          inputRef={stateField}
        />
      <TextField
          required
          id="standard-required"
          label="city"
          placeholder="New York"
          variant="standard"
          inputRef={cityField}
        />
        </div>
        <div>
        <TextField
          required
          id="standard-required"
          label="Postal/Zip Code"
          placeholder="92092"
          variant="standard"
          inputRef={zipCodeField}
        />
        </div>

        <p>Phone Number</p>
        <div>
        <TextField
          required
          id="standard-required"
          label="Phone Number"
          placeholder="xxxxxxxxxx"
          variant="standard"
          inputRef={phoneNumberField}
        />
        </div>

        <p>Email</p>
        <div>
        <TextField
          required
          id="standard-required"
          label="Email"
          placeholder="xxxxxxx@xxx.xxx"
          variant="standard"
          inputRef={emailField}
        />
        </div>

        <p>Birth Date</p>
        <div id="birthInfo">
        <TextField
          required
          id="standard-required"
          label="Month"
          placeholder="01"
          variant="standard"
          inputRef={monthField}
        />
        <TextField
          required
          id="standard-required"
          label="Day"
          placeholder="01"
          variant="standard"
          inputRef={dayField}
        />
        <TextField
          required
          id="standard-required"
          label="Year"
          placeholder="2000"
          variant="standard"
          inputRef={yearField}
        />
      </div>

        <p>Height</p>
        <div>
        <TextField
          required
          id="standard-required"
          label="Height"
          placeholder="160"
          variant="standard"
          inputRef={heightField}
        />
        </div>

        <p>Weight</p>
        <div>
        <TextField
          required
          id="standard-required"
          label="Weight"
          placeholder="100"
          variant="standard"
          inputRef={weightField}
        />
        </div>

        <p>BMI</p>
        <div>
        <TextField
          required
          id="standard-required"
          label="BMI"
          placeholder="0"
          variant="standard"
          inputRef={BMIField}
        />
        </div>

        <p>SleepTime</p>
        <div>
        <TextField
          required
          id="standard-required"
          label="SleepTime"
          placeholder="0"
          variant="standard"
          inputRef={SleepTimeField}
        />
        </div>

        <p>Do You Have Any of the Following Diseases or Perform Any of the Actions?</p>
        <FormGroup>
          <FormControlLabel control={<Checkbox name='smoking' checked={diseasesState.smoking} onChange={handleDiseaseChange} />} label="Smoking" />
          <FormControlLabel control={<Checkbox name='AlcoholDrink' checked={diseasesState.AlcoholDrink} onChange={handleDiseaseChange}/>} label="Drink Alcohol" />
          <FormControlLabel control={<Checkbox name='hd' checked={diseasesState.hd} onChange={handleDiseaseChange}/>} label="Heart Disease" />
          <FormControlLabel control={<Checkbox name='Stroke' checked={diseasesState.Stroke} onChange={handleDiseaseChange}/>} label="Stroke" />
          <FormControlLabel control={<Checkbox name='Diabetes' checked={diseasesState.Diabetes} onChange={handleDiseaseChange}/>} label="Diabetes" />
          <FormControlLabel control={<Checkbox name='asthma' checked={diseasesState.asthma} onChange={handleDiseaseChange}/>} label="Asthma" />
        </FormGroup>

        <p>What is your sex?</p>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sex}
            label="Sex"
            onChange={handleChange1}
          >
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Male"}>Male</MenuItem>
          </Select>
        </FormControl>

        <p>What is your race?</p>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={race}
            label="Sex"
            onChange={handleChange2}
          >
            <MenuItem value={"White"}>White</MenuItem>
            <MenuItem value={"Asian"}>Asian</MenuItem>
            <MenuItem value={"Black"}>Black</MenuItem>
            <MenuItem value={"American Indian/Alaskan Native"}>American Indian/Alaskan Native</MenuItem>
            <MenuItem value={"Hispanic"}>Hispanic</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>

          </Select>
        </FormControl>

        <p>Can you walk?</p>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={walk}
            label="Walk"
            onChange={handleChange3}
          >
            <MenuItem value={0}>Yes</MenuItem>
            <MenuItem value={1}>No</MenuItem>
          </Select>
        </FormControl>

        <p>Can you do physical activity?</p>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={physical}
            label="Answer"
            onChange={handleChange4}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>

        <p>What is your general health performance?</p>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={health}
            label="Answer"
            onChange={handleChange5}
          >
            <MenuItem value={"Excellent"}>Excellent</MenuItem>
            <MenuItem value={"Very good"}>Very good</MenuItem>
            <MenuItem value={"Good"}>Good</MenuItem>
            <MenuItem value={"Fair"}>Fair</MenuItem>
            <MenuItem value={"Poor"}>Poor</MenuItem>
          </Select>
        </FormControl>

        <p>Which Life Plan?</p>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={plan}
            label="Plan"
            onChange={handleChange}
          >
            <MenuItem value={0}>Plan A</MenuItem>
            <MenuItem value={1}>Plan B</MenuItem>
            <MenuItem value={2}>Plan C</MenuItem>
          </Select>
        </FormControl>
    </Box>
      </Container>

      <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </Container>

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}