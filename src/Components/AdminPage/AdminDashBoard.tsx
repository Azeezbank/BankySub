import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/SGN_09_08_2022_1662626364399-removebg-preview.png";
import "./Admin.css";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../NavBar";

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
  const [isApiGate, setIsApiGate] = useState<menuState>({});
  const navigate = useNavigate();

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
      [dataGate]: !prevDataGate[dataGate],
    }));
  };

  const handleApiGate = (apiGate: any) => {
    setIsApiGate((prevApiGate) => ({
      ...prevApiGate,
      [apiGate]: !prevApiGate[apiGate],
    }));
  };

  //Admin protected route
  useEffect(() => {
    const adminProtectPage = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api.onrender.com/api/protected/admin/route",
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
    adminProtectPage();
  }, []);

  return (
    <>
      <div className="flexEntire">
        <div
          className={`aside ${isOpen ? "visible" : "hidden"
            } flexAside admin-aside`}
        >
          <aside>
            <div className="admin-image">
              <img src={logo} alt="site logo" className="bg-white" />
              <p>BANKYTECH</p>
            </div>
            <Link to={"/admin/dashboard"} className="Link">
              <p
                className="dashb"
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
                      <Link to={"/admin/found/hist"} className="Link">
                        <li
                          className="fund-hist hover"
                        >
                          <i className="bi bi-clipboard-minus"></i> Funds
                          Histories
                        </li>
                      </Link>
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
                  </>
                )}
              </li>
            </ul>

            {/* User Page */}
            <ul className="list verification">
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
                    <Link to={"/admin/users"} className="Link">
                      <li
                        className="successful hover"
                      >
                        <i className="bi bi-infinity"></i> All
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
            </ul>
            {/* verification Page */}
            <ul className="list verification">
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

            {/* Setting Page */}
            <ul className="list verification">
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
                    <Link to={"/admin/setting"} className="Link">
                      <li
                        className="nin hover"
                      >
                        <i className="bi bi-upc-scan"></i> General
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
            </ul>

            {/* gateway to data Plans */}
            <ul className="list verification">
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
                      onClick={() => handleDataGate("dataGate")}
                    >
                      <i className="bi bi-wifi"></i>
                      <i className="bi bi-chevron-right float-end"></i> Data
                    </li>
                  </ul>
                )}
                {isDataGate.dataGate && (
                  <ul>
                    <Link to={"/admin/data/gateway"} className="Link">
                      <li
                        className="nin hover"
                      >
                        <i className="bi bi-sort-down"></i> All Data Plans
                      </li>
                    </Link>
                  </ul>
                )}
                {isGateway.gateWay && (
                  <ul>
                    <li
                      className="successful hover"
                      onClick={() => handleApiGate("ApiGate")}
                    >
                      <i className="bi bi-wifi"></i>
                      <i className="bi bi-chevron-right float-end"></i> API
                    </li>
                  </ul>
                )}
                
                {isApiGate.ApiGate && (
                  <ul>
                    <Link to={"/admin/api/docs"} className="Link">
                      <li
                        className="nin hover"
                      >
                        <i className="bi bi-sort-down"></i> API Docs
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
            </ul>

            {/* link to home page */}
            <Link to={"/user/dashboard"} className="Link">
              <div>
                <p className="navhome">
                  <i className="bi bi-house-fill"></i> Home Page
                </p>
              </div>
            </Link>
          </aside>
        </div>
        <div
          className={`main ${isOpen ? "with-margin" : "with-no-margin"
            } flexMain`}
        >
          <main>
            <NavBar sideBarClickHandler={handleVisible} />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
