import React, { useState } from "react";
import axios from "axios";

const Verify: React.FC = () => {
  const [verificationType, setVerificationType] = useState<string>("");
  const [verificationNumber, setVerificationNumber] = useState<number>(0);

  const handleVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bankysub-api.onrender.com/verify/account",
        { verificationType, verificationNumber }, {withCredentials: true}
      );
      if (response.status === 200) {
        alert('Success');
        console.log(response.data.message);
      }
    } catch (err: any) {
      console.error('Error', err?.response?.data?.message || err.message);
    }
  };
  return (
    <>
      <div className="verifyPge">
        <h4 className="text-center">My Page Information</h4>
        <div className="text-center verify-form">
          <h5 className="pt-5 pb-2">User Account Verification </h5>

          <form className="ninForm">
            <div className=" me-5">
              <p>Input Verification Type</p>
              <select
                aria-label="verify"
                className="ninFormSelect"
                onChange={(e) => setVerificationType(e.target.value)}
              >
                <option>~~~</option>
                <option>NIN</option>
              </select>
            </div>
            <div>
              <p>Input Your verification Number</p>
              <input
                aria-label="number"
                type="number"
                placeholder="Input Number"
                className="ninFormSelect"
                onChange={(e) => setVerificationNumber(Number(e.target.value))}
              />
            </div>
          </form>
          <button type="submit" onClick={handleVerify} className="verifybtn">Submit</button>
        </div>
      </div>
    </>
  );
};

export default Verify;
