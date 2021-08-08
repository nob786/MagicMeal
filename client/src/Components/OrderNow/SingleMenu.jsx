import React, { Component } from 'react'

import './SingleMenu.css'

import {Link} from "react-router-dom";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';


const SingleMenu = ({menu}) => {
    const [value, setValue] = React.useState(4);
    return (
        <Grid className="Single_Menu" xs={3}>
                <div className="container">
                    <img className="menu_image" src={menu.imageLoc} alt={menu.imageAlt} />
                    
                </div>
                <div>
                        <h1 >
                       
                             {menu.menuTitle}
                       
                        </h1>
                </div>
                <div>
                    <h3>
                        {menu.menuDesc}
                    </h3>
                </div> 

                 <div>
                    <h3>
                        {menu.menuPrice}
                    </h3>
                </div>      

                     

                <div className="rating">
                    <Box component="fieldset" mb={3} borderColor="transparent">
                            <Typography component="legend" className="rating_title">Rating</Typography>
                            <Rating name="read-only" value={value} readOnly />
                    </Box>
                </div>


        </Grid>
     );
}s
 
export default SingleMenu;