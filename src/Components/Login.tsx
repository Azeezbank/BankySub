import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/SGN_09_08_2022_1662626364399.jpeg";

const Login: React.FC = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/login', {password, username});
            if (response.status === 200) {
                navigate('/')
            }
        } catch (err: any) {
            setLoginError(true);
            setLoginError(err.response?.data.message)
        }
    };
  return (
    <>
      <div className="registration-bg">
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
          <button className="RegButton" type="submit">
            Sign In
          </button>
          <p className="signIn">
            Dont't have an account yet? <Link to={'/register?'} className="Link"> <span>Sign up</span></Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
