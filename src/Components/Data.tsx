import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface network {
  d_id: number;
  id: number;
  name: string;
}

interface dataType {
  d_id: number;
  id: number;
  name: string;
}

interface dataPlan {
  d_id: number;
  id: number;
  name: string;
  network_name: string;
  data_type: string;
  user: string;
  reseller: string;
  api: string;
  validity: string;
}

interface walletInfo {
  username: string;
  user_balance: string;
}

const Data: React.FC = () => {
  const [networks, setNetworks] = useState<network[]>([]);
  const [dataType, setDataType] = useState<dataType[]>([]);
  const [dataPlan, setDataPlan] = useState<dataPlan[]>([]);
  const [choosenNetwork, setChoodenNetwork] = useState("");
  const [choosenDataType, setChoosenDataType] = useState("");
  const [choosenDataPlan, setChoosenDataPlan] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [walletBalance, setWalletBalance] = useState<walletInfo[]>([]);
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);
  const [isModalFail, setIsModalFail] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const navigate = useNavigate();

  // const handleVisible = () => {
  //   setIsOpen(!isOpen);
  // };

  const DataPrice = choosenDataPlan;

  const handlePrice = (e: any) => {
    const newPrice = e.target.value;
    setChoosenDataPlan(newPrice);
  };

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const response = await axios.get<network[]>(
          "https://bankysub-api.onrender.com/network",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setNetworks(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchNetwork();
  }, []);

  //Fetch dataType
  const fetchDataType = async () => {
    try {
      const response = await axios.post<dataType[]>(
        "https://bankysub-api.onrender.com/data/types",
        { choosenNetwork },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setDataType(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Fetch data plans
  const fetchDataPlan = async () => {
    try {
      const response = await axios.post<dataPlan[]>(
        "https://bankysub-api.onrender.com/data/plans",
        { choosenNetwork, choosenDataType },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setDataPlan(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Purchase data bundle
  const FetchDataBundle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsProcessing(false);
      const isLesser = walletBalance.some(
        (wallet) => wallet.user_balance < choosenDataPlan
      );
      if (isLesser) {
        alert("Low wallet balance, please fund your wallet");
        return;
      }
      await axios.post(
        "https://bankysub-api.onrender.com/api/data/bundle",
        { DataPrice, mobileNumber, choosenNetwork, choosenDataType },
        { withCredentials: true }
      );

      // if (response.status === 200) {
      setIsModalSuccess(true);
      // }
    } catch (err) {
      console.error(err);
      setIsModalSuccess(false);
      setIsModalFail(true);
      setIsProcessing(true);

    }
  };

  const handleNetworkType = (e: any) => {
    setChoodenNetwork(e.target.value);
  };

  //Protect the route
  useEffect(() => {
    const ProtectPage = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api.onrender.com/protected",
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log(response.data.message);
        }
      } catch (err: any) {
        navigate("/login");
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
              <p className="text-center pt-3">Buy Data</p>
              <form className="transactionForm">
                <p>Network</p>
                <select aria-label="choose nework" onChange={handleNetworkType}>
                  <option>---Select---</option>
                  {networks.map((n) => (
                    <option key={n.d_id as React.Key}>{n.name}</option>
                  ))}
                </select>
                <p>Data Type</p>
                <select
                  aria-label="choose dataType"
                  onClick={fetchDataType}
                  onChange={(e) => setChoosenDataType(e.target.value)}
                >
                  <option>---Select---</option>
                  {dataType.map((d) => (
                    <option key={d.d_id as React.Key}>{d.name}</option>
                  ))}
                </select>{" "}
                <br />
                <p>Data Plan</p>
                <select
                  aria-label="choose dataPlan"
                  onClick={fetchDataPlan}
                  onChange={handlePrice}
                >
                  <option>---Select---</option>
                  {dataPlan.map((dp) => (
                    <option
                      key={dp.d_id}
                      value={dp.user || dp.reseller || dp.api}
                    >
                      {dp.name} {dp.data_type} = #{" "}
                      {dp.user || dp.reseller || dp.api} {dp.validity}
                    </option>
                  ))}
                </select>{" "}
                <br />
                <label htmlFor={"phone"}>Phone</label> <br />
                <input
                  type={"number"}
                  name="phone"
                  id="phone"
                  onChange={(e) => setMobileNumber(e.target.value)}
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
                    value={choosenDataPlan}
                    required
                    disabled
                  />
                  <p className="input-group-text bg-light">.00</p>
                </div>
                <div className="flex-bypass">
                  <p>
                    <input
                      aria-label="checkbox"
                      type="checkbox"
                      name="bypass"
                      id="bypass"
                      required
                    />
                  </p>{" "}
                  <label htmlFor={"bypass"}>Bypass Number Validator</label>
                </div>
                {isProcessing ? (
                <button onClick={FetchDataBundle} type="submit">
                  Purchase
                </button>
                ) : (
                  <button onClick={FetchDataBundle} type="submit">
                  Processing...
                </button>
                )}
              </form>
            </div>
            {/* data success modal */}
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
                        You've Sent {choosenNetwork} {choosenDataPlan} Data Plan
                        To {mobileNumber}
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

            {/* Failed mo dal */}
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

export default Data;
