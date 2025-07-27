import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";

interface walletInfo {
  username: string;
  user_balance: string;
  packages: string;
}

const HomeLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<walletInfo[]>([]);
  const navigate = useNavigate();

  const handleVisible = () => {
    setIsOpen(!isOpen);
  };

  //Protect Route
  useEffect(() => {
    const ProtectPage = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api-production.up.railway.app/api/protected",
          { withCredentials: true }
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
        const response = await axios.get<walletInfo[]>(
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
                  {walletBalance.map((user) => user.username)} <br />{" "}
                  <span className="navBalance">
                    balance: #
                    {walletBalance.map((wallet) => wallet.user_balance)}
                  </span>
                </p>
              </div>
            </div>
            <div className="grid-navDashh">
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-house-fill"></i>
                </h3>
                <Link to={"/user/dashboard"} className="Link">
                  {" "}
                  <p className="ps-2">Dashboard</p>{" "}
                </Link>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-reception-4"></i>
                </h3>
                <Link to={"/user/data"} className="Link">
                  {" "}
                  <p className="ps-2">Buy Data</p>{" "}
                </Link>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-telephone"></i>
                </h3>
                <Link to={"/user/airtime"} className="Link">
                  <p className="ps-2">Buy Airtime</p>
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
              <Link to={'/user/plans'} className="Link">
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-cash"></i>
                </h3>
                <p className="ps-2">Pricing</p>
              </div>
              </Link>
              <Link to={'/user/verify'} className="Link">
                <div className="grid-navDash">
                  <h3>
                    <i className="bi bi-lock"></i>
                  </h3>
                  <p className="ps-2">Account Verification</p>
                </div>
              </Link>
            </div>
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

export default HomeLayout;
