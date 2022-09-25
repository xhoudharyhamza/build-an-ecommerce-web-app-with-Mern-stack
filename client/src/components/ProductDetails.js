import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ProductsContext } from "./GlobalState/Context";
import { useParams, Link } from "react-router-dom";
const ProductDetails = () => {
  let params = useParams();
  const [productDetails, setProductDetails] = useState(null);
  let {grabProduct}= useContext(ProductsContext)
  //fetch all details of single product from database
  let fetchProductDetails = async () => {
    let res = await axios.get(`/products/${params.id}`);
    if (res.status === 200) {
      let product = res.data.product;
      setProductDetails(product);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, []);
  return (
    <>
      {productDetails ? (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-5 col-lg-5 col-sm-12">
              <div className="single-product-image">
                <img src={productDetails.image} alt="image" />
              </div>
            </div>
            <div className="col-md-7 col-lg-7 col-sm-12">
              <div className="single-product-details">
                <h3 className="product-title">{productDetails.title}</h3>
                <h4 className="product-category">{`'${productDetails.category}'`}</h4>
                <p className="product-description">
                  {productDetails.description}
                </p>
                <p className="product-price">${productDetails.price}</p>
                <p className="product-rating">
                  {productDetails.rating.rate}
                  <i className="fa-solid fa-star"></i>
                </p>
                <p className="product-count">
                  {productDetails.rating.count > 0
                    ? "In stock"
                    : "Out of Stock"}
                </p>
                <button className="btn btn-info" style={{ marginRight: "5px" }} onClick={()=>{grabProduct(productDetails._id)}}>
                  Grab Now
                </button>
                <Link className="btn btn-outline-primary" to="/products">
                  All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center" style={{margin:"200px 0px"}}>Loading...</h3>
      )}
    </>
  );
};

export default ProductDetails;
