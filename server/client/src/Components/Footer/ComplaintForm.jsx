import React from "react";
import "../Footer/ComplaintForm.css";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const ComplaintForm = () => {
  return (
    <Container maxWidth="sm" className="complaint-form-container">
      <br />
      <br />
      <CssBaseline />
      <div>
        <Typography
          component="h1"
          variant="h5"
          style={{
            color: "#fe724c",
            marginTop: "5%",
            marginBottom: "10%",
            fontFamily: "cursive",
          }}
        >
          Complaint Form
        </Typography>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                variant="outlined"
                required
                fullWidth
                label="Full Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Mobile Number"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                rows={8}
                maxRows={8}
                required
                fullWidth
                label="Complaint Details"
              />
            </Grid>
          </Grid>
          <div className="complaint-form-button-div">
            <button className="complaint-form-button">
              Submit your Complain
            </button>
            <br />
            <br />
            <br />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ComplaintForm;
