import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";
import axios from "axios";


interface network {
  d_id: number
  name: string
}

interface dataType {
  d_id: number
  name: string
}

interface dataPlan {
  d_id: number
  name: string
  price: number
  network_name: string
  data_type: string
}
const Data: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [networks, setNetworks] = useState<network[]>([]);
  const [dataType, setDataType] = useState<dataType[]>([]);
  const [dataPlan, setDataPlan] = useState<dataPlan[]>([]);
  const [choosenNetwork, setChoodenNetwork] = useState('');
  const [choosenDataType, setChoosenDataType] = useState('');

  const handleVisible = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const response = await axios.get<network[]>('https://bankysub-api.onrender.com/network')
        if (response.status === 200) {
        setNetworks(response.data);
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchNetwork();
  }, []);

  //Fetch dataType
    const fetchDataType = async () => {
      try {
        const response = await axios.post<dataType[]>('https://bankysub-api.onrender.com/data/types', {choosenNetwork});
        if (response.status === 200) {
        setDataType(response.data);
        }
      } catch (err) {
        console.error(err)
      }
    };

    //Fetch data plans
    const fetchDataPlan = async () => {
      try {
        const response = await axios.post<dataPlan[]>('https://bankysub-api.onrender.com/data/plans', {choosenNetwork, choosenDataType});
        if (response.status === 200) {
        setDataPlan(response.data);
        }
      } catch (err) {
        console.error(err)
      }
    };

  return (
    <>
      <div className="flexEntire">
        <div className={`aside ${isOpen ? "visible" : "hidden"} flexAside`}>
          <aside>
            <div className="d-flex navUser">
              <img className="navImg" src={avatar} alt="user" />
              <div className="onlineSign">
                <span></span>
              </div>
              <div>
                <p className="ps-2">
                  Username <br /> <span className="navBalance">balance: #</span>
                </p>
              </div>
            </div>
            <div className="grid-navDashh">
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-house-fill"></i>
                </h3>
                <Link to={"/"} className="Link">
                  {" "}
                  <p className="ps-2">Dashboard</p>
                </Link>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-reception-4"></i>
                </h3>
                <Link to={'/vend=data'} className="Link"> <p className="ps-2">Buy Data</p> </Link>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-telephone"></i>
                </h3>
                <Link to={"/vend=airtime"} className="Link">
                  <p className="ps-2 Link">Buy Airtime</p>
                </Link>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-lightbulb"></i>
                </h3>
                <p className="ps-2">Utility Payment</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-mortarboard-fill"></i>
                </h3>
                <p className="ps-2">Buy Exam Pin</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-envelope-paper"></i>
                </h3>
                <p className="ps-2">Buy Recharge Cards</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-distribute-horizontal"></i>
                </h3>
                <p className="ps-2">Data Card</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-chat-dots"></i>
                </h3>
                <p className="ps-2">Bulk SMS</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-arrow-counterclockwise"></i>
                </h3>
                <p className="ps-2">Histories</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-graph-up-arrow credit-card"></i>
                </h3>
                <p className="ps-2">Statistics</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-envelope-fill"></i>
                </h3>
                <p className="ps-2">Messages</p>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-cash"></i>
                </h3>
                <p className="ps-2">Pricing</p>
              </div>
            </div>
          </aside>
        </div>
        <div
          className={`main ${
            isOpen ? "with-margin" : "with-no-margin"
          } flexMain`}
        >
          <main>
            <NavBar sideBarClickHandler={handleVisible} />
            <div className="airtimeForm grid-balance-section-m">
              <p className="text-center pt-3">Buy Data</p>
              <form className="transactionForm">
                <p>Network</p>
                <select onChange={(e) => setChoodenNetwork(e.target.value)}>
                  <option>---Select---</option>
                  {networks.map((n) => (
                    <option key={n.d_id as React.Key}>
                      {n.name}
                    </option>
                  ))}
                </select>
                <p>Data Type</p>
                <select onClick={fetchDataType} onChange={(e) => setChoosenDataType(e.target.value)}>
                  <option>---Select---</option>
                  {dataType.map((d) => (
                    <option key={d.d_id as React.Key}>
                      {d.name}
                    </option>
                  ))} 
                </select>{" "}
                <br />
                <p>Data Plan</p>
                <select onClick={fetchDataPlan}>
                  <option>---Select---</option>
                  {dataPlan.map((dp) => (
                    <option key={dp.d_id}>
                      {dp.name} {dp.data_type} = # {dp.price}
                    </option>
                  ))}
                </select>{" "}
                <br />
                <label htmlFor={"phone"}>Phone</label> <br />
                <input
                  type={"number"}
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  required
                />
                <p>Origina Amount</p>
                <div className="input-group">
                  <p className="input-group-text bg-light">NGN.</p>
                  <input
                    type="text"
                    placeholder="Amount"
                    className="form-control"
                    required
                    disabled
                  />
                  <p className="input-group-text bg-light">.00</p>
                </div>
                <p>Amount To Pay</p>
                <div className="input-group">
                  <p className="input-group-text bg-light">NGN.</p>
                  <input
                    type="text"
                    placeholder="Amount To Pay"
                    className="form-control"
                    disabled
                  />
                  <p className="input-group-text bg-light">.00</p>
                </div>
                <div className="flex-bypass">
                  <p>
                    <input type="checkbox" name="bypass" id="bypass" />
                  </p>{" "}
                  <label htmlFor={"bypass"}>Bypass Number Validator</label>
                </div>
                <button type="submit">Purchase</button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Data;
