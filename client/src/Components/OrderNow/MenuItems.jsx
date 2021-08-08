import { SingleBed } from '@material-ui/icons';
import React, { Component } from 'react'


import TitleTag from '../SpecialComp/TitleTag';
import SingleRestaurant from './SingleRestaurant';
import './MenuItems.css'



const MenuItems = () => {
    const[restaurant,setRestaurant] = React.useState([
        { imageLoc: "./Pictures/R9.jpg", menuTitle: "Rice" , menuDesc: "Canal Bank Road Multan" ,},
        { imageLoc: "./Pictures/R8.jpg", menuTitle: "Macroni" , menuDesc: "Canal Bank Road Multan"},
        { imageLoc: "./Pictures/R3.jpg", menuTitle: "Biryani" , menuDesc: "Canal Bank Road Multan"},
        { imageLoc: "./Pictures/R4.jpg", menuTitle: "Burger" , menuDesc: "Canal Bank Road Multan"},
        { imageLoc: "./Pictures/R5.jpg", menuTitle: "Pancake" , menuDesc: "Canal Bank Road Multan"},
        { imageLoc: "./Pictures/R6.jpg", menuTitle: "Salad" , menuDesc: "Canal Bank Road Multan"},
        { imageLoc: "./Pictures/R7.jpg", menuTitle: "Mango Milk Shake" , menuDesc: "Canal Bank Road Multan"},
        { imageLoc: "./Pictures/R8.jpg", menuTitle: "Grill Burger" , menuDesc: "Canal Bank Road Multan"},
        { imageLoc: "./Pictures/R9.jpg", menuTitle: "Club Sandwitch" , menuDesc: "Canal Bank Road Multan"},
    ]);
    return ( 
        <div className="Restaurants">
            <TitleTag title="Restaurants Near-By"/>
            <div className="restaurants_grid">
                {restaurant.map((restaurant, index) => (
                <SingleRestaurant  key={index} restaurant={restaurant}/>
                ))}
            </div>

        </div>
     );
}
 
export default MenuItems;