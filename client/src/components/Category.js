import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "./GlobalState/Context";
import Product from "./Product";
const Category = () => {
  let params = useParams();
  let { products, filterProducts } = useContext(ProductsContext);
  useEffect(() => {
    filterProducts(params.title);
  }, [params.title]);
  return (
    <>
      <div className="container products">
        <div className="row">
          {products.length > 0 ? (
            <>
              <div className="category-title">
                <h5>{`Category/${params.title}`}</h5>
              </div>
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

export default Category;
