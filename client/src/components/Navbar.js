import React, { useLayoutEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ProductsContext } from "./GlobalState/Context";
const Navbar = () => {
  let { cart, user, dispatch } = useContext(ProductsContext);
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
  useLayoutEffect(() => {
    authenticateUser()
  }, [])
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

          {!user ? (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/accounts/signup"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "1px solid white" : "",
                    paddingBottom: isActive ? "2px" : "",
                    display: isActive ? "inline-block" : "",
                  })}
                >
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/accounts/login"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "1px solid white" : "",
                    paddingBottom: isActive ? "2px" : "",
                    display: isActive ? "inline-block" : "",
                  })}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/user/about"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "1px solid white" : "",
                    paddingBottom: isActive ? "2px" : "",
                    display: isActive ? "inline-block" : "",
                  })}
                >
                  {user.email}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/accounts/logout"
                  style={({ isActive }) => ({
                    borderBottom: isActive ? "1px solid white" : "",
                    paddingBottom: isActive ? "2px" : "",
                    display: isActive ? "inline-block" : "",
                  })}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}

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
