import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Error from "./Error";
const Signup = () => {
  const [signupCredentials, setSignupCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null)
  let navigate = useNavigate();
  let handleSignup = (e) => {
    setSignupCredentials({
      ...signupCredentials,
      [e.target.name]: e.target.value,
    });
  };
  let signupUser = async (e) => {
    e.preventDefault();
    if (signupCredentials.password.length < 8) {
      alert("Enter valid password length greater than 7");
    } else {
      try {
        let res = await fetch("/accounts/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...signupCredentials }),
        });
        if (res.status === 401) {
          setError("Email already registered")
        } else if (res.status === 200) {
          navigate("/accounts/login");
        } else {
          setError("Something went wrong")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="signup-user">
            <div className="col-md-8 col-lg-6 col-sm-12">
              <h2>SignUp</h2>
              {error?<><Error error={error}/></>:null}
              <form onSubmit={signupUser}>
                <div className="form-group">
                  <label htmlFor="user-name">Enter Name</label>
                  <input
                    type="name"
                    className="form-control"
                    id="user-name"
                    placeholder="Enter Name"
                    name="name"
                    required
                    onChange={handleSignup}
                    value={signupCredentials.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="user-email"
                    placeholder="Enter Email"
                    name="email"
                    required
                    onChange={handleSignup}
                    value={signupCredentials.email}
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
                    onChange={handleSignup}
                    value={signupCredentials.password}
                  />
                </div>
                <button type="submit" className="btn btn-dark signup-btn">
                  SignUp
                </button>
                <NavLink to="/accounts/login">
                  Already Have an Account? Login
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
