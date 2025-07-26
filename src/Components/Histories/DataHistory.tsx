import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface items {
  d_id: number;
  plan: number;
  phone_number: string;
  amount: number;
  balance_before: number;
  balance_after: number;
  status: string
  user_balance: number;
  time: string
}
//Fund page
const DataHistory: React.FC = () => {
  const [histories, setHistories] = useState<items[]>([]);
  const navigate = useNavigate();

  //Protect the page
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
        navigate("/login?");
        console.error(err.response?.data.message);
      }
    };
    ProtectPage();
  }, []);


  //Fetch data histories
  useEffect(() => {
    fetchItems();
  });

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        'https://bankysub-api-production.up.railway.app/api/data/history', { withCredentials: true }
      );
      setHistories(response.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };


  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>My Records</h5>
        <div className="bg-white p-3">
          <p>Data Transactions</p>
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
                  <th>Plan</th>
                  <th>Phone_number</th>
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
                    <td>{hist.plan}</td>
                    <td>{hist.phone_number}</td>
                    <td>{hist.amount}</td>
                    <td>{hist.balance_before}</td>
                    <td>{hist.balance_after}</td>
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

export default DataHistory;
