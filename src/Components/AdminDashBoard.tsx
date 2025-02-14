import React, { useState } from "react";
import NavBar from "./NavBar";
import logo from "../assets/SGN_09_08_2022_1662626364399.jpeg";
//import { Link } from "react-router-dom";
import "./Admin.css";

type menuState = {
  [key: string]: boolean;
};

const AdminDashBoard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenu, setIsMenu] = useState<menuState>({});
  const [isDropSub, setIsDropSub] = useState<menuState>({});
  const [isData, setIsData] = useState<menuState>({});
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
                      <li className="fund-hist hover">
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
                          <>
                            <li className="successful hover">
                              <i className="bi bi-question-circle"></i>{" "}
                              Pending
                            </li>
                            <li className="successful hover">
                              <i className="bi bi-check-circle"></i>{" "}
                              Successful
                            </li>
                            <li className="successful hover">
                              <i className="bi bi-ban"></i> Failed
                            </li>
                          </>
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
                          <>
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
                          </>
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
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
