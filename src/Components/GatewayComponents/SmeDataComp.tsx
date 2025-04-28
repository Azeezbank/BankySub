import React, { useEffect, useState } from "react";
import "./GatewayCss.css";
import axios from "axios";

interface smeData {
  d_id: number;
  id: number;
  name: string;
  network_name: string
  data_type: string
  validity: string;
  user: number;
  reseller: number;
  api: number;
  is_active: string
}

const SmeDataComp: React.FC = () => {
  const [allPlan, setAlPlan] = useState<smeData[]>([]);


  // Fetch all data data plans
  useEffect(() => {
    const handleMSmeData = async () => {
      try {
        const response = await axios.get("https://bankysub-api.onrender.com/all-data-plan");
        if (response.status === 200) {
          setAlPlan(response.data);
        }
      } catch (err: any) {
        console.log(err.response?.data.error | err);
      }
    };
    handleMSmeData();
  }, []);

// handler updating allplan
  const handlePlans = (index: number, field: keyof smeData, value: string) => {
    const newPlans = [...allPlan];
    newPlans[index] = {
      ...(newPlans[index] || {}),
      [field]: value,
    };
    setAlPlan(newPlans);
  };
// submit plan updating
  const submitPlans = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put("https://bankysub-api.onrender.com/update-data-plans", allPlan);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>Dashboard</h5>
        <div className="bg-white-color">
          <div className="flex-status">
            <h6>SME Data Status</h6>{" "}
            <select aria-label="select">
              <option>active</option> <option>disabled</option>
            </select>
          </div>

          <h6 className="pt-4">ALL DATA PLAN</h6>
          <div className="input-table-container">
            <table>
              <thead className="header-color">
                <tr>
                  <th className="id-row">Id</th>
                  <th className="id-row">Name</th>
                  <th className="id-row"> Network Name</th>
                  <th className="id-row"> Data_Type</th>
                  <th className="id-row"> Validity</th>
                  <th className="id-row"> User Price</th>
                  <th className="id-row"> Reseller Price</th>
                  <th className="id-row">Api Price</th>
                  <th className="id-row">Status</th>
                </tr>
              </thead>
              <tbody>
                {allPlan.map((sme, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        className=" id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.id}
                        onChange={(e) =>
                          handlePlans(index, "id", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.name}
                        onChange={(e) =>
                          handlePlans(index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.network_name}
                        onChange={(e) =>
                          handlePlans(index, "network_name", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.data_type}
                        onChange={(e) =>
                          handlePlans(index, "data_type", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.validity}
                        onChange={(e) =>
                          handlePlans(index, "validity", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.user}
                        onChange={(e) =>
                          handlePlans(index, "user", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.reseller}
                        onChange={(e) =>
                          handlePlans(index, "reseller", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.api}
                        onChange={(e) =>
                          handlePlans(index, "api", e.target.value)
                        }
                      />
                    </td>
                    <td>
                    <select
                        className="id"
                        aria-label="select"
                        defaultValue={sme.is_active}
                        onChange={(e) =>
                          handlePlans(index, "is_active", e.target.value)
                        }
                      >
                        <option>active</option>
                        <option>disabled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="submit" onClick={submitPlans} className="update-save-button"> 
            {" "}
            save
          </button>
        </div>
      </div>
    </>
  );
};

export default SmeDataComp;
