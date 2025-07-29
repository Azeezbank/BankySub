import React, { useState } from "react";
import axios from "axios";
import { ModalErr, ModalSus } from './modal/modal';

const Verify: React.FC = () => {
  const [verificationType, setVerificationType] = useState<string>("");
  const [verificationNumber, setVerificationNumber] = useState<string>('');
  const [isVerify, setIsVerify] = useState(true);
  const [notification, setNotification] = useState('');
  const [notificationSus, setNotificationSus] = useState('');
  const [isErr, setIsErr] = useState(false);
  const [isSus, setIsSus] = useState(false);


  //Verify NIN or BVN
  const handleVerify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVerify(false);
    try {
      const response = await axios.post(
        "https://bankysub-api-production.up.railway.app/api/verification/verify/account",
        { verificationType, verificationNumber }, { withCredentials: true }
      );
      if (response.status === 200) {
        alert('Success, NIN submitted successfully');
        console.log(response.data.message);
        setNotificationSus(response.data?.message);
        setIsVerify(true);
        setIsSus(true);
        setIsErr(false);
      }
    } catch (err: any) {
      console.error('Error', err?.response?.data?.message || err.message);
      setIsVerify(true);
      setNotification(err.response?.data?.message);
      setIsErr(true);
      setIsSus(false);
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
                aria-label="text"
                type="text"
                placeholder="Input Number"
                className="ninFormSelect"
                onChange={(e) => setVerificationNumber(e.target.value)}
              />
            </div>
          </form>
          {isVerify ? (
            <button type="submit" onClick={handleVerify} className="verifybtn">Submit</button>
          ) : (
            <button type="submit" onClick={handleVerify} className="verifybtn">Please Waity...</button>
          )}
        </div>
        {isErr && (
          <ModalErr notification={notification} onButtonClick={() => setIsErr(false)}/>
        )}
        {isSus && (
          <ModalSus notificationSus={notificationSus} onButtonClick={() => setIsSus(false)}/>
        )}
      </div>
    </>
  );
};

export default Verify;
