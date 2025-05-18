import React, { useState, useEffect } from "react";
// import NavBar from "./NavBar";
// import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AirtimeN {
  d_id: number;
  id: number;
  name: string;
}

interface AirtimeT {
  d_id: number;
  name: string;
}

interface walletInfo {
  username: string;
  user_balance: string;
}

const Airtime: React.FC = () => {
  const [networks, setNetworks] = useState<AirtimeN[]>([]);
  const [airtimeT, setAirtimeT] = useState<AirtimeT[]>([]);
  const [airtimeNChoosen, setAirtimeNChoosen] = useState("");
  const [airtimeTChoosen, setAirtimeTChoosen] = useState("");
  const [mobileN, setMobileN] = useState("");
  const [amount, setAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState<walletInfo[]>([]);
  const [actualAmount, setActualAmount] = useState<number>();
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);
  const [isModalFail, setIsModalFail] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const navigate = useNavigate();


  // Fetch Airtime network
  useEffect(() => {
    const fetchAirtimeN = async () => {
      try {
        const response = await axios.get<AirtimeN[]>(
          "https://bankysub-api.onrender.com/api/airtimeN",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setNetworks(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAirtimeN();
  }, []);

  //Fetch Airtime type
  useEffect(() => {
    const fetchAirtimeType = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api.onrender.com/api/airtimeT",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setAirtimeT(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAirtimeType();
  }, []);

  //Purchase Airtime
  const HandleAirtePurchase = async (e: any) => {
    e.preventDefault();
    try {
      setIsProcessing(false);
      const isLesser = walletBalance.some(
        (wallet) => wallet.user_balance < amount
      );
      if (isLesser) {
        alert("Low wallet balance, please fund your wallet");
        return;
      }
      const response = await axios.post(
        "https://bankysub-api.onrender.com/api/airtime/topup",
        { airtimeNChoosen, airtimeTChoosen, mobileN, amount },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setIsModalSuccess(true);
        setIsProcessing(true);
      }
    } catch (err: any) {
      console.error("Failed to purchase airtime");
      setIsModalSuccess(false);
      setIsModalFail(true);
      setIsProcessing(true);
    }
  };

  useEffect(() => {
    const ProtectPage = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api.onrender.com/protected",
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log(response.data.message);
        }
      } catch (err: any) {
        navigate("/login?");
        console.error(err.response?.data.message);
      }
    };
    ProtectPage();
  }, []);

  //Fetch user information
  useEffect(() => {
    const handleUserInfo = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api.onrender.com/api/user_info",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setWalletBalance(response.data);
        }
      } catch (err: any) {
        console.error(err.response?.data.message || err.message);
      }
    };
    handleUserInfo();
  });

// update airtime amount to pay
  useEffect(() => {
const toPay = Number(actualAmount) - (Number(actualAmount) * 0.02);
const strToPay = toPay.toString();
setAmount(strToPay)
  }, [actualAmount]);

  return (
    <>
          <main>
            <div className="airtimeForm grid-balance-section-m">
              <p className="text-center pt-3">Airtime TopUp</p>
              <form className="transactionForm">
                <p>Network</p>
                <select
                  aria-label="slect"
                  onChange={(e) => setAirtimeNChoosen(e.target.value)}
                >
                  <option>---Select---</option>
                  {networks.map((an) => (
                    <option key={an.d_id as React.Key} value={an.id}>
                      {an.name}
                    </option>
                  ))}
                </select>
                <p>Airtime Type</p>
                <select
                  aria-label="selct"
                  onChange={(e) => setAirtimeTChoosen(e.target.value)}
                >
                  <option>---Select---</option>
                  {airtimeT.map((at) => (
                    <option key={at.d_id as React.Key}>{at.name}</option>
                  ))}
                </select>{" "}
                <br />
                <label htmlFor={"phone"}>Phone</label> <br />
                <input
                  type={"number"}
                  name="phone"
                  value={mobileN}
                  onChange={(e) => setMobileN(e.target.value)}
                  id="phone"
                  placeholder="Phone Number"
                  required
                />
                <p>Amount</p>
                <div className="input-group">
                  <p className="input-group-text bg-light">NGN.</p>
                  <input
                    type="text"
                    placeholder="Amount"
                    className="form-control"
                    value={actualAmount}
                    onChange={(e) => setActualAmount(Number(e.target.value))}
                    required
                  />
                  <p className="input-group-text bg-light">.00</p>
                </div>
                {/* amount to pay */}
                <p>Amount To Pay</p>
                <div className="input-group">
                  <p className="input-group-text bg-light">NGN.</p>
                  <input
                    type="text"
                    placeholder="Amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    disabled
                  />
                  <p className="input-group-text bg-light">.00</p>
                </div>
                <div className="flex-bypass">
                  <p>
                    <input
                      aria-label="input"
                      type="checkbox"
                      name="bypass"
                      id="bypass"
                    />
                  </p>{" "}
                  <label htmlFor={"bypass"}>Bypass Number Validator</label>
                </div>
                {isProcessing? (
                <button type="submit" onClick={HandleAirtePurchase}>
                  Purchase
                </button>
                ) : (
                  <button type="submit" onClick={HandleAirtePurchase}>
                  <span className="spinner-border spinner-border-sm" role="status"><span className="visually-hidden"></span></span> Proccessing...
                </button>
                )}
              </form>
            </div>

            {/* airtime success modal */}
            {isModalSuccess && (
              <div className="modal-bg">
                <div>
                  <div className="modall">
                    <div>
                      <h1 className="success-mark">
                        <i className="bi bi-check2 text-success"></i>
                      </h1>
                      <h4>Transaction Successful</h4>
                      <p>
                        You've Successfully Sent Airtime Of {actualAmount} To {mobileN}. Thanks
                      </p>
                      <button
                        className="modal-ok"
                        type="button"
                        onClick={() => setIsModalSuccess(false)}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Failed airtime modal */}
            {isModalFail && (
              <div className="modal-bg">
                <div>
                  <div className="modall">
                    <div>
                      <h1 className="success-mark">
                        <i className="bi bi-question-circle text-success"></i>
                      </h1>
                      <h4>Transaction Processing!</h4>
                      <p>Fund will be reverse if failed</p>
                      <button
                        className="modal-ok"
                        type="button"
                        onClick={() => setIsModalFail(false)}
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )};
          </main>
    </>
  );
};

export default Airtime;
