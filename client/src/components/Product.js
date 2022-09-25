import React from "react";
import { Link } from "react-router-dom";
const Product = ({ title, price, image, rating, id }) => {
  if(title.length>17){
    title= title.slice(0, 18);
  }
  return (
    <div className="col-lg-3 col-md-4 col-sm-12">
      <div className="product">
        <img className="product-img" src={image} alt="Card image cap" />
        <div className="product-body">
          <h5 className="product-title">{title}...</h5>
          <p className="product-price">${price}</p>
          <p className="product-rating">
            {rating} <i className="fa-solid fa-star"></i>
          </p>
          <Link className="btn btn-outline-info" to={`/products/${id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
