import React, { useContext, useEffect } from "react";
import { ProductsContext } from "./GlobalState/Context";
import axios from "axios";
import Product from "./Product";
import ProductCategories from "./ProductCategories";
const Products = () => {
  let { products, dispatch } = useContext(ProductsContext);
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
  //fetch all products from the database
  let fetchProducts = async () => {
    try {
      let res = await axios.get("/products");
      let products = res.data.products;
      dispatch({
        type: "SET_PRODUCTS",
        payload: products,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    authenticateUser()
    fetchProducts();
  }, []);
  return (
    <>
      <div className="container products">
        <div className="row">
          {products.length > 0 ? (
            <>
              <ProductCategories />
              {products.map((product, index) => {
                return (
                  <Product
                    title={product.title}
                    price={product.price}
                    image={product.image}
                    rating={product.rating.rate}
                    id={product._id}
                    key={index}
                  />
                );
              })}
            </>
          ) : (
            <h3 className="text-center" style={{ margin: "200px 0px" }}>
              Loading...
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
