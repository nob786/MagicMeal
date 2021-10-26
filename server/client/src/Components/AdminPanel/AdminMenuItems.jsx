import FormDialog from "./NewMenuItem";
import React from "react";
import { useState } from "react";
import axios from "../../axios";
import MenuCard from "./MenuCard";
const AdminMenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [data, setData] = useState({
    itemName: "",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setData((preVal) => {
      if (name === "itemName")
        return {
          itemName: value,
          price: preVal.price,
          category: preVal.category,
          description: preVal.description,
        };
      else if (name === "price")
        return {
          itemName: preVal.itemName,
          price: value,
          category: preVal.category,
          description: preVal.description,
        };
      else if (name === "category")
        return {
          itemName: preVal.itemName,
          price: preVal.price,
          category: value,
          description: preVal.description,
        };
      else if (name === "description")
        return {
          itemName: preVal.itemName,
          price: preVal.price,
          category: preVal.category,
          description: value,
        };
    });
    console.log(name);
    console.log(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMenuItems([...menuItems, data]);
    //console.log("State changed ", data);
    const { itemName, price, category, description } = data;
    // let token = JSON.parse(localStorage.getItem("token"));
    // console.log(token.token);
    // let t = token.token;
    // console.log(t);

    //========================AXIOS CALL TO POST DATA===============================
    await axios
      .post(
        "/item/add-item",
        {
          itemName: itemName,
          price: price,
          category: category,
          description: description,
        },
        {
          headers: {
            authorization:
              localStorage.getItem("token") !== null
                ? JSON.parse(localStorage.getItem("token"))
                : null,
          },
        }
      )
      .then((response) => {
        const restaurantData = response.data.restaurantData;
        const itemData = response.data.itemData;
        if (!restaurantData || !itemData) {
          console.log("Could not get data");
          console.log("restaurant data ", restaurantData);
          console.log("item data", itemData);
        }
        window.alert("Item added! ");
        //console.log(response.data);
        //const token = localStorage.getItem("token");
        //const newToken = console.log(JSON.parse(token["_id"]));
        //console.log(newToken);
      });
    // ====================================================================================//

    // const res = await fetch("http://localhost:3001/api/menu/addmenu", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "x-auth-token": localStorage.getItem
    //   },
    //   body: JSON.stringify({
    //     itemName,
    //     price,
    //     category,
    //     description,
    //   }),
    // })
    //   .then((response) => {
    //     console.log("Database Updated", response.json());
    //   })
    //   .catch("response Error");

    /* const datas = await res.json();
    console.log("Menu Items", datas);*/
  };

  /*const handleDelete = (event,id) => {
    //const name = event.target.name;
    const value = event.target.value;
    // console.log(name);
    // console.log(value);
   // let arrayOfMenuItems = [...menuItems];
   // let index = arrayOfMenuItems.indexOf(event.target.value);
   // if (arrayOfMenuItems !== -1) {
     // arrayOfMenuItems.splice(index, 1);
   //   setMenuItems([...arrayOfMenuItems]);
    //}

    axios.delete(`http://localhost:3001/api/menu/${id}`)
  };*/

  return (
    <div>
      <FormDialog
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        itemName={data ? data.itemName : null}
        price={data ? data.price : null}
        category={data ? data.category : null}
        description={data ? data.description : null}
      />
      <MenuCard />
    </div>
  );
};

export default AdminMenuItems;
