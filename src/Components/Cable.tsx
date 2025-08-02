import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ModalWar } from './modal/modal';
import './cable.css';


interface provider {
  d_id: number,
  id: number
  provider: string
}

interface plan {
  d_id: number,
  id: number,
  packages: string
}

interface Info {
  user_balance: string;
}
const Cable:React.FC = () => {
  const [providers, setProviders] = useState<provider[]>([]);
  const [plan, setPlan] = useState<plan[]>([]);
  const [userInfo, setUserInfo] = useState<Info[]>([]);
  const [provider, setProvider] = useState('');
  const [cable_name, setCable_name] = useState('');
  const [amount, setAmount] = useState('');
  const [number, setNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerMail, setCustomerMail] = useState('');
  const [isProcessing, setIsProcessing] = useState(true);
  const [isModalFail, setIsModalFail] = useState(false);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [infoWar, setInfoWar] = useState('');
  const [isValidate, setIsValidate] = useState(true);


  const navigate = useNavigate();

   //Protect the page
  useEffect(() => {
    const ProtectPage = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api-production.up.railway.app/api/protected",
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log(response.data.message)
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
          setUserInfo(response.data);
        }
      } catch (err: any) {
        console.error(err.response?.data.message || err.message);
      }
    };
    handleUserInfo();
  });

  //Fetch cable provider
  useEffect(() => {
  const handleProvider = async () => {
    try {
      const response = await axios.get('https://bankysub-api-production.up.railway.app/api/cable/provider', {withCredentials: true});
      if (response.status === 200) {
        setProviders(response.data);
      }
    } catch (err: any) {
      console.error('Failed to select provider', err.response?.data?.message || err.message)
    }
  };
  handleProvider();
}, []);

  //Fetch cable plans
  useEffect(() => {
  const handleplans = async () => {
    try {
      const response = await axios.post('https://bankysub-api-production.up.railway.app/api/cable/plan', {provider}, {withCredentials: true});
      if (response.status === 200) {
        setPlan(response.data)
      }
    } catch (err: any) {
      console.error('Failed to selct cable plans', err.response?.data?.message || err.message);
    }
  };
  handleplans();
}, []);

  //Subscribe for cable
  const purchaseCable = async (e: any) => {
    e.preventDefault();
    setIsProcessing(false);
    const balance = userInfo.some((wallet) => parseFloat(wallet.user_balance) < parseFloat(amount));
    try {
      if (balance) {
        setInfoWar('Low wallet balance, please fund your wallet');
        setWarning(true);
        return;
      }
      const response = await axios.post('https://bankysub-api-production.up.railway.app/api/cable/subscription', {provider, cable_name, amount, number, customerName, customerMail});
      if (response.status === 200) {
        setIsProcessing(true);
        setIsModalSuccess(true);
        setIsModalFail(false);
      }
    } catch (err: any) {
      console.error('Failed to subscribe cable', err.response?.data?.message || err.message);
      setIsProcessing(true);
      setIsModalSuccess(false);
      setIsModalFail(true);
    }
  };

  //Validate cable number
  const handleValidate = async (e: any) => {
    e.preventDefault();
    setIsValidate(false);
    try {
      const response = await axios.get(`https://ncwallet.ng/api/cable/cable-validation?cable_id=${provider}&cable_number=${number}`);
      setCustomerName(response.data?.customer_name);
      setIsValidate(true);
      console.log(response.data?.customer_name);
    } catch (err: any) {
      console.error('Failed to validate cable number', err);
      setIsValidate(true);
    }
  };

    return (
        <>
         <main>
                <div className="airtimeForm grid-balance-section-m">
                  <p className="text-center pt-3">Cable Subscription</p>
                  <form className="transactionForm">
                    <p>CableTv Provider</p>
                    <select
                      aria-label="slect"
                      onChange={(e) => setProvider(e.target.value)}
                    >
                      <option>---Select Provider---</option>
                      {providers.map((pro) => (
                        <option key={pro.d_id as React.Key} value={pro.id}>
                          {pro.provider}
                        </option>
                      ))}
                    </select>

                    <p>Cable Plan</p>
                    <select
                      aria-label="selct"
                    onChange={(e) => setCable_name(e.target.value)}
                    >
                      <option>---Select---</option>
                      {plan.map((plan) => (
                        <option key={plan.d_id as React.Key}>{plan.packages}</option>
                      ))}
                    </select>{" "}
                    <br />

                    <label htmlFor={"number"}>IUC/Cable Number</label> <br />
                    <div className='validateDiv'>
                    <input
                      type={"tel"}
                      maxLength={11}
                      pattern='[0-9]*'
                      name="number"
                      value={number}
                      id="number"
                      placeholder="Input Cable Number"
                      onChange={(e) => setNumber(e.target.value)}
                      required
                    />
                    {isValidate ? (
                    <button type='button' className='validate-btn' onClick={handleValidate}>Validate</button>
                    ) : (
                      <button type='button' className='validate-btn'>Please Wait...</button>
                    )}
                    </div>

                    <label htmlFor='customerName'>Customer Name*</label> <br/>
                    <input type='text' name='customerName' id='customerName' placeholder='Customer Name' 
                    value={customerName} onChange={(e) => setCustomerName(e.target.value)} required disabled /> <br/>

                    <label htmlFor='mail'>Customer Email [If available]</label> <br/>
                    <input type='email' name='mail' id='name' placeholder='Receiver mail address' 
                    value={customerMail} onChange={(e) => setCustomerMail(e.target.value)}
                    /> <br/>


                    <p>Amount</p>
                    <div className="input-group">
                      <p className="input-group-text bg-light">NGN.</p>
                      <input
                        type="text"
                        placeholder="Amount"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
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

                    {isProcessing ? (
                      <button type="submit" onClick={purchaseCable}>
                        Purchase
                      </button>
                    ) : (
                      <button type="submit" >
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
                            You've Successfully Subscribed {provider} {cable_name} {amount} To {number}. <br/> Thanks.
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

                {warning && (
                  <ModalWar warning={infoWar} onButtonClick={() => setWarning(false)} />
                )}
        
              </main>
        </>
    )
}

export default Cable;