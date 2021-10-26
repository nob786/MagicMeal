import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function NewMenuItem() {
  const classes = useStyles();

  const [genders, setGender] = React.useState('M');


  const gender = [
    {
      value: 'Chinese',
      label: 'Chinese',
    },
    {
      value: 'Italian',
      label: 'Italian',
    },

  ];

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5" style={{ color: "black" }}>
          Add Menu Item
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Dish Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Price"
                name="lastName"
                autoComplete="lname"
              />

            </Grid>

            <Grid item xs={12} sm={10}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Category"
                value={gender}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select your Dish Category"
                variant="outlined"
              >
                {gender.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              </TextField>
            </Grid>


            <Grid item xs={12}>
              <TextField
                id="outlined-textarea"
                label="Description about Ingredients"
                placeholder="Placeholder"
                multiline
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Show to User By Default"
              />
            </Grid>

          </Grid>
          <Button
            variant="contained"
            component="label"
          >
            Upload Menu Picture
  <input
              type="file"
              hidden
            />
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save Changes
          </Button>


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cancel
          </Button>

        </form>
      </div>

    </Container>
  );
}