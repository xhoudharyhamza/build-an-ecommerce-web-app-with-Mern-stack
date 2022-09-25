import React, { useContext } from "react";
import { ProductsContext } from "./GlobalState/Context";
const CartItem = ({ image, title, category, price, quantity, id }) => {
  let { incrementQuantity, decrementQuantity, removeCartItem } = useContext(ProductsContext);
  return (
    <div className="row mb-4">
      <div className="col-md-5 col-lg-5 col-sm-12">
        <div className="cart-product-image mb-2">
          <img src={image} alt="image" />
        </div>
      </div>
      <div className="col-md-7 col-lg-7 col-sm-12">
        <div className="cart-product-details">
          <h3 className="product-title">{title}</h3>
          <h4 className="product-category">{`'${category}'`}</h4>
          <p className="product-price">
            ${price} * {quantity}
          </p>
          <div className="product-quantity">
            <button
              className="increment-quantity"
              onClick={() => {
                incrementQuantity(id);
              }}
            >
              +
            </button>
            <p className="quantity">{quantity}</p>
            <button
              className="decrement-quantity"
              style={
                quantity > 1 ? { display: "block" } : { display: "none" }
              }
              onClick={() => {
                decrementQuantity(id);
              }}
            >
              -
            </button>
          </div>
          <button className="btn btn-outline-danger mt-2" onClick={()=>{removeCartItem(id)}}>
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
