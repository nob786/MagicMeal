import React from 'react'
import {Link, Switch,Router} from "react-router-dom";
import './SideBar.css'



/*==========================Icons=====================*/
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const handleClick =() => {
    return <h1>ABSHBHBSJHSJJSJ</h1>
};


const SideBar = () => {
    return ( 
        <div className="bar_container">
            
            
            <div className="sidebar_header">

                    <div className="sidebar_header_logo">
                        <Link className="logo-name-link" to= "/admin/dashboard" ><h2>MagicMeal </h2></Link>
                    </div>

                    <div className="icon">
                            <Link onClick={handleClick}>
                                <AccountCircleIcon style={{fontSize: "60"}}/>
                            </Link>
                    </div>
                        
            </div>

                <div class="sidebar">

                    <div className="sidebar_menu_container">

                        <label className="siebar_label" htmlFor="customCheck1" style={{color:"white"}}>Remember me</label>
                        <Link className="sidebar_menu" to= "/admin/dashboard" >Dashboard</Link>
                        <Link className="sidebar_menu" to= "/admin/menus"  >Menus</Link>
                        <Link className="sidebar_menu" to= "/admin/pending-orders"  >Pending Orders</Link>
                        <Link className="sidebar_menu" to= "/admin/settings"  >Settings</Link>

                        <Link className="sidebar_menu" to= "/admin/dashboard" >Dashboard</Link>
                        <Link className="sidebar_menu" to= "/admin/menus"  >Menus</Link>
                        <Link className="sidebar_menu" to= "/admin/pending-orders"  >Pending Orders</Link>
                        <Link className="sidebar_menu" to= "/admin/settings"  >Settings</Link>
                        
                    </div>
          
                </div>
        </div>
        
     );
}
 
export default SideBar;