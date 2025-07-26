import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/SGN_09_08_2022_1662626364399-removebg-preview.png';

const Login: React.FC = () => {

  const [otp, setOtp] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [message, setMessage] = useState('')

  const navigate = useNavigate();

  const handleverification = async (e: any) => {
    e.preventDefault();
    try {
      setIsAuth(true);
      const response = await axios.post(
        "https://bankysub-api-production.up.railway.app/api/auth/verify/mail",
        { otp },
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/login");
        setIsAuth(false);
      };

    } catch (err: any) {
      setIsMessage(true);
      setIsAuth(false);
      setMessage(err.response?.data.message);
    }
  };
  return (
    <>
      <div className="registration-bg">
        <div className="form-container">
          <form onSubmit={handleverification}>
            {isMessage && <p className="errorMessage">{message}</p>}
            <div className="logodiv">
              <img src={logo} alt="Company logo" className="logo bg-white" />
              <h5>Verify Your Mail</h5>
            </div>
            <label htmlFor="otp">Input Verification Code Sent To Your Mail</label> <br />
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <br />
            <br />
            {!isAuth ? (
              <button className="RegButton" type="submit">
                Verify
              </button>
            ) : (
              <button className="RegButton" type="submit">
                Verifying...
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
