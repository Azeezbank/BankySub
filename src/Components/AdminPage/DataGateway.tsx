import React, { useEffect, useState } from "react";
import "./GatewayCss.css";
import axios from "axios";
import { apiUrl } from '../Home';

interface DataGate {
  d_id: number;
  id: number;
  name: string;
  network_name: string;
  data_type: string;
  validity: string;
  USER: number;
  RESELLER: number;
  API: number;
  is_active: string;
}

const DataGateway: React.FC = () => {
  const [allPlan, setAlPlan] = useState<DataGate[]>([]);
  const [dataTypeNetworkName, setDataTypeNetworkName] = useState("MTN");
  const [dataTypeName, setDataTypeName] = useState("SME");
  const [isDataTypeStatus, setIsDataTypeStatus] = useState("active");
  const [isSaving, setIsSaving] = useState<boolean>(true);
  const [isUpdate, setIsUpdate] = useState<boolean>(true);

  // Fetch all data data plans
  useEffect(() => {
    const handleMSmeData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/data/all/plan`, { withCredentials: true }
        );
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
  const handlePlans = (index: number, field: keyof DataGate, value: string) => {
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
      setIsSaving(false)
      await axios.put(
        `${apiUrl}/api/data/update/plans`,
        allPlan, { withCredentials: true }
      );
      setIsSaving(true)
    } catch (err: any) {
      console.log(err);
      setIsSaving(true)
    }
  };

  //Data plans status
  const handlePlanStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsUpdate(false)
      await axios.put(
        `${apiUrl}/api/data/update/types/status`,
        { dataTypeNetworkName, dataTypeName, isDataTypeStatus }, { withCredentials: true }
      );
      setIsUpdate(true);
    } catch (err: any) {
      console.error(err);
      setIsUpdate(true);
    }
  };

  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>Dashboard</h5>
        <div className="bg-white-color">
          <div>

            <h6>Data Status</h6>
            <div className="d-flex status-input">
              <select
                aria-label="network"
                onChange={(e) => setDataTypeNetworkName(e.target.value)}
              >
                <option>~~~</option>
                <option>MTN</option>
                <option>AIRTEL</option>
                <option>GLO</option>
                <option>9MOBILE</option>

              </select>
              <select
                aria-label="name"
                onChange={(e) => setDataTypeName(e.target.value)}
              >
                <option>~~~</option>
                <option>SME</option>
                <option>GIFTING</option>
                <option>CORPORATE GIFTING</option>
                <option>SME2</option>
                <option>DATA SHARE</option>
                <option>DATA COUPON</option>
              </select>

              <select
                aria-label="select"
                onChange={(e) => setIsDataTypeStatus(e.target.value)}
              >
                <option>~~~</option>
                <option>active</option>
                <option>disabled</option>
              </select>
            </div>
            <div className="data_type_update">
              {isUpdate ? (
                <button type="button" onClick={handlePlanStatus}>
                  Update
                </button>
              ) : (
                <button type="button" onClick={handlePlanStatus}>
                  Updating...
                </button>
              )}
            </div>

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
                  <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
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
                        defaultValue={sme.USER}
                        onChange={(e) =>
                          handlePlans(index, "USER", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.RESELLER}
                        onChange={(e) =>
                          handlePlans(index, "RESELLER", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="id"
                        type="text"
                        aria-label="input"
                        defaultValue={sme.API}
                        onChange={(e) =>
                          handlePlans(index, "API", e.target.value)
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
                        <option>{sme.is_active}</option>
                        <option>active</option>
                        <option>disabled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isSaving ? (
            <button
              type="submit"
              onClick={submitPlans}
              className="update-save-button"
            >
              {" "}
              Save
            </button>
          ) : (
            <button
              type="submit"
              onClick={submitPlans}
              className="update-save-button"
            >
              {" "}
              Saving...
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DataGateway;
