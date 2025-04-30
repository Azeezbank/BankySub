import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-bg bg-light">
      <h5>Dashboard</h5>
      <p className="text-muted">Welcome to Admin Dashboard</p>
      <div className="grid-dash1">
        <div className="bg-white p-2">
          <p>Stats</p>
          <div className="flex-balance">
            <div className="flex bg-light">
              <p className="dash-emoji mt-2 me-2">
                <i className="bi bi-folder p-2 bg-success"></i>{" "}
              </p>
              <div>
                <div className="text-center">0 </div>
                <div className="text-muted small-text text-center">
                  Total User Balance
                </div>
              </div>
            </div>
            <div className="flex bg-light">
              <p className="dash-emoji mt-2 me-2">
                <i className="bi bi-folder p-2 bg-primary"></i>{" "}
              </p>
              <div>
                <div className="text-center">0 </div>
                <div className="text-muted small-text text-center">
                  Previous Balance
                </div>
              </div>
            </div>
          </div>

          <div className="flex-balance">
            <div className="flex bg-light">
              <p className="dash-emoji mt-2 me-2">
                <i className="bi bi-folder p-2 bg-warning"></i>{" "}
              </p>
              <div>
                <div className="text-center">0 </div>
                <div className="text-muted small-text text-center">
                  Pending Transaction
                </div>
              </div>
            </div>
            <div className="flex bg-light">
              <p className="dash-emoji mt-2 me-2">
                <i className="bi bi-folder p-2 bg-info"></i>{" "}
              </p>
              <div>
                <div className="text-center">0 </div>
                <div className="text-muted small-text text-center">
                  Pending Withdrawals
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-2">
          <p>Expenses</p>
          <div className="flex-balance">
            <div className="flex bg-light">
              <p className="dash-emoji mt-2 me-2">
                <i className="bi bi-folder p-2 bg-primary"></i>{" "}
              </p>
              <div>
                <div className="text-center">0 </div>
                <div className="text-muted small-text">Total User Balance</div>
              </div>
            </div>
            <div className="flex bg-light">
              <p className="dash-emoji mt-2 me-2">
                <i className="bi bi-folder p-2 bg-warning"></i>{" "}
              </p>
              <div>
                <div className="text-center">0 </div>
                <div className="text-muted small-text">Total User Balance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
