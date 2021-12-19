import React from "react";
//validate
import validate from "../../validate";

//=================Material Ui Imports========================
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
import axios from "../../axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";

//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: "#fe724c",
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));

export default function RestaurantSignup() {
  const [errors, setErrors] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  // const classes = useStyles();

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
    //console.log(event.target.value);
    //console.log(event.target.name);
    const value = event.target.value;
    const name = event.target.name;

    setrestAdmin({ ...restAdmin, [name]: value });
    // console.log("Restaurant Signup Form Data", restAdmin);
  };

  //=======================================Handle Submmit================================
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("Form Data", restAdmin);
    setErrors(validate(restAdmin));
    // console.log("Errors", errors);
    if (Object.keys(validate(restAdmin)).length === 0) {
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
          setLoading(false);
          // console.log("Restaurant Signup Response Data", res.data);

          toast.success(`Successfully Signed-up Partner Account`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          history.push("/foodie-login");
        })
        .catch((req) => {
          setLoading(false);
          toast.error(req.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    } else if (Object.keys(validate(restAdmin)).length > 0) {
      setLoading(false);
    }
  };

  const handleAlreadyRestSignup = () => {
    history.push("/foodie-login");
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      className="restaurant-signup-container"
    >
      <br />
      <CssBaseline />
      <div>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography
          component="h1"
          variant="h4"
          style={{ color: "black", marginBottom: "10%" }}
        >
          Restaurant Business Form
        </Typography>
        <form noValidate>
          <Grid container spacing={4}>
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
                helperText={errors.OwnerName && errors.OwnerName}
                error={errors.OwnerName ? true : false}
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
                defaultValue={"Multan"}
                value={restAdmin.restaurantName}
                onChange={handleChange}
                helperText={errors.restaurantName && errors.restaurantName}
                error={errors.restaurantName ? true : false}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Service Location"
                name="restaurantLocation"
                value={restAdmin.restaurantLocation}
                onChange={handleChange}
              />
            </Grid> */}

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
                helperText={errors.contact && errors.contact}
                error={errors.contact ? true : false}
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
                helperText={errors.email && errors.email}
                error={errors.email ? true : false}
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
                helperText={errors.password && errors.password}
                error={errors.password ? true : false}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="category"
                label="Food Category"
                name="category"
                value={restAdmin.category}
                onChange={handleChange}
              />
            </Grid> */}
            <Grid item xs={12}>
              <label for="serviceLocation">Service Location:</label>
              <select
                placeholder="skjsk"
                style={{ minHeight: "60px", background: "transparent" }}
                class="form-control"
                id="serviceLocation"
                name="restaurantLocation"
                onChange={handleChange}
              >
                <option selected disabled value="">
                  Please Select City
                </option>
                <option value="multan">Multan</option>
                <option value="lahore">Lahore</option>
              </select>

              {errors.restaurantLocation ? (
                <div
                  style={{
                    color: "red",
                    margin: "5px",
                    fontSize: "12px",
                    marginLeft: "3%",
                  }}
                >
                  {" "}
                  {errors.restaurantLocation}
                </div>
              ) : (
                ""
              )}
            </Grid>

            <Grid item xs={12}>
              <label for="category">Food Category:</label>
              <select
                style={{ minHeight: "60px", background: "transparent" }}
                class="form-control"
                id="category"
                name="category"
                onChange={handleChange}
              >
                <option selected disabled value="">
                  Please Select One
                </option>
                <option value="chinese">Chinese</option>
                <option value="thai">Thai</option>
                <option value="desi">Desi</option>
                <option value="italian">Italian</option>
                <option value="arabic">Arabic</option>
                <option value="fast">Fast Food</option>
                <option value="sea">Sea Food</option>
                <option value="mix">Mix Food</option>
              </select>

              {errors.category ? (
                <div
                  style={{
                    color: "red",
                    margin: "5px",
                    fontSize: "12px",
                    marginLeft: "3%",
                  }}
                >
                  {" "}
                  {errors.category}
                </div>
              ) : (
                ""
              )}
            </Grid>

            {/* <Grid item xs={12}>
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
        */}

            {/*<Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
        </Grid>*/}
          </Grid>
          <div className="restaurant-signup-submit-button-div">
            <button
              className="restaurant-signup-submit-button"
              onClick={handleSubmit}
            >
              {loading === true ? (
                <div
                  class="spinner-border"
                  role="status"
                  style={{ color: "white" }}
                >
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {/*<Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Apply for Partener Program
          </Button>*/}

          <Grid container justify="center">
            <Grid item>
              <Link
                style={{ cursor: "grab" }}
                variant="body2"
                to="/foodie-login"
                onClick={handleAlreadyRestSignup}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <br />
      <br />
    </Container>
  );
}
