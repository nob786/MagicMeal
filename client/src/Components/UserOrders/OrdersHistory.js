import React from 'react';
import TitleTag from '../SpecialComp/TitleTag';



const OrdersHistory = () => {
    return (  
        <div className="orders-history">
            <TitleTag title="Pending Orders" />
      {/*<div className="restaurants_grid">
        {d.map((item, key) => (
          <SingleRestaurant key={key} restaurant={item} />
        ))}
        </div>*/}
        <TitleTag title="Completed/Cancelled Orders" />
        </div>
    );
}
 
export default OrdersHistory;
