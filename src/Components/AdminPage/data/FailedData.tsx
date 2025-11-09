import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from '../../Home';

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
const FailedData: React.FC = () => {
  const [histories, setHistories] = useState<items[]>([]);
  const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [pageNums, setPageNums] = useState<number[]>([]);
    const [limit, setLimit] = useState(10);
    const [totalLimit, setTotalLimit] = useState(10);
    const [limitNum, setlimitNum] = useState<number[]>([]);
  
  const navigate = useNavigate();

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
        `${apiUrl}/api/data/all/failed/data?page=${page}&limit=${limit}`, { withCredentials: true }
      );
      setHistories(response.data.result);
      setTotalPage(response.data.totalPage);
      setTotalLimit(response.data.total);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

   //Set up page number
    useEffect(() => {
      const numList = Array.from({ length: totalPage }, (_, i) => i + 1);
      setPageNums(numList);
    }, []);
  
    //Set up limit number 
    useEffect(() => {
      const limitList = Array.from({ length: totalLimit }, (_, i) => (i + 1) * 10);
      setlimitNum(limitList);
    }, []);


  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>My Records</h5>
        <div className="bg-white p-3">
          <p>Data Transactions</p>
          <div className="grid-fund-hist justify-content-between">
            <div className="input-group">
              <span className="input-group-text">Page</span>
              <select
                className="inputFilter"
                aria-label="pageNum"
                onChange={(e) => setPage(Number(e.target.value))}
              >
                {pageNums.map((pageNum) => (
                  <option key={pageNum}>{pageNum}</option>
                ))}
              </select>
            </div>

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
            <div className="input-group">
              <span className="input-group-text">Limit</span>
              <select
                className="inputFilter"
                aria-label="limit"
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                {limitNum.map((limit) => (
                  <option key={limit}>{limit}</option>
                ))
                }

              </select>
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

export default FailedData;
