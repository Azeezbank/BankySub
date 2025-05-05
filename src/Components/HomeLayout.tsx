import React, { useEffect, useState } from "react";
// import googlePlay from "../assets/google-play.png";
// import bank from "../assets/bank.png";
// import airtime from "../assets/airtime.svg";
// import data from "../assets/data.jpg";
// import airtimeTocash from "../assets/airtime2cash.jpg";
// import electricity from "../assets/utility.jpg";
// import cable from "../assets/cable.jpg";
// import bulk from "../assets/sms.png";
// import resultChecker from "../assets/resultchecker.png";
// import rechargeCard from "../assets/printer.jpg";
// import referal from "../assets/referral.png";
import avatar from "../assets/avatar.png";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";
// import moniepoit from "../assets/monie.png";
// import Marquee from "react-fast-marquee";
// import { Typewriter } from "react-simple-typewriter";

// interface bank {
//   d_id: number;
//   acctNo: number;
//   acctName: string;
//   bankName: string;
// }

interface walletInfo {
  username: string;
  user_balance: string;
  packages: string;
}

// interface message {
//   dash_message: string;
//   whatsapp_link: string;
// }

const HomeLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [copysuccess, setCopySuccess] = useState<string>("");
  // const [bankDetails, setBankDetails] = useState<bank[]>([]);
  // const [isAcctN, setIsAcctN] = useState(false);
  const [walletBalance, setWalletBalance] = useState<walletInfo[]>([]);
  // const [dash_message, setDash_message] = useState<message>({
  //   whatsapp_link: "",
  //   dash_message: "",
  // });
  const navigate = useNavigate();
  // const link = "https://tunstelecom.com.ng?ref1";

  const handleVisible = () => {
    setIsOpen(!isOpen);
  };

  // //Copy referal link
  // const copyClipboard = (event: React.MouseEvent<HTMLButtonElement>): void => {
  //   event.preventDefault();
  //   navigator.clipboard
  //     .writeText(link)
  //     .then(() => setCopySuccess("Link copied!"))
  //     .catch(() => setCopySuccess("Failed to copy link"));
  //   alert(copysuccess);
  // };

  //Protect Route
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
        navigate("/login");
        console.error(err.response?.data.message);
      }
    };
    ProtectPage();
  }, []);

  // //Generate account number
  // const handleGenerateAcct = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://bankysub-api.onrender.com/dedicated/account",
  //       {},
  //       { withCredentials: true }
  //     );
  //     if (response.status === 200) {
  //       console.log("Account generated");
  //     }
  //   } catch (err: any) {
  //     console.error("Error generating");
  //   }
  // };

  // //Fetch account details
  // useEffect(() => {
  //   const bankDetail = async () => {
  //     try {
  //       const response = await axios.post<bank[]>(
  //         "https://bankysub-api.onrender.com/api/user_account",
  //         {},
  //         { withCredentials: true }
  //       );
  //       if (response.status === 200) {
  //         setBankDetails(response.data);
  //         setIsAcctN(true);
  //       }
  //     } catch (err: any) {
  //       console.error(err.response?.data.message || err.message);
  //     }
  //   };
  //   bankDetail();
  // });

  //Fetch user information
  useEffect(() => {
    const handleUserInfo = async () => {
      try {
        const response = await axios.get<walletInfo[]>(
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
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
