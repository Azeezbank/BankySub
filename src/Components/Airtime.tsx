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
  // const [isOpen, setIsOpen] = useState(false);
  const [networks, setNetworks] = useState<AirtimeN[]>([]);
  const [airtimeT, setAirtimeT] = useState<AirtimeT[]>([]);
  const [airtimeNChoosen, setAirtimeNChoosen] = useState("");
  const [airtimeTChoosen, setAirtimeTChoosen] = useState("");
  const [mobileN, setMobileN] = useState("");
  const [amount, setAmount] = useState("");
  const [walletBalance, setWalletBalance] = useState<walletInfo[]>([]);
  const navigate = useNavigate();

  // const handleVisible = () => {
  //   setIsOpen(!isOpen);
  // };

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
        alert("Airtime topUp successfully");
      }
    } catch (err: any) {
      console.error("Failed to purchase airtime");
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
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
                <button type="submit" onClick={HandleAirtePurchase}>
                  Purchase
                </button>
              </form>
            </div>
          </main>
    </>
  );
};

export default Airtime;
