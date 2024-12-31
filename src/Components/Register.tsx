import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/SGN_09_08_2022_1662626364399.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [passError, setPassError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [isPassMatch, setIsPassMatch] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const validatePass = (value: any) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(value)) {
      setPassError(
        "Password must be at least 8 characters long and include letters and numbers."
      );
    } else {
      setPassError("");
    }
  };

  const handlePassChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
    validatePass(value);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setIsPassMatch(true);
      setConfirmPassError("Password mismatch");
      return;
    } 
    try {
    const response = await axios.post('https://bankysub-api.onrender.com/register', {password, username, email});
    if (response.status === 200) {
        alert(response.data.message);
        navigate('/login');
    } 
} catch (err: any) {
    console.error(err.response?.data.message)
}
  };

  return (
    <>
      <div className="registration-bg">
        <form onSubmit={handleRegister}>
          <div className="logodiv">
            <img src={logo} alt="Company logo" className="logo" />
            <h5>Create Account</h5>
          </div>
          <label htmlFor="FullName">FullName*</label> <br />
          <input type="text" id="FullName" required /> <br />
          <label htmlFor="Username">Username*</label> <br />
          <input type="text" id="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <label htmlFor="email">Email*</label> <br />
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="phone">Phone*</label> <br />
          <input type="number" id="phone" required />
          <label htmlFor="address">Address*</label> <br />
          <input type="text" id="address" required />
          <label htmlFor="referral">Referral username [optional]</label> <br />
          <input type="text" id="referral" />
          <span className="text-muted">Leave blank if no referral</span> <br />
          <label htmlFor="password">Password*</label> <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePassChange}
            required
          />
          <span className="text-danger">{passError}</span> <br />
          <span className="text-muted">
            Min_length-8 mix characters [i.e Abdul1234]
          </span>{" "}
          <br />
          <label htmlFor="confirmPass">Confirm Password*</label> <br />
          <input
            type="password"
            id="confirmPass"
            className={isPassMatch ? "red" : ""}
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
          />
          {confirmPassError && (
            <p style={{ color: "red" }}>{confirmPassError}</p>
          )}
          <span className="text-muted">Enter same password as before</span>{" "}
          <br />
          <div className="d-flex">
            <p>
              <input type="checkbox" id="terms" className="mt-2" required />{" "}
            </p>
            <label htmlFor="terms" className=" ms-2 text-primary">
              I Agree with the terms and conditions
            </label>
          </div>{" "}
          <button className="RegButton" type="submit">
            Sign Up
          </button>
          <p className="signIn">Already a member? <Link to={'/login?'} className="Link"><span>Sign In</span></Link></p>
        </form>
      </div>
    </>
  );
};

export default Register;
