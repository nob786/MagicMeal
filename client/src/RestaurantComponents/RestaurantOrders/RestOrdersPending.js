import React from 'react';
import TitleTag from '../../Components/SpecialComp/TitleTag';



const RestOrdersPending = () => {
    return (  
        <div className="orders-history">
            <TitleTag title="Pending Orders" />
      {/*<div className="restaurants_grid">
        {d.map((item, key) => (
          <SingleRestaurant key={key} restaurant={item} />
        ))}
        </div>*/}
        </div>
    );
}
 
export default RestOrdersPending;
