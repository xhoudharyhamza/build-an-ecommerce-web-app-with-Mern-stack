import React, { useContext, useEffect } from "react";
import { ProductsContext } from "./GlobalState/Context";
const About = () => {
  let { user, dispatch } = useContext(ProductsContext);
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
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <>
      {user ? (
        <div className="container">
          <div className="user-info">
            <h3>{user.name}</h3>
            <div className="row">
              <div className="col-md-4 col-sm-12 col-lg-4">
                <p>Email: {user.email}</p>
              </div>
              <div className="col-md-4 col-sm-12 col-lg-4">
                <p>Password: {user.password}</p>
              </div>
              <div className="col-md-4 col-sm-12 col-lg-4">
                <p>Token: {user.token}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-center" style={{ margin: "200px 0px" }}>
          Loading...
        </h3>
      )}
    </>
  );
};

export default About;
