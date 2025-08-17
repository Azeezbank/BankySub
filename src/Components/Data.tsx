import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ModalWar } from './modal/modal';

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
  const [choosenDataPlan, setChoosenDataPlan] = useState('');
  const [mobileNumber, setMobileNumber] = useState("");
  const [walletBalance, setWalletBalance] = useState<walletInfo[]>([]);
  const [isModalSuccess, setIsModalSuccess] = useState<boolean>(false);
  const [isModalFail, setIsModalFail] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [plan, setPlan] = useState('');
  const [infoWar, setInfoWar] = useState('');
  const [isModalConfirmation, setIsModalConfirmation] = useState<boolean>(false);
  const [warning, setWarning] = useState(false);
  const [pin, setPin] = useState<string>('');
  const navigate = useNavigate();


  const DataPrice = choosenDataPlan;

  const handlePrice = (e: any) => {
    const newPrice = e.target.value;
    setChoosenDataPlan(newPrice);
    setPlan(e.target.selectedOptions[0].text)
  };

  //fetch network
  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const response = await axios.get<network[]>(
          "https://bankysub-api-production.up.railway.app/api/data/network",
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
        "https://bankysub-api-production.up.railway.app/api/data/types",
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
        "https://bankysub-api-production.up.railway.app/api/data/plans",
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
        (wallet) => parseFloat(wallet.user_balance) < parseFloat(choosenDataPlan)
      );
      
      if (isLesser) {
        setInfoWar('Low wallet balance, please fund your wallet');
        setWarning(true);
        setIsProcessing(true);
        return;
      }
      const response = await axios.post(
        "https://bankysub-api-production.up.railway.app/api/data/purchase/bundle",
        { plan, DataPrice, mobileNumber, choosenNetwork, choosenDataType, pin },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsModalFail(false);
        setIsModalSuccess(true);
        setIsProcessing(true);
        setIsModalConfirmation(false);
      }
    } catch (err: any) {
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
          "https://bankysub-api-production.up.railway.app/api/protected",
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
          "https://bankysub-api-production.up.railway.app/api/user/info",
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

  const Purchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!choosenNetwork || !choosenDataType || !choosenDataPlan || !mobileNumber) {
      setInfoWar('Please fill all fields');
      setWarning(true);
      return;
    }
      setIsModalConfirmation(true);
  };

  // replace +234
  const handlePhoneNumber = (e: any) => {
    e.preventDefault();

    let value = e.target.value.trim();

    // Replace +234 with 0
  if (value.startsWith("+234")) {
    value = "0" + value.slice(4);
  }
  setMobileNumber(value)
  }
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
              onChange={handlePrice}
              onClick={fetchDataPlan}
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
              type="tel"
              name="phone"
              id="phone"
              onChange={handlePhoneNumber}
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
             
              <button onClick={Purchase} type="submit">
                Purchase
              </button>

          </form>
        </div>

        {/* //Confirmation modal */}
        {isModalConfirmation && (
        <div className="modal-bg">
            <div>
              <div className="modall  confirm">
                <div className="confirm-element">
                  <h1 className="success-mark">
                    <i className="bi bi-question-circle text-success"></i>
                  </h1>
                  <h4>Confirm Your Transaction of <br/> <small> {choosenNetwork} {choosenDataType} #{choosenDataPlan} to {mobileNumber}</small> </h4>
                  <label htmlFor="pin">Input Your Transaction Pin </label> <br />
                  <input type="tel" name="pin" id="pin" placeholder="Input Your 4 Digit Pin" onChange={(e)  => setPin(e.target.value)} /> <br/>
                  <p className="text-danger">Note: This action cannot be undone</p>
                  <div className="confirm-btn">
                  <button
                    className="modal-ok"
                    type="button"
                    onClick={() => setIsModalConfirmation(false)}
                  >
                    Oh! No
                  </button>
                  {isProcessing ? (
                  <button
                    className="modal-ok"
                    type="button"
                    onClick={FetchDataBundle}
                  >
                    Yes
                  </button>
                  ) : (
                    <button className="modal-ok" type="button" disabled>
                      <span className="spinner-border"></span>Processing...
                    </button>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                    You've Sent {choosenNetwork} {plan} Data Plan
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
        {warning && (
          <ModalWar warning={infoWar} onButtonClick={() => setWarning(false)} />
        )}
      </main>
    </>
  );
};

export default Data;
