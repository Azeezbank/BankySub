import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from '../Home';

interface items {
  d_id: number;
  network: number;
  airtimeType: string;
  phone_number: string;
  amount: number;
  previous_balance: number;
  new_balance: number;
  status: string
  user_balance: number;
  time: string
}
//Fund page
const AirtimeHistory: React.FC = () => {
  const [histories, setHistories] = useState<items[]>([]);
  const navigate = useNavigate();


  //Get Airtime Histories
  useEffect(() => {
    fetchItems();
  });

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/airtime/history`, { withCredentials: true }
      );
      setHistories(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  //Protect the page
  useEffect(() => {
    const ProtectPage = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/protected`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log(response.data.message);
        }
      } catch (err: any) {
        navigate("/api/auth/login");
        console.error(err.response?.data.message);
      }
    };
    ProtectPage();
  }, []);

  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>My Records</h5>
        <div className="bg-white p-3">
          <p>Airtime Transactions</p>
          <div className="grid-fund-hist justify-content-between">

            <div className="input-group">
              <input
                className="inputFilter"
                aria-label="search"
                type="search"
                placeholder="Search By Payment_ref Number"
              />
              <button className="inputFilter" aria-label="search" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>


          </div>
          <div className="table">
            <table className="table-data">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Network</th>
                  <th>Phone_number</th>
                  <th>Airtime_Type</th>
                  <th>Amount</th>
                  <th>Balance Before</th>
                  <th>New Balnce</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((hist, index) => (
                  <tr
                    key={hist.d_id}
                    className={index % 2 === 0 ? "bg-light" : "bg-white"}
                  >
                    <td>{hist.d_id}</td>
                    <td>{hist.network}</td>
                    <td>{hist.airtimeType}</td>
                    <td>{hist.amount}</td>
                    <td>{hist.phone_number}</td>
                    <td>{hist.previous_balance}</td>
                    <td>{hist.new_balance}</td>
                    <td>{hist.status}</td>
                    <td>{hist.time}</td>
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

export default AirtimeHistory;
