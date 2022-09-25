import React, { useContext, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./GlobalState/Context";
const Navbar = () => {
  let { cart, categories, dispatch } = useContext(ProductsContext);
  let fetchProductsCategories = async () => {
    try {
      let res = await axios.get("/products/categories");
      let categories = res.data.categories;
      dispatch({
        type: "SET_CATEGORIES",
        payload: categories,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductsCategories();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand logo" to="/">
        Go&Grab
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/"
              style={({ isActive }) => ({
                borderBottom: isActive ? "1px solid white" : "",
                paddingBottom: isActive ? "2px" : "",
                display: isActive ? "inline-block" : "",
              })}
            >
              Home <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/products"
              style={({ isActive }) => ({
                borderBottom: isActive ? "1px solid white" : "",
                paddingBottom: isActive ? "2px" : "",
                display: isActive ? "inline-block" : "",
              })}
            >
              Products
            </NavLink>
          </li>
          {categories.map((category, index) => {
            return (
              <>
                <li className="nav-item" key={index}>
                  <NavLink
                    className="nav-link"
                    to={`/category/${category.title}`}
                    style={({ isActive }) => ({
                      borderBottom: isActive ? "1px solid white" : "",
                      paddingBottom: isActive ? "2px" : "",
                      display: isActive ? "inline-block" : "",
                    })}
                  >
                    {category.title}
                  </NavLink>
                </li>
              </>
            );
          })}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/cart"
              style={({ isActive }) => ({
                borderBottom: isActive ? "1px solid white" : "",
                paddingBottom: isActive ? "2px" : "",
                display: isActive ? "inline-block" : "",
              })}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>{cart.length}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
