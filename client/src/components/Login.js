import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ProductsContext } from "./GlobalState/Context";
import Error from "./Error";
const Login = () => {
  let navigate = useNavigate();
  let { dispatch } = useContext(ProductsContext);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null)
  let handleLogin = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };
  let loginUser = async (e) => {
    e.preventDefault();
    let res = await fetch("/accounts/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginCredentials.email,
        password: loginCredentials.password,
      }),
    });
    if (res.status === 200) {
      navigate("/");
    } else if (res.status === 401) {
      setError("Invalid Login Credentials");
    } else if (res.status === 403) {
      setError("Email doesn't exists");
    } else {
      setError("Some Error! Try again");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="login-user">
            <div className="col-md-8 col-lg-6 col-sm-12">
              <h2>Login</h2>
              {error?<><Error error={error}/></>:null}
              <form onSubmit={loginUser}>
                <div className="form-group">
                  <label htmlFor="user-email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="user-email"
                    placeholder="Enter Email"
                    name="email"
                    required
                    onChange={handleLogin}
                    value={loginCredentials.email}
                  />
                </div>
                <div className="form-group">
                  <label for="user-password">Enter password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="user-password"
                    placeholder="Enter Password"
                    name="password"
                    required
                    onChange={handleLogin}
                    value={loginCredentials.password}
                  />
                </div>
                <button type="submit" className="btn btn-primary login-btn">
                  LogIn
                </button>
                <NavLink to="/accounts/signup">
                  Do Not Have an Account? SignUp
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
