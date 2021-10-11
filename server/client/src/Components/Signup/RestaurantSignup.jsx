import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://magicmeal.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function RestaurantSignup() {
  const classes = useStyles();

  const history = useHistory();

  //const [cities, setCity] = React.useState('M');

  const [restAdmin, setrestAdmin] = React.useState({
    OwnerName: "",
    email: "",
    password: "",
    restaurantName: "",
    restaurantLocation: "",
    contact: "",
    category: "",
    role: "restaurant",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    console.log(event.target.name);
    const value = event.target.value;
    const name = event.target.name;

    setrestAdmin({ ...restAdmin, [name]: value });
  };

  //=======================================Handle Submmit================================
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData);
    const {
      OwnerName,
      email,
      password,
      restaurantName,
      restaurantLocation,
      contact,
      category,
      role,
    } = restAdmin;

    axios
      .post("/auth/signup-restaurant", {
        ownerName: OwnerName,
        email: email,
        password: password,
        restaurantName: restaurantName,
        address: restaurantLocation,
        contact: contact,
        category: category,
        role: role,
      })
      .then((res) => {
        console.log(res.data);
        window.alert("Signup Successfully");
        history.push("/foodie-login");
      })
      .catch((req) => {
        window.alert(req.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ color: "black" }}>
          Partner Form
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="OwnerName"
                variant="outlined"
                required
                fullWidth
                id="OwnerName"
                label="Owner Name"
                autoFocus
                value={restAdmin.OwnerName}
                onChange={handleChange}
              />
            </Grid>

            {/*<Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={restAdmin.lastName}
                onChange={handleChange}
              />
  </Grid>*/}

            {/*     City Drop down
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label" style={{width: '500px'}}>City</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={cities}
                      onChange={handleChange}
                      label="Age"
                    >
                  <MenuItem value="">
                     <em>None</em>
                  </MenuItem>
                 <MenuItem value={10}>Multan</MenuItem>
                <MenuItem value={20}>Lahore</MenuItem>
                <MenuItem value={30}>Islamabad</MenuItem>
                <MenuItem value={30}>Karachi</MenuItem>
                    </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="restaurant_name"
                label="Restaurant Name"
                name="restaurantName"
                value={restAdmin.restaurantName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Restaurant Location"
                name="restaurantLocation"
                value={restAdmin.restaurantLocation}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="contact"
                value={restAdmin.contact}
                onChange={handleChange}
              />
            </Grid>

            {/*<Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value={restAdmin.city}
                onChange={handleChange}
              />
          </Grid>*/}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={restAdmin.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Password"
                name="password"
                autoComplete="password"
                value={restAdmin.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={17}>
              <TextField
                id="outlined-textarea"
                label="Restaurant Category"
                placeholder="Category"
                multiline
                variant="outlined"
                name="category"
                value={restAdmin.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="standard-read-only-input"
                label="Role"
                defaultValue="Restaurant"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            {/*<Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
        </Grid>*/}
          </Grid>

          <button onClick={handleSubmit}>Submit</button>

          {/*<Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Apply for Partener Program
          </Button>*/}

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" to="/foodie-login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
