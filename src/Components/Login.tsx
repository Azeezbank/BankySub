import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/SGN_09_08_2022_1662626364399.jpeg";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setIsAuth(true);
      const response = await axios.post(
        "https://bankysub-api.onrender.com/login",
        { password, username },
        { withCredentials: true }
      );
      setIsAuth(true);
      if (response.status === 200) {
        navigate("/user/dashboard");
      }
    } catch (err: any) {
      setLoginError(true);
      setIsAuth(false);
      setLoginError(err.response?.data.message);
    }
  };
  return (
    <>
      <div className="registration-bg">
        <div className="form-container">
          <form onSubmit={handleLogin}>
            {loginError && <p className="errorMessage">{loginError}</p>}
            <div className="logodiv">
              <img src={logo} alt="Company logo" className="logo" />
              <h5>Sign In</h5>
            </div>
            <label htmlFor="Username">Username*</label> <br />
            <input
              type="text"
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password*</label> <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            {!isAuth ? (
            <button className="RegButton" type="submit">
            Sign In
          </button>
            ) : (
              <button className="RegButton" type="submit">
              Authenticating...
            </button>
            )}
            <p className="signIn">
              Don't have an account yet?{" "}
              <Link to={"/register"} className="Link">
                {" "}
                <span>Sign up</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
