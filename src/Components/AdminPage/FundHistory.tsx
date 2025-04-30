import React, { useState, useEffect } from "react";
import axios from "axios";

interface items {
  d_id: number;
  id: number;
  event_type: string;
  payment_ref: number;
  paid_on: any;
  amount: number;
  payment_method: string;
  payment_status: string;
  prev_balance: number;
  user_balance: number;
}
//Fund page
const FundHist: React.FC = () => {
  const [items, setItems] = useState<items[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageNums, setPageNums] = useState<number[]>([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchItems();
  });
  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `https://bankysub-api.onrender.com/payment-history?page=${page}&limit=${limit}`
      );
      setItems(response.data.data);
      setTotalPage(response.data.totalPage);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handlePage = (e: any) => {
    setPage(Number(e.target.value));
  };

  //Set up page number
  useEffect(() => {
    const numList = Array.from({ length: totalPage }, (_, i) => i + 1);
    setPageNums(numList);
  }, []);

  const handleLimitNum = (e: any) => {
    setLimit(Number(e.target.value));
  };
  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>Dashboard</h5>
        <div className="bg-white p-3">
          <p>User Wallet Funding Histories</p>
          <div className="grid-fund-hist justify-content-between">
            <div className="input-group">
              <span className="input-group-text">Page</span>
              <select
                className="inputFilter"
                aria-label="pageNum"
                onChange={handlePage}
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
                onChange={handleLimitNum}
              >
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
                <option>60</option>
                <option>70</option>
                <option>80</option>
                <option>90</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div className="table">
            <table className="table-data">
              <thead>
                <tr>
                  <th>id</th>
                  <th>event_type</th>
                  <th>payment_ref</th>
                  <th>paid_on</th>
                  <th>amount</th>
                  <th>payment_method</th>
                  <th>payment_status</th>
                  <th>prev_balance</th>
                  <th>user_balance</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.d_id}
                    className={index % 2 === 0 ? "bg-light" : "bg-white"}
                  >
                    <td>{item.id}</td>
                    <td>{item.event_type}</td>
                    <td>{item.payment_ref}</td>
                    <td>{item.paid_on}</td>
                    <td>{item.amount}</td>
                    <td>{item.payment_method}</td>
                    <td>{item.payment_status}</td>
                    <td>{item.prev_balance}</td>
                    <td>{item.user_balance}</td>
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

export default FundHist;
