import React from "react";
import MenuItems from "../../Components/OrderNow/MenuItems";
import AddNewMenu from "./AddNewMenu";
const AdminMenuItems = () => {
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <AddNewMenu />
      <MenuItems />
    </div>
  );
};

export default AdminMenuItems;
