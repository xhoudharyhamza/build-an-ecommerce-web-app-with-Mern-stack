import React, { useEffect, useContext } from "react";
import CartItem from "./CartItem";
import { ProductsContext } from "./GlobalState/Context";
const ShoppingCart = () => {
  let { cart, dispatch } = useContext(ProductsContext);
  let authenticateUser = async () => {
    let res = await fetch("/auth", {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 200) {
      let response = await res.json();
      dispatch({ type: "SET_USER", payload: response.user });
    } else {
      dispatch({ type: "SET_USER", payload: null });
    }
  };
  //calculate the total amount
  let totalAmount = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  totalAmount = Math.round(totalAmount);
  useEffect(()=>{
    authenticateUser()
  },[])
  return (
    <>
      <div className="container mt-4">
        {cart.length > 0 ? (
          <div className="row">
            <div className="col-md-8 col-sm-12 col-lg-8">
              {cart.map((product, index) => {
                return (
                  <CartItem
                    image={product.image}
                    title={product.title}
                    category={product.category}
                    price={product.price}
                    quantity={product.quantity}
                    id={product._id}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="col-md-4 col-sm-12 col-lg-4">
              <div className="total-price">
                <h4>Total {totalAmount}$</h4>
                <button className="btn btn-primary">CheckOut</button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch({ type: "CLEAR_CART", payload: [] });
                  }}
                >
                  ClearCart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h3
            className="text-center"
            style={{ overflowY: "hidden", margin: "200px 0px" }}
          >
            No Item in the Cart
          </h3>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
