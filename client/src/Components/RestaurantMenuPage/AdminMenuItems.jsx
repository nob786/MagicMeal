import React from 'react';



const AdminMenuItems = () => {
    const [menuitems, setItems] = React.useState([
        {title: "abc",description :"sajshajs", price: 60}
    ]);
    return ( 
        <div className="admin-menu-items">
            Menu Items
            
        </div>
     );
}
 
export default AdminMenuItems;