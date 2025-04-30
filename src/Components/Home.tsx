import React, { useEffect, useState } from "react";
import googlePlay from "../assets/google-play.png";
import bank from "../assets/bank.png";
import airtime from "../assets/airtime.svg";
import data from "../assets/data.jpg";
import airtimeTocash from "../assets/airtime2cash.jpg";
import electricity from "../assets/utility.jpg";
import cable from "../assets/cable.jpg";
import bulk from "../assets/sms.png";
import resultChecker from "../assets/resultchecker.png";
import rechargeCard from "../assets/printer.jpg";
import referal from "../assets/referral.png";
import avatar from "../assets/avatar.png";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moniepoit from "../assets/monie.png";
import Marquee from "react-fast-marquee";
import { Typewriter } from "react-simple-typewriter";

interface bank {
  d_id: number;
  acctNo: number;
  acctName: string;
  bankName: string;
}

interface walletInfo {
  username: string;
  user_balance: string;
  packages: string;
}

interface message {
  dash_message: string;
  whatsapp_link: string;
}

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copysuccess, setCopySuccess] = useState<string>("");
  const [bankDetails, setBankDetails] = useState<bank[]>([]);
  const [isAcctN, setIsAcctN] = useState(false);
  const [walletBalance, setWalletBalance] = useState<walletInfo[]>([]);
  const [dash_message, setDash_message] = useState<message>({
    whatsapp_link: "",
    dash_message: "",
  });
  const navigate = useNavigate();
  const link = "https://tunstelecom.com.ng?ref1";

  const handleVisible = () => {
    setIsOpen(!isOpen);
  };

  //Copy referal link
  const copyClipboard = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    navigator.clipboard
      .writeText(link)
      .then(() => setCopySuccess("Link copied!"))
      .catch(() => setCopySuccess("Failed to copy link"));
    alert(copysuccess);
  };

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
        navigate("/login?");
        console.error(err.response?.data.message);
      }
    };
    ProtectPage();
  }, []);

  //Generate account number
  const handleGenerateAcct = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bankysub-api.onrender.com/dedicated/account",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Account generated");
      }
    } catch (err: any) {
      console.error("Error generating");
    }
  };

  //Fetch account details
  useEffect(() => {
    const bankDetail = async () => {
      try {
        const response = await axios.post<bank[]>(
          "https://bankysub-api.onrender.com/api/user_account",
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBankDetails(response.data);
          setIsAcctN(true);
        }
      } catch (err: any) {
        console.error(err.response?.data.message || err.message);
      }
    };
    bankDetail();
  });

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

  //Fetch dasgboard message
  useEffect(() => {
    const handleMessage = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api.onrender.com/api/dashboard-message"
        );
        if (response.status === 200) {
          setDash_message(response.data);
        }
      } catch (err: any) {
        console.error(err.response?.data.message || err.message);
      }
    };
    handleMessage();
  }, []);

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
                <Link to={"/"} className="Link">
                  {" "}
                  <p className="ps-2">Dashboard</p>{" "}
                </Link>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-reception-4"></i>
                </h3>
                <Link to={"/vend=data"} className="Link">
                  {" "}
                  <p className="ps-2">Buy Data</p>{" "}
                </Link>
              </div>
              <div className="grid-navDash">
                <h3>
                  <i className="bi bi-telephone"></i>
                </h3>
                <Link to={"/vend=airtime"} className="Link">
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

            <div className="hero">
              <h3>WELCOME TO TUNSTELECOM.COM.NG</h3>

              <Typewriter
                words={["WELCOME TO TUNSTELECOM.COM.NG"]}
                loop={Infinity}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
              <div className="grid_hero">
                <p>
                  Your plug for everything digital. We offer instant data,
                  recharge card, airtime, cable subscription, bill payment
                  e.t.c. To enjoy from our referral program, simply refer
                  people, friends and family to Tunstelecom.com.ng and Continue
                  to received massive commissions instantly on each successful
                  data purchase made by your downliners(who you refered) on the
                  portal. THIS IS CALLED SALARY FOR LIFE!
                  <br /> <br />
                  Referal Link:{" "}
                  <a href="#" className="decoration">
                    https://tunstelecom.com.ng?ref1
                  </a>{" "}
                  <button
                    type="button"
                    onClick={copyClipboard}
                    className="copyClipboard"
                  >
                    Copy
                  </button>
                </p>
                <div>
                  <button type="button" className="fund-wallet">
                    Fund wallet
                  </button>
                  <Link to={"/admin/dashboard"} className="Link">
                    <button type="button" className="admin-dash">
                      Admin Panel
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg_light">
              <div className="greating-section">
                <p className="greeting">
                  Good morning,{" "}
                  <span className="username">
                    {walletBalance.map((wallet) => wallet.username)}
                  </span>
                </p>{" "}
                <hr />
                <div className="goolePlay">
                  <a href="#">
                    <img src={googlePlay} alt="Download our app" />
                  </a>
                </div>
                <p className="text-center fw-bold">
                  Package: {walletBalance.map((packg) => packg.packages)}
                </p>
                <hr /> <hr />
                <p className="ash-background">
                  <span className="orange">**NEW**</span> Own a
                  TUNSTELECOM.COM.NG retailer website and retail all our
                  services; Such as DATA, Recharge cards printing, AIRTIME and
                  Bills Payment. <button type="button">Click here</button>
                </p>
                {/* navbar tabs */}
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#moniepoint"
                    >
                      {isAcctN ? (
                        <span>{bankDetails.map((bank) => bank.bankName)}</span>
                      ) : (
                        "NULL"
                      )}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#wema">
                      NULL
                    </a>
                  </li>
                </ul>
                {/* tab panes */}
                <div className="tab-content">
                  <div id="moniepoint" className=" tab-pane active moniepoint">
                    {isAcctN ? (
                      <span>
                        <img src={moniepoit} alt="Bank" />{" "}
                      </span>
                    ) : (
                      <img src={bank} alt="Bank" />
                    )}
                    <p className="pt-4 pb-3">
                      <strong>Account Number:</strong>{" "}
                      {isAcctN ? (
                        <span>{bankDetails.map((bank) => bank.acctNo)} </span>
                      ) : (
                        <span
                          className="generateNo"
                          onClick={handleGenerateAcct}
                        >
                          <i className="bi bi-arrow-counterclockwise "></i>
                          Generate Account Number
                        </span>
                      )}
                    </p>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-bold">
                          Account Name: Tunstelecom -{" "}
                          {bankDetails.map((bank) => bank.acctName)}
                        </p>
                        <p className="bankN">
                          Bank Name:{" "}
                          {isAcctN ? (
                            <span>
                              {bankDetails.map((bank) => bank.bankName)}{" "}
                            </span>
                          ) : (
                            "NULL"
                          )}
                        </p>
                        <p className="automatedF">AUTOMATED BANK TRANSFER</p>
                        <p className="bankN automatedF">
                          Make transfer to this account to fund your wallet
                        </p>
                      </div>
                      <div>
                        <p className="text-end">1%</p>
                        <p className="bankN automatedF">CHARGES</p>
                      </div>
                    </div>
                  </div>
                  <div id="wema" className="tab-pane fade wema">
                    <img src={bank} alt="Bank" />
                    <p className="pt-4 pb-3">
                      Account Number:{" "}
                      <span className="generateNo">
                        <i className="bi bi-arrow-counterclockwise "></i>
                        Generate Account Number
                      </span>
                    </p>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-bold">
                          Account Name: Tunstelecom - NULL
                        </p>
                        <p className="bankN">Bank Name: NULL</p>
                        <p className="automatedF">AUTOMATED BANK TRANSFER</p>
                        <p className="bankN automatedF">
                          Make transfer to this account to fund your wallet
                        </p>
                      </div>
                      <div>
                        <p className="text-end">1%</p>
                        <p className="bankN automatedF">CHARGES</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="marqueeC">
                  <Marquee speed={80} gradient={false}>
                    <h4 className="marquee">{dash_message.dash_message}</h4>
                  </Marquee>
                </div>
                <div className="grid_histories">
                  <div className="d-flex purpleShadow">
                    <p className="purple pb-2">
                      <i className="bi bi-arrow-counterclockwise"></i>
                    </p>
                    <p className="ms-2 mt-2">Transactions</p>
                  </div>
                  <div className="d-flex purpleShadow">
                    <p className="purple pb-2">
                      <i className="bi bi-arrow-counterclockwise"></i>
                    </p>
                    <p className="ms-2 mt-2">Data Transactions</p>
                  </div>
                  <div className="d-flex purpleShadow">
                    <p className="purple pb-2">
                      <i className="bi bi-arrow-counterclockwise"></i>
                    </p>
                    <p className="ms-2 mt-2">Airtime-Top-Up Transactions</p>
                  </div>
                  <div className="d-flex purpleShadow">
                    <p className="purple pb-2 bg-warning">
                      <i className="bi bi-arrow-counterclockwise"></i>
                    </p>
                    <p className="ms-2 mt-2">Wallet Summary</p>
                  </div>
                  <div className="d-flex purpleShadow">
                    <p className="purple pb-2">
                      <i className="bi bi-arrow-counterclockwise"></i>
                    </p>
                    <p className="ms-2 mt-2">Data Wallet Summary</p>
                  </div>
                </div>
              </div>

              <div className="grid-balance-section-m">
                <div className="grid-balance-section">
                  <div className="balance-section">
                    <div>
                      <p className="balance-section-color">
                        <i className="bi bi-calendar-event-fill bg-primary p-3"></i>
                      </p>
                    </div>
                    <div className="ps-2">
                      <p className="text-muted pt-2">Wallet balance</p>
                      <p className="amount">
                        # {walletBalance.map((wallet) => wallet.user_balance)}
                      </p>
                    </div>
                  </div>
                  <div className="balance-section">
                    <div>
                      <p className="balance-section-color">
                        <i className="bi bi-database-fill bg-primary p-3"></i>
                      </p>
                    </div>
                    <div className="ps-2">
                      <p className="text-muted pt-2">Commissions</p>
                      <p className="amount"># 0</p>
                    </div>
                  </div>
                  <div className="balance-section">
                    <div>
                      <p className="balance-section-color">
                        <i className="bi bi-people-fill bg-primary p-3"></i>
                      </p>
                    </div>
                    <div className="ps-2">
                      <p className="text-muted pt-2">My Total Referral</p>
                      <p>0</p>
                    </div>
                  </div>
                  <div className="notification-bg ">
                    <h5>Notification</h5>
                  </div>
                  <div className="notification-bg">
                    <h5>FAQ:</h5>
                    <p>
                      Please go through them to have a better knowledge of this
                      platform
                    </p>
                    <button className="btn bg-primary text-white">
                      {" "}
                      <span className="fw-bold">?</span> FAQs
                    </button>
                  </div>
                  <div className="notification-bg">
                    <h5>Support Team:</h5>
                    <p>
                      Have anything to say to us? Please contact our Support
                      Team on Whatsapp
                    </p>
                    <button className="btn bg-success text-white">
                      <i className="bi bi-whatsapp"></i> Whatsapp us
                    </button>
                    <p>
                      <a href={dash_message.whatsapp_link}>
                        <button className="btn bg-success text-white mt-3 text-start">
                          <i className="bi bi-whatsapp"></i> Join our whatsapp
                          group
                        </button>{" "}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="service-grid mt-5">
                  <Link to={"/vend=airtime"} className="Link">
                    <div className="service-grid-items">
                      <img
                        src={airtime}
                        alt="airtime"
                        className="service-image"
                      />
                      <p className="text-muted text-center">Airtime TopUp</p>
                    </div>
                  </Link>
                  <Link to={"/vend=data"} className="Link">
                    <div className="service-grid-items">
                      <img src={data} alt="airtime" className="service-image" />
                      <p className="text-muted">Buy Data</p>
                    </div>{" "}
                  </Link>
                  <div className="service-grid-items">
                    <img
                      src={airtimeTocash}
                      alt="airtime"
                      className="service-image"
                    />
                    <p className="text-muted">Airtime To Cash</p>
                  </div>
                  <Link to={"/vent=electicity-bill"} className="Link">
                    <div className="service-grid-items">
                      <img
                        src={electricity}
                        alt="Electricity"
                        className="service-image"
                      />
                      <p className="text-muted">Electricity Bills</p>
                    </div>{" "}
                  </Link>
                  <div className="service-grid-items">
                    <img src={cable} alt="cable" className="service-image" />
                    <p className="text-muted">Cable Subscription</p>
                  </div>
                  <div className="service-grid-items">
                    <img src={bulk} alt="airtime" className="service-image" />
                    <p className="text-muted">Bulk SMS</p>
                  </div>
                  <div className="service-grid-items">
                    <img
                      src={resultChecker}
                      alt="airtime"
                      className="service-image"
                    />
                    <p className="text-muted pt-2">Result Checker</p>
                  </div>
                  <div className="service-grid-items">
                    <img
                      src={rechargeCard}
                      alt="airtime"
                      className="service-image"
                    />
                    <p className="text-muted pt-1">Recharge Card Printing</p>
                  </div>
                  <div className="service-grid-items">
                    <img
                      src={referal}
                      alt="airtime"
                      className="service-image"
                    />
                    <p className="text-muted">My Referrals</p>
                  </div>
                </div>
              </div>
              <div className="statistics">
                <h5>TRANSACTION STATISTICS</h5> <hr />
                <div className="grid-statistics">
                  <div className="gridStatistics">
                    <h2 className="pt-1 text-warning text-center">
                      <i className="bi bi-clock cash-coin x-circle"></i>
                    </h2>
                    <h5 className="text-muted fontStat">
                      WALLET BALANCE <br />{" "}
                      <span className="text-dark"> # 0 </span>
                    </h5>
                  </div>
                  <div className="gridStatistics borderSt">
                    <h2 className="pt-1 text-success text-center">
                      <i className="bi bi-cash-coin x-circle"></i>
                    </h2>
                    <h5 className="text-muted fontStat">
                      TRANSACTIONS <br />{" "}
                      <span className="text-dark"> # 0 </span>
                    </h5>
                  </div>
                  <div className="gridStatistics">
                    <h2 className="pt-1 text-danger text-center">
                      <i className="bi bi-x-circle"></i>
                    </h2>
                    <h5 className="text-muted fontStat">
                      TOTAL SPENT <br />{" "}
                      <span className="text-dark"> # 0 </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
