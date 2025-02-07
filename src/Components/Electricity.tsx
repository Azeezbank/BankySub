import React, { useState } from "react";
import NavBar from "./NavBar";
import avatar from "../assets/avatar.png";
import { Link } from "react-router-dom";

const Electricity: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  

  const handleVisible = () => {
    setIsOpen(!isOpen);
  };

  const charges = 20;
  const handleAmount = (e: any) => {
    setAmount(e.target.value)
  }

  // const handleAmountToPay = () => {
  //   const pay = Number(amount) + charges;
  //   setAmountToPay(pay);
  // }
  const pay = Number(amount) + charges;

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
                <Link to={"/vend=data"} className="Link">
                  {" "}
                  <p className="ps-2">Buy Data</p>
                </Link>
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
              <p className="text-center pt-3">Pay Electricity Bill</p>
              <form className="transactionForm">
                <p>Disco Type</p>
                <select>
                  <option>---Select---</option>
                  <option className="option">MTN</option>
                </select>
                <p>Disco plan</p>
                <select>
                  <option>---Select---</option>
                  <option>VTU</option>
                </select>
                <label htmlFor="meter">Meter Number</label> <br />
                <div className="meter-number">
                <input type="number" placeholder="Meter Number" id="meter"/><button>Verify</button>
                </div>
                <p>Amount</p>
                <div className="input-group">
                  <p className="input-group-text bg-light">NGN.</p>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange ={handleAmount}
                    className="form-control"
                    required
                  />
                  <p className="input-group-text bg-light">.00</p>
                </div>
                <p>Amount To Pay + Charges (#{charges})</p>
                <div className="input-group">
                  <p className="input-group-text bg-light">NGN.</p>
                  <input
                    type="number"
                    placeholder="Amount To Pay"
                    className="form-control"
                    value={pay}
                    disabled
                  />
                  <p className="input-group-text bg-light">.00</p>
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

export default Electricity;
