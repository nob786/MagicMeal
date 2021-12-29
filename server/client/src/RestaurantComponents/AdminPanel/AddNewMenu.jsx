import React, { Component } from "react";
import axios from "../../axios";
import "./AddNewMenu.css";
//===============Material Ui Imorts==============
import MenuBookIcon from "@mui/icons-material/MenuBook";
//=================React  Notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AddNewMenu = () => {
  const [menuData, setMenuData] = React.useState({
    itemName: "",
    price: "",
    category: "",
    description: "",
    imageUrl: null,
  });
  const [dishPic, setDishPic] = React.useState();
  const formData = new FormData();

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    // if (name !== "itemImage") setMenuData({ ...menuData, [name]: value });
    // else if (name === "itemImage")
    //   setMenuData({ ...menuData, ["itemImage"]: event.target.files[0] });
    setMenuData({ ...menuData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    // const formData = new FormData();
    // formData.append("itemImage", dishPic);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    // await axios
    //   .post("/item/image", formData, config)
    //   .then((response) => {
    //     window.alert("successful");
    //     console.log("Response image upload", response);
    //   })
    //   .catch((err) => {
    //     console.log("image upload error", err);
    //   });
  };
  ///========================================New Menu Form Submition===========================
  const onSave = async (event) => {
    event.preventDefault();

    // formData.append("itemImage", menuData.itemImage);
    console.log("Mene Data", menuData);
    // console.log("form  Data", formData);
    // console.log("image", menuData.itemImage);

    //console.log("State changed ", data);

    //========================AXIOS CALL TO POST DATA===============================
    await axios
      .post(
        "/item/add-item",
        {
          itemName: menuData.itemName,
          price: menuData.price,
          category: menuData.category,
          description: menuData.description,
          imageUrl: String(menuData.imageUrl),
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
        // console.log("Res", response);
        toast.info("New Menu Saved", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => window.location.replace("/admin/menu-items"), 1000);
        const restaurantData = response.data.data.restaurantData;
        const itemData = response.data.data.itemData;
        if (!restaurantData || !itemData) {
          toast.error(`Failed to Save Menu `, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          console.log("Could not get data");
          console.log("ResData", restaurantData);
          console.log("item data", itemData);
          window.alert("invalid Data");
        }
        // else window.alert("Item added! ");
        //console.log(response.data);
        //const token = localStorage.getItem("token");
        //const newToken = console.log(JSON.parse(token["_id"]));
        //console.log(newToken);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
  };

  const imageHandler = async (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setMenuData({ ...menuData, ["imageUrl"]: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setMenuData({ ...menuData, ["imageUrl"]: e });
    console.log("image", menuData.imageUrl);
    // await axios
    //   .post("/item/image", {
    //     dishPic,
    //   })
    //   .then((response) => {
    //     window.alert("successful");
    //     console.log("Response image upload", response);
    //   })
    //   .catch((err) => {
    //     console.log("image upload error", err);
    //   });
  };

  return (
    <div>
      <button
        style={{ marginTop: "5%" }}
        type="button"
        className="boot-button"
        class="btn boot-button "
        data-toggle="modal"
        data-target="#add-new-menu-modal"
      >
        Add new Menu
      </button>

      <div
        style={{ textAlign: "start" }}
        class="modal fade"
        id="add-new-menu-modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header boot-modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                <MenuBookIcon /> New Menu
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form method="POST" encType="multipart/form/data">
                <div class="form-group">
                  <label>Menu Name:</label>
                  <input
                    name="itemName"
                    type="text"
                    class="form-control"
                    placeholder="i.e Biryani"
                    onChange={handleChange}
                    value={menuData.itemName}
                  />
                </div>
                <div class="form-group">
                  <label>Menu Price: </label>
                  <input
                    name="price"
                    type="number"
                    class="form-control"
                    placeholder="i.e 450"
                    onChange={handleChange}
                    value={menuData.price}
                  />
                </div>
                <div class="form-group">
                  <label>Menu Category: </label>
                  <input
                    name="category"
                    type="text"
                    class="form-control"
                    placeholder="i.e Rice"
                    onChange={handleChange}
                    value={menuData.category}
                  />
                </div>
                <div class="form-group">
                  <label>Menu Description: </label>
                  <textarea
                    name="description"
                    type="price"
                    class="form-control"
                    placeholder="i.e filled with tomatoes, sauces"
                    maxLength={200}
                    onChange={handleChange}
                    value={menuData.description}
                  />
                </div>

                {/* <Button variant="contained" component="label">
                  Upload Dish Picture
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={imageHandler}
                  />
                </Button> */}

                <img
                  src={menuData.imageUrl}
                  alt=""
                  style={{ width: "100%", height: "250px" }}
                />
                <input
                  name="imageUrl"
                  type="file"
                  id="myFile"
                  accept="/image*"
                  name="itemImage"
                  onChange={imageHandler}
                  //   value={menuData.itemImage}
                />
                {/* <input></input> */}
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn boot-cancel"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={onSave}
                data-dismiss="modal"
                className="boot-button"
                class="btn boot-button"
              >
                Save Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewMenu;
