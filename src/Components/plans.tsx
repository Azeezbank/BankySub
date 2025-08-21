import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mtn from "../assets/mtn.png";
import airtel from "../assets/airtel.png";
import glo from "../assets/glo.png";
import nimobile from "../assets/9mobile.png";
import { apiUrl } from './Home';

interface plan {
  d_id: number;
  name: string;
  data_type: string;
  network_name: string;
  validity: string;
  user: string;
  reseller: string;
  api: string;
}
const Plans: React.FC = () => {
    const [plans, setPlans] = useState<plan[]>([]);
      const [airtelPlan, setAirtelPlan] = useState<plan[]>([]);
      const [gloPlan, setGloPlans] = useState<plan[]>([]);
      const [mobile, setMobile] = useState<plan[]>([]);

useEffect(() => {
    const fetchDataPlans = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/home/data/plan`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setPlans(response.data.mtn);
          setAirtelPlan(response.data.airtel);
          setGloPlans(response.data.glo);
          setMobile(response.data.mobile);
        }
      } catch (err: any) {
        console.error("Faild To Fetch Data Plans", err.message);
      }
    };
    fetchDataPlans();
  }, [plans]);

  return (
    <>
    <div className='pt-5 bg-light'>
    <div className="plansPP">
            <div className="grid-plans self">
              <div className="www">
                <div className="plan-color">
                  <img src={mtn} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">MTN PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {plans.map((air) => (
                      <tbody>
                        <tr key={air.d_id} className="tablehead">
                          <td>{air.network_name}</td>
                          <td>{air.name}</td>
                          <td>{air.data_type}</td>
                          <td>{air.user}</td>
                          <td>{air.reseller}</td>
                          <td>{air.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
                <div className="glo-color">
                  <img src={glo} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">GLO PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {gloPlan.map((plan) => (
                      <tbody>
                        <tr key={plan.d_id} className="tablehead">
                          <td>{plan.network_name}</td>
                          <td>{plan.name}</td>
                          <td>{plan.data_type}</td>
                          <td>{plan.user}</td>
                          <td>{plan.reseller}</td>
                          <td>{plan.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>

              <div>
                <div className="airtel-color">
                  <img src={airtel} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">AIRTEL PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {airtelPlan.map((plan) => (
                      <tbody>
                        <tr key={plan.d_id} className="tablehead">
                          <td>{plan.network_name}</td>
                          <td>{plan.name}</td>
                          <td>{plan.data_type}</td>
                          <td>{plan.user}</td>
                          <td>{plan.reseller}</td>
                          <td>{plan.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
                <div className="mobile-color">
                  <img src={nimobile} alt="mtn" className="mtn-logo" />
                  <h3 className="mtn-plans">9MOBILE PLAN</h3>
                  <table>
                    <thead className="tablehead">
                      <tr>
                        <th>Network</th>
                        <th>Plan</th>
                        <th>Type</th>
                        <th>User Price</th>
                        <th>Reseller Price</th>
                        <th>Api Price</th>
                      </tr>
                    </thead>
                    {mobile.map((plan) => (
                      <tbody>
                        <tr key={plan.d_id} className="tablehead">
                          <td>{plan.network_name}</td>
                          <td>{plan.name}</td>
                          <td>{plan.data_type}</td>
                          <td>{plan.user}</td>
                          <td>{plan.reseller}</td>
                          <td>{plan.api}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
    </>
  )
};

export default Plans;