import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// New page of users

// const { id } = useParams();

interface userDetails {
  d_id: number;
  id: number;
  username: string;
  user_email: string;
  user_balance: number;
  packages: number;
  Phone_number: number;
  Pin: number;
}

const User: React.FC = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<userDetails[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchvalue] = useState<userDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handlFetchUser = async () => {
      try {
        const response = await axios.get(
          `https://bankysub-api.onrender.com/users?page=${page}&limit=${limit}`
        );
        if (response.status === 200) {
          setUserDetails(response.data.data);
          setSearchvalue(response.data.data);
          setTotalPage(response.data.totalPage);
        }
      } catch (err) {
        console.error("Error selecting user information", err);
      }
    };
    handlFetchUser();
  }, [page, limit]);

  //Page number
  useEffect(() => {
    const numList = Array.from({ length: totalPage }, (_, i) => i + 1);
    setPageNumber(numList);
  }, [totalPage]);

  const handlePage = (e: any) => {
    setPage(Number(e.target.value));
  };

  //Number limit
  const handleLimitNum = (e: any) => {
    setLimit(Number(e.target.value));
  };

  //filter user by username
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setSearchvalue(userDetails);
    } else {
      const filterUser = userDetails.filter((findUser) =>
        findUser.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchvalue(filterUser);
    }
  };

  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>Dashboard</h5>
        <div className="bg-white p-3">
          <p>All Users</p>
          <div className="grid-fund-hist justify-content-between">
            <div className="input-group">
              <span className="input-group-text">Page</span>
              <select
                className="inputFilter"
                aria-label="pageNum"
                onChange={handlePage}
              >
                {pageNumber.map((userD, index) => (
                  <option key={index}>{userD}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <input
                className="inputFilter"
                aria-label="search"
                type="search"
                placeholder="Search By User Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="inputFilter"
                aria-label="search"
                type="button"
                onClick={handleSearch}
              >
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
                  <th>ID</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Wallet Balance</th>
                  <th>Plan</th>
                  <th>Phone Number</th>
                  <th>Pin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchValue.map((userD) => (
                  <tr key={userD.d_id}>
                    <td>{userD.d_id}</td>
                    <td>{userD.user_email}</td>
                    <td>{userD.username}</td>
                    <td>{userD.user_balance}</td>
                    <td>{userD.packages}</td>
                    <td>{userD.Phone_number}</td>
                    <td>{userD.Pin}</td>
                    <td
                      onClick={() => navigate(`/Admin/user=/${userD.d_id}`)}
                      className="info"
                      key={userD.d_id}
                    >
                      Info
                    </td>
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

export default User;
