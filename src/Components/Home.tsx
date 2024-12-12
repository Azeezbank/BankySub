import React, { useState } from "react";
import googlePlay from "../assets/google-play.png";
import bank from "../assets/bank.png";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copysuccess, setCopySuccess] = useState("");
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

  return (
    <>
      <aside className={`aside ${isOpen ? "visible" : "hidden"}`}>
        <div>Welcome azeezbank</div>
      </aside>
      <main className={`main ${isOpen ? "with-margin" : "with-no-margin"} `}>
        <nav>
          <div className="navbar">
            <div className="nav-menu" onClick={handleVisible}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>Welcome</div>
            <div className="handburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
        <div className="hero">
          <h3>WELCOME TO TUNSTELECOM.COM.NG</h3>
          <p>Welcome to tunstelecom.com.ng</p>
          <div className="grid_hero">
            <p>
              Your plug for everything digital. We offer instant data, recharge
              card, airtime, cable subscription, bill payment e.t.c. To enjoy from
              our referral program, simply refer people, friends and family to
              Tunstelecom.com.ng and Continue to received massive commissions
              instantly on each successful data purchase made by your
              downliners(who you refered) on the portal. THIS IS CALLED SALARY
              FOR LIFE!
              <br /> <br />
              Referal Link:{" "}
              <a style={{ color: "#fff" }} href="#" className="decoration">
                https://tunstelecom.com.ng?ref1
              </a>{" "}
              <button
                onClick={copyClipboard}
                style={{
                  backgroundColor: "#000",
                  padding: "2px",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: 'small'
                }}
              >
                Copy
              </button>
            </p>
            <button
              style={{
                backgroundColor: "orange",
                borderRadius: "20px",
                width: "130px",
                height: "40px",
                margin: "5px",
              }}
            >
              Fund wallet
            </button>
          </div>
        </div>
        <div className="bg_light">
          <div className="greating-section">
            <p style={{ paddingBottom: "8px" }}>
              Good morning, <span style={{ fontWeight: "bold" }}>Username</span>
            </p>{" "}
            <hr />
            <div className="goolePlay">
              <a href="#">
                <img src={googlePlay} alt="Download our app" />
              </a>
            </div>
            <p className="text-center fw-bold">Package:</p>
            <hr /> <hr />
            <p className="ash-background">
              <span style={{ color: "orange" }}>**NEW**</span> Own a
              TUNSTELECOM.COM.NG retailer website and retail all our services;
              Such as DATA, Recharge cards printing, AIRTIME and Bills Payment.{" "}
              <button>Click here</button>
            </p>
            {/* navbar tabs */}
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-bs-toggle="tab"
                  href="#moniepoint"
                >
                  NULL
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
                <img src={bank} alt="Bank" />
                <p className="pt-4 pb-3">
                  Account Number:{" "}
                  <span className="generateNo">
                    <i className="bi bi-arrow-counterclockwise "></i>Generate
                    Account Number
                  </span>
                </p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="fw-bold">Account Name: Tunstelecom - NULL</p>
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
              <div id="wema" className="tab-pane fade wema">
                <img src={bank} alt="Bank" />
                <p className="pt-4 pb-3">
                  Account Number:{" "}
                  <span className="generateNo">
                    <i className="bi bi-arrow-counterclockwise "></i>Generate
                    Account Number
                  </span>
                </p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="fw-bold">Account Name: Tunstelecom - NULL</p>
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
            <p className="marquee">Welcome to tunstelecom</p>
            </div>
            <div className="grid_histories">
              <div className="d-flex purpleShadow" >
                <p className="purple pb-2"><i className="bi bi-arrow-counterclockwise"></i></p>
                <p className="ms-2 mt-2">Transactions</p>
              </div>
              <div className="d-flex purpleShadow" >
                <p className="purple pb-2"><i className="bi bi-arrow-counterclockwise"></i></p>
                <p className="ms-2 mt-2">Data Transactions</p>
              </div>
              <div className="d-flex purpleShadow" >
                <p className="purple pb-2"><i className="bi bi-arrow-counterclockwise"></i></p>
                <p className="ms-2 mt-2">Airtime-Top-Up Transactions</p>
              </div>
              <div className="d-flex purpleShadow" >
                <p className="purple pb-2 bg-warning"><i className="bi bi-arrow-counterclockwise"></i></p>
                <p className="ms-2 mt-2">Wallet Summary</p>
              </div>
              <div className="d-flex purpleShadow" >
                <p className="purple pb-2"><i className="bi bi-arrow-counterclockwise"></i></p>
                <p className="ms-2 mt-2">Data Wallet Summary</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-balance-section">
          <div className="balance-section">
            <div>
            <p className="balance-section-color"><i className="bi bi-calendar-event-fill bg-primary p-3"></i></p>
            </div>
            <div className="ps-2">
            <p className="text-muted pt-2">Wallet balance</p>
            <p className="amount"># 0</p>
            </div>
          </div>
          <div className="balance-section">
            <div>
            <p className="balance-section-color"><i className="bi bi-calendar-event-fill bg-primary p-3"></i></p>
            </div>
            <div className="ps-2">
            <p className="text-muted pt-2">Commissions</p>
            <p className="amount"># 0</p>
            </div>
          </div>
          <div className="balance-section">
            <div>
            <p className="balance-section-color"><i className="bi bi-calendar-event-fill bg-primary p-3"></i></p>
            </div>
            <div className="ps-2">
            <p className="text-muted">My Total Referral</p>
            <p>0</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
