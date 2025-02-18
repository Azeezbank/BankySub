import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import logo from "../assets/SGN_09_08_2022_1662626364399.jpeg";
//import { Link } from "react-router-dom";
import "./Admin.css";
import axios from "axios";

type menuState = {
  [key: string]: boolean;
};

const AdminDashBoard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenu, setIsMenu] = useState<menuState>({});
  const [isDropSub, setIsDropSub] = useState<menuState>({});
  const [isData, setIsData] = useState<menuState>({});
  const [isVerification, setIsVerification] = useState<menuState>({});
  const [isSetting, setIsSetting] = useState<menuState>({});
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const handleVisible = () => {
    setIsOpen(!isOpen);
  };

  const handleIsMenu = (menu: any) => {
    setIsMenu((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleIsDropSub = (subM: any) => {
    setIsDropSub((prevSM) => ({
      ...prevSM,
      [subM]: !prevSM[subM],
    }));
  };

  const handleIsData = (isData: any) => {
    setIsData((prevIsData) => ({
      ...prevIsData,
      [isData]: !prevIsData[isData],
    }));
  };

  const handleIsVerification = (hV: any) => {
    setIsVerification((prevhV) => ({
      ...prevhV,
      [hV]: !prevhV[hV],
    }));
  };

  const handleSeting = (set: any) => {
    setIsSetting((prevSet) => ({
      ...prevSet,
      [set]: !prevSet[set],
    }));
  };
  //Dashboard component
  const Dashboard = () => {
    return (
      <>
        <div className="dashboard-bg bg-light">
          <h5>Dashboard</h5>
          <p className="text-muted">Welcome to Admin Dashboard</p>
          <div className="grid-dash1">
            <div className="bg-white p-2">
              <p>Stats</p>
              <div className="flex-balance">
                <div className="flex bg-light">
                  <p className="dash-emoji mt-2 me-2">
                    <i className="bi bi-folder p-2 bg-success"></i>{" "}
                  </p>
                  <div>
                    <div className="text-center">0 </div>
                    <div className="text-muted small-text text-center">
                      Total User Balance
                    </div>
                  </div>
                </div>
                <div className="flex bg-light">
                  <p className="dash-emoji mt-2 me-2">
                    <i className="bi bi-folder p-2 bg-primary"></i>{" "}
                  </p>
                  <div>
                    <div className="text-center">0 </div>
                    <div className="text-muted small-text text-center">
                      Previous Balance
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-balance">
                <div className="flex bg-light">
                  <p className="dash-emoji mt-2 me-2">
                    <i className="bi bi-folder p-2 bg-warning"></i>{" "}
                  </p>
                  <div>
                    <div className="text-center">0 </div>
                    <div className="text-muted small-text text-center">
                      Pending Transaction
                    </div>
                  </div>
                </div>
                <div className="flex bg-light">
                  <p className="dash-emoji mt-2 me-2">
                    <i className="bi bi-folder p-2 bg-info"></i>{" "}
                  </p>
                  <div>
                    <div className="text-center">0 </div>
                    <div className="text-muted small-text text-center">
                      Pending Withdrawals
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-2">
              <p>Expenses</p>
              <div className="flex-balance">
                <div className="flex bg-light">
                  <p className="dash-emoji mt-2 me-2">
                    <i className="bi bi-folder p-2 bg-primary"></i>{" "}
                  </p>
                  <div>
                    <div className="text-center">0 </div>
                    <div className="text-muted small-text">
                      Total User Balance
                    </div>
                  </div>
                </div>
                <div className="flex bg-light">
                  <p className="dash-emoji mt-2 me-2">
                    <i className="bi bi-folder p-2 bg-warning"></i>{" "}
                  </p>
                  <div>
                    <div className="text-center">0 </div>
                    <div className="text-muted small-text">
                      Total User Balance
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  //Render component
  const renderComponent = () => {
    if (activeComponent === "Dashboard") {
      return <Dashboard />;
    }
  };

  interface items {
    d_id: number;
    id: number;
    event_type: string;
    payment_ref: number;
    paid_on: any;
    amount: number;
    payment_method: string;
    payment_status: string;
    prev_balance: number;
    user_balance: number;
  }
  //Fund page
  const Fund = () => {
    const [items, setItems] = useState<items[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const limit = 10;
    

    useEffect(() => {
      fetchItems();
    });
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://bankysub-api.onrender.com/payment-history?page=${page}&limit=${limit}`
        );
        setItems(response.data.data);
        setTotalPage(response.data.totalPage);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    const handlePage = (e: any) => {
      setPage(Number(e.target.value));
      console.log(page);
    };
    return (
      <>
        <div className="dashboard-bg bg-light">
          <h5>Dashboard</h5>
          <div className="bg-white p-3">
            <p>User Wallet Funding Histories</p>
            <div className="form-group">
              <button className="btn">Page</button>
              <select aria-label="s" onChange={handlePage}>
                <option>1</option>
              </select>
              <div className="form-group">
              <button className="btn">Total Page</button>
              <button type="button" className="btn border">{totalPage}</button>
              </div>
              <div className="table">
                <table className="table-data">
                  <thead>
                    <th>id</th>
                    <th>event_type</th>
                    <th>payment_ref</th>
                    <th>paid_on</th>
                    <th>amount</th>
                    <th>payment_method</th>
                    <th>payment_status</th>
                    <th>prev_balance</th>
                    <th>user_balance</th>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr
                        key={item.d_id}
                        className={index % 2 === 0 ? "bg-light" : "bg-white"}
                      >
                        <td>{item.id}</td>
                        <td>{item.event_type}</td>
                        <td>{item.payment_ref}</td>
                        <td>{item.paid_on}</td>
                        <td>{item.amount}</td>
                        <td>{item.payment_method}</td>
                        <td>{item.payment_status}</td>
                        <td>{item.prev_balance}</td>
                        <td>{item.user_balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  //render fund
  const renderFund = () => {
    if (activeComponent === "FundH") {
      return <Fund />;
    }
  };

  //Setting component
  const Setting = () => {
    return (
      <>
        <div className="dashboard-bg bg-light">
          <h5>Dashboard</h5>
          <div className="bg-white p-3">
            <p>General</p>
            <div className="contact-sec">
              <p className="bg-white pt-3 pb-3 ps-2 pe-2">
                Contact Information
              </p>
              <div className="contact-input">
              <div className="input-group pb-2">
                <span className="input-group-text">Phone +234(0)</span>
                <input
                  className="form-control"
                  aria-label="num"
                  type="number"
                />
              </div>
              <div className="input-group pb-2">
              <span className="input-group-text">WhatsApp +234(0)</span>
                <input
                  className="contact-input-field form-control"
                  aria-label="num"
                  type="number"
                />
              </div>
              <div className="input-group pb-2">
                <span className="input-group-text">WhatsApp Group Link</span>
                <input
                  className="form-control"
                  aria-label="num"
                  type="text"
                />
              </div>
              </div>
            </div>
            <div className="contact-sec mt-3">
              <p className="bg-white pt-3 pb-3 ps-2 pe-2">
                Messages
              </p>
              <p className="ps-3"><strong>Message Your Users</strong></p>
              <div className="contact-input">
                <textarea className="textarea" aria-label="text" rows={2}></textarea>
              </div>
            </div>
            <button type="button" className="set-save-btn float-end">Save</button>
          </div>
        </div>
      </>
    );
  };

  //Render setting
  const renderSet = () => {
    if (activeComponent === "set") {
      return <Setting />;
    }
  };

  return (
    <>
      <div className="flexEntire">
        <div
          className={`aside ${
            isOpen ? "visible" : "hidden"
          } flexAside admin-aside`}
        >
          <aside>
            <div className="admin-image">
              <img src={logo} alt="site logo" />
              <p>BANKYTECH</p>
            </div>
            <p
              className="dashb"
              onClick={() => setActiveComponent("Dashboard")}
            >
              <i className="bi bi-columns-gap"></i> Dashboard
            </p>
            <p className="dashb">
              <i className="bi bi-chat-left-text"></i> Messsages
            </p>
            <ul>
              <li>
                <div
                  onClick={() => handleIsMenu("fund")}
                  className="bg-info history hover"
                >
                  <i className="bi bi-train-front"></i> Histories{" "}
                  <i className="bi bi-chevron-right float-end"></i>
                </div>
                {isMenu.fund && (
                  <>
                    <ul>
                      <li
                        className="fund-hist hover"
                        onClick={() => setActiveComponent("FundH")}
                      >
                        <i className="bi bi-clipboard-minus"></i> Funds
                        Histories
                      </li>
                    </ul>
                    <ul className="list">
                      <li className="list-mar">
                        <div
                          onClick={() => handleIsDropSub("Airtime")}
                          className="bg-primary fund-hist hover"
                        >
                          <i className="bi bi-phone"></i> Airtime{" "}
                          <i className="bi bi-chevron-right float-end"></i>
                        </div>
                        {isDropSub.Airtime && (
                          <ul>
                            <li className="successful hover">
                              <i className="bi bi-question-circle"></i> Pending
                            </li>
                            <li className="successful hover">
                              <i className="bi bi-check-circle"></i> Successful
                            </li>
                            <li className="successful hover">
                              <i className="bi bi-ban"></i> Failed
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>

                    <ul className="list">
                      <li className="list-mar">
                        <div
                          onClick={() => handleIsData("Data")}
                          className="bg-primary fund-hist hover"
                        >
                          <i className="bi bi-wifi"></i> Data{" "}
                          <i className="bi bi-chevron-right float-end"></i>
                        </div>
                        {isData.Data && (
                          <ul>
                            <li className="successful hover">
                              <i className="bi bi-question-circle ban check-circle"></i>{" "}
                              Pending
                            </li>
                            <li className="successful hover">
                              <i className="bi bi-check-circle ban"></i>{" "}
                              Successful
                            </li>
                            <li className="successful hover">
                              <i className="bi bi-ban"></i> Failed
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                    <ul className="list">
                      <li className="list-mar">
                        <div
                          className="bg-primary fund-hist hover"
                          onClick={() => handleIsVerification("verification")}
                        >
                          <i className="bi bi-key"></i> Verification
                          <i className="bi bi-chevron-right float-end"></i>
                        </div>
                        {isVerification.verification && (
                          <ul>
                            <li className="nin hover">
                              <i className="bi bi-people"></i> NIN
                            </li>
                            <li className="nin hover">
                              <i className="bi bi-people"></i> BVN
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                    <ul className="list">
                      <li className="list-mar">
                        <div
                          className="bg-primary fund-hist hover"
                          onClick={() => handleSeting("setting")}
                        >
                          <i className="bi bi-tools"></i> Setting
                          <i className="bi bi-chevron-right float-end"></i>
                        </div>
                        {isSetting.setting && (
                          <ul>
                            <li
                              className="nin hover"
                              onClick={() => setActiveComponent("set")}
                            >
                              <i className="bi bi-upc-scan"></i> General
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </>
                )}
              </li>
            </ul>
          </aside>
        </div>
        <div
          className={`main ${
            isOpen ? "with-margin" : "with-no-margin"
          } flexMain`}
        >
          <main>
            <NavBar sideBarClickHandler={handleVisible} />
            <div>{renderComponent()}</div>
            <div>{renderFund()}</div>
            <div>{renderSet()}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
