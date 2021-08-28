import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


//==========================REDUX ===========================
import { useDispatch, useSelector } from "react-redux";
import {addDeliveryAddress} from "../../Redux/actions/cartAction"

export default function AddressForm() {
const [address,setAddress]=React.useState("");
const dispatch = useDispatch();
  const handleChange=(event)=>{

    const value = event.target.value;
    const name = event.target.name;
    setAddress({ ...address, [name]: value });
   
    //console.log("val", value);
    //console.log("name", name);
    
    
    

  }
  let fullAddress= address.address1+" "+address.address2+" "+address.area+" "+address.city;
  console.log("full Address",fullAddress);

  React.useEffect(() => {
    dispatch(addDeliveryAddress(fullAddress));
  },[fullAddress]);

  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        {/*<Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
          />
  </Grid> */}
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="House number"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Street"
            fullWidth
            autoComplete="shipping address-line2"
            onChange={handleChange}
          />
        </Grid>
        {/*<Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
          />
</Grid>*/}
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="area" label="Area" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            onChange={handleChange}
          />
        </Grid>
        {/*<Grid item xs={12} >
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
</Grid>*/}
        {/*<Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
</Grid>*/}
      </Grid>
    </React.Fragment>
  );
}