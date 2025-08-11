import React, { useState } from "react";
import axios from "axios";
import { ModalErr, ModalSus } from './modal/modal';

const Pin: React.FC = () => {
  const [pin, setPin] = useState<string>('');
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
      const response = await axios.put(
        `https://bankysub-api-production.up.railway.app/api/user/pin`,
        { pin }, { withCredentials: true }
      );
      if (response.status === 200) {
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
          <h5 className="pt-5 pb-2">User Pin Set-Up </h5>

          <form className="ninForm">
            <div className=" me-5">
              <label htmlFor="pin">Input Your 4 Digit Pin</label> <br />
              <input aria-label="pin" type="tel" name="pin" id="pin" placeholder="4 Digit Pin" onChange={(e) => setPin(e.target.value)} />
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

export default Pin;
