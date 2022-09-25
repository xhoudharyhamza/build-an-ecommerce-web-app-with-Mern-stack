import React, { useContext, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { ProductsContext } from "./GlobalState/Context";
const Home = () => {
  let { featureProducts, dispatch } = useContext(ProductsContext);
  //fetch all products and feature products
  let fetchFeatureProducts = async () => {
    let res = await axios.get("/products/feature");
    if (res.status === 200) {
      let featureProducts = res.data.featureProducts;
      dispatch({ type: "SET_FEATURE_PRODUCTS", payload: featureProducts });
    }
  };
  useEffect(() => {
    fetchFeatureProducts();
  }, []);
  return (
    <div className="container">
      <div className="feature-products">
        <h2>Feature Products</h2>
        <div className="row">
          {featureProducts.length > 0 ? (
            <>
              {featureProducts.map((product, index) => {
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
    </div>
  );
};

export default Home;
