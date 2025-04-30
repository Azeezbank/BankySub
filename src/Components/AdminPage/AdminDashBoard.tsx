import React, { useEffect, useState } from "react";
import logo from "../../assets/SGN_09_08_2022_1662626364399.jpeg";
//import { Link } from "react-router-dom";
import "./Admin.css";
import axios from "axios";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import UserInfo from "../UserInfo";
import { useParams } from "react-router-dom";
import SmeDataComp from "./SmeDataComp";
import NavBar from "../NavBar";
import FundHist from "./FundHistory";

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
  const [isUser, setIsUser] = useState<menuState>({});
  const [isGateway, setIsGateway] = useState<menuState>({});
  const [isDataGate, setIsDataGate] = useState<menuState>({});
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

  const handleUser = (user: any) => {
    setIsUser((prevUser) => ({
      ...prevUser,
      [user]: !prevUser[user],
    }));
  };

  const handleIsGateay = (gate: any) => {
    setIsGateway((prevGate) => ({
      ...prevGate,
      [gate]: !prevGate[gate],
    }));
  };

  const handleDataGate = (dataGate: any) => {
    setIsDataGate((prevDataGate) => ({
      ...prevDataGate,
      [dataGate]: !prevDataGate[dataGate]
    }))
  }

  //User information
  const navigate = useNavigate();
  const { id } = useParams();

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


  //render fund
  const renderFund = () => {
    if (activeComponent === "FundH") {
      return <FundHist />;
    }
  };

  //Setting component
  interface AdminDetails {
    whatsapp_phone: string;
    whatsapp_link: string;
    dash_message: string;
  }
  const Setting = () => {
   
    const [info, setInfo] = useState<AdminDetails>({
      whatsapp_phone: "",
      whatsapp_link: "",
      dash_message: "",
    });

    useEffect(() => {
      const handleAdminDetailUpdate = async () => {
        try {
          const response = await axios.get(
            "https://bankysub-api.onrender.com/api/admin-details"
          );
          if (response.status === 200) {
            setInfo(response.data);
            console.log("Updated");
          }
        } catch (err: any) {
          console.error(err.response?.data?.message);
        }
      };
      handleAdminDetailUpdate();
    }, []);

    const handleAdminDetails = async (e: any) => {
      e.preventDefault();
      try {
        const response = await axios.put(
          "https://bankysub-api.onrender.com/api/updated=setting=details",
          info
        );
        if (response.status === 200) {
          console.log("Updated");
        }
      } catch (err: any) {
        console.error(err.response?.data?.message);
      }
    };

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
                    type="text"
                    className="form-control"
                    aria-label="phone"
                    value={info.whatsapp_phone}
                    onChange={(e) =>
                      setInfo({ ...info, whatsapp_phone: e.target.value })
                    }
                  />
                </div>
                <div className="input-group pb-2">
                  <span className="input-group-text">WhatsApp +234(0)</span>
                  <input
                    className="contact-input-field form-control"
                    aria-label="link"
                    type="text"
                    value={info.whatsapp_phone}
                    onChange={(e) =>
                      setInfo({ ...info, whatsapp_phone: e.target.value })
                    }
                  />
                </div>
                <div className="input-group pb-2">
                  <span className="input-group-text">WhatsApp Group Link</span>
                  <input
                    className="form-control"
                    aria-label="link"
                    type="text"
                    value={info.whatsapp_link}
                    onChange={(e) =>
                      setInfo({ ...info, whatsapp_link: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="contact-sec mt-3">
              <p className="bg-white pt-3 pb-3 ps-2 pe-2">Messages</p>
              <p className="ps-3">
                <strong>Message Your Users</strong>
              </p>
              <div className="contact-input">
                <textarea
                  className="textarea"
                  aria-label="text"
                  rows={2}
                  value={info.dash_message}
                  onChange={(e) =>
                    setInfo({ ...info, dash_message: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <button
              type="button"
              className="set-save-btn float-end"
              onClick={handleAdminDetails}
            >
              Save
            </button>
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

  //Users component
  interface userDetails {
    d_id: number;
    id: number;
    username: string;
    user_email: string;
    user_balance: number;
    packages: number;
    Phone_number: number;
    Pin: number;
  }

  const User = () => {
    const [userDetails, setUserDetails] = useState<userDetails[]>([]);
    const [totalPage, setTotalPage] = useState(1);
    const [pageNumber, setPageNumber] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchvalue] = useState<userDetails[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      const handlFetchUser = async () => {
        try {
          const response = await axios.get(
            `https://bankysub-api.onrender.com/users?page=${page}&limit=${limit}`
          );
          if (response.status === 200) {
            setUserDetails(response.data.data);
            setSearchvalue(response.data.data);
            setTotalPage(response.data.totalPage);
          }
        } catch (err) {
          console.error("Error selecting user information", err);
        }
      };
      handlFetchUser();
    }, []);

    //Page number
    useEffect(() => {
      const numList = Array.from({ length: totalPage }, (_, i) => i + 1);
      setPageNumber(numList);
    }, [totalPage]);

    const handlePage = (e: any) => {
      setPage(Number(e.target.value));
    };

    //Number limit
    const handleLimitNum = (e: any) => {
      setLimit(Number(e.target.value));
    };

    //filter user by username
    const handleSearch = (e: any) => {
      e.preventDefault();
      if (searchTerm.trim() === "") {
        setSearchvalue(userDetails);
      } else {
        const filterUser = userDetails.filter((findUser) =>
          findUser.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchvalue(filterUser);
      }
    };

    return (
      <>
        <div className="dashboard-bg bg-light">
          <h5>Dashboard</h5>
          <div className="bg-white p-3">
            <p>All Users</p>
            <div className="grid-fund-hist justify-content-between">
              <div className="input-group">
                <span className="input-group-text">Page</span>
                <select
                  className="inputFilter"
                  aria-label="pageNum"
                  onChange={handlePage}
                >
                  {pageNumber.map((userD, index) => (
                    <option key={index}>{userD}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <input
                  className="inputFilter"
                  aria-label="search"
                  type="search"
                  placeholder="Search By User Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  className="inputFilter"
                  aria-label="search"
                  type="button"
                  onClick={handleSearch}
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>

              <div className="input-group">
                <span className="input-group-text">Limit</span>
                <select
                  className="inputFilter"
                  aria-label="limit"
                  onChange={handleLimitNum}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                  <option>70</option>
                  <option>80</option>
                  <option>90</option>
                  <option>100</option>
                </select>
              </div>
            </div>
            <div className="table">
              <table className="table-data">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Wallet Balance</th>
                    <th>Plan</th>
                    <th>Phone Number</th>
                    <th>Pin</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchValue.map((userD) => (
                    <tr key={userD.d_id}>
                      <td>{userD.id}</td>
                      <td>{userD.user_email}</td>
                      <td>{userD.username}</td>
                      <td>{userD.user_balance}</td>
                      <td>{userD.packages}</td>
                      <td>{userD.Phone_number}</td>
                      <td>{userD.Pin}</td>
                      <td
                        onClick={() => navigate(`/Admin/user=/${userD.d_id}`)}
                        className="info"
                        key={userD.d_id}
                      >
                        Info
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Render user component
  const renderUser = () => {
    if (activeComponent === "user") {
      return <User />;
    }
  };

  // Render Sme Data Ggateway components
  const renderSmeDataComp = () => {
    if (activeComponent === 'sme') {
       return <SmeDataComp />;
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
            <Link to={"/"} className="Link">
              <p
                className="dashb"
                onClick={() => setActiveComponent("Dashboard")}
              >
                <i className="bi bi-columns-gap"></i> Dashboard
              </p>
            </Link>
            <p className="dashb">
              <i className="bi bi-chat-left-text"></i> Messsages
            </p>

            {/* Fund history */}
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
                              <i className="bi bi-person-bounding-box"></i> NIN
                            </li>
                            <li className="nin hover">
                              <i className="bi bi-person-badge-fill"></i> BVN
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

                    {/* User */}
                    <ul className="list">
                      <li className="list-mar">
                        <div
                          className="bg-primary fund-hist hover"
                          onClick={() => handleUser("user")}
                        >
                          <i className="bi bi-person-fill-gear"></i> Users
                          <i className="bi bi-chevron-right float-end"></i>
                        </div>
                        {isUser.user && (
                          <ul>
                            <li
                              className="successful hover"
                              onClick={() => setActiveComponent("user")}
                            >
                              <i className="bi bi-infinity"></i> All
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>

                    {/* gateway */}
                    <ul className="list">
                      <li className="list-mar">
                        <div
                          className="bg-primary fund-hist hover"
                          onClick={() => handleIsGateay("gateWay")}
                        >
                          <i className="bi bi-backpack4"></i> Gateway
                          <i className="bi bi-chevron-right float-end"></i>
                        </div>
                        {isGateway.gateWay && (
                          <ul>
                            <li
                              className="successful hover"
                              onClick={() => handleDataGate('dataGate')}
                            >
                              <i className="bi bi-wifi"></i> 
                              <i className="bi bi-chevron-right float-end"></i> Data
                            </li>
                          </ul>
                        )}
                        {isDataGate.dataGate && (
                          <ul>
                            <li className="nin hover" onClick={() => setActiveComponent('sme')}>
                              <i className="bi bi-sort-down"></i> All Data Plans
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
            <div>{renderUser()}</div>
            <div>{renderSmeDataComp()}</div>
            <Routes>
              <Route path={`/user=/:${id}`} element={<UserInfo />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
