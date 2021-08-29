import React from 'react';
import TitleTag from '../../Components/SpecialComp/TitleTag';



const RestOrdersHistory = () => {
    return (  
        <div className="orders-history">
            <TitleTag title="Orders history" />
      {/*<div className="restaurants_grid">
        {d.map((item, key) => (
          <SingleRestaurant key={key} restaurant={item} />
        ))}
        </div>*/}
        </div>
    );
}
 
export default RestOrdersHistory;
