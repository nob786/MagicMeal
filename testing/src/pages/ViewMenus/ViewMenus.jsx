import React from "react";
import { ViewMenuCard } from "../../components";
const ViewMenus = ({ id }) => {
  return (
    <div>
      <h1>These are my menus. Kindly have a look!</h1>
      <ViewMenuCard restId={id} />
    </div>
  );
};

export default ViewMenus;
