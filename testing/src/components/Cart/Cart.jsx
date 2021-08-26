import { useSelector } from "react-redux";
import { useState } from "react";

const Cart = () => {
  const [state, setState] = useState([]);
  const { cart } = useSelector((state) => state.data);
  console.log("Cart data", cart);

  return (
    <div className="container">
      {cart &&
        cart.map((item, key) => (
          <div className="card" key={key} style={{ width: "400px" }}>
            <img src="images/pizza.jpg" alt="Pizza" style={{ width: "100%" }} />
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <p className="card-text"> {item.description}</p>
              <span>{item.price}</span>
              <br></br>
              <span>{item.category}</span>
              <br></br>
              <input type="number" />

              {/* <button type="button">Add to cart</button> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cart;
