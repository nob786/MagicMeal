import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMenu } from "../../redux/actions/dataActions";
const AddMenuForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    price: 0,
    category: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(name);
    console.log(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addMenu(formData));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Item Name"
          onChange={handleChange}
          value={formData.itemName}
        />
        <br></br>
        <input
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={formData.price}
        />
        <br></br>
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          value={formData.category}
        />

        <br></br>
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description}
        />

        <br></br>
        <button type="submit" className="btn btn-primary">
          Add Menu!
        </button>
      </form>
    </div>
  );
};

export default AddMenuForm;
