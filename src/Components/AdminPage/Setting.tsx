import React, { useState, useEffect } from "react";
import axios from "axios";

interface AdminDetails {
  whatsapp_phone: string;
  whatsapp_link: string;
  whatsapp_number: string
  dash_message: string;
}

const Setting: React.FC = () => {
  const [info, setInfo] = useState<AdminDetails>({
    whatsapp_phone: "",
    whatsapp_number: "",
    whatsapp_link: "",
    dash_message: "",
  });

  //Fetch admin details on component mount
  useEffect(() => {
    const handleAdminDetailUpdate = async () => {
      try {
        const response = await axios.get(
          "https://bankysub-api-production.up.railway.app/api/admin/details", { withCredentials: true}
        );
        if (response.status === 200) {
          setInfo(response.data);
          console.log("Updated");
        }
      } catch (err: any) {
        console.error(err.response?.data?.message);
      }
    };
    handleAdminDetailUpdate();
  }, []);


  //Update details
  const handleAdminDetails = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://bankysub-api-production.up.railway.app/api/admin/details/updated/setting",
        info, { withCredentials: true}
      );
      if (response.status === 200) {
        console.log("Updated");
      }
    } catch (err: any) {
      console.error(err.response?.data?.message);
    }
  };

  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>Dashboard</h5>
        <div className="bg-white p-3">
          <p>General</p>
          <div className="contact-sec">
            <p className="bg-white pt-3 pb-3 ps-2 pe-2">Contact Information</p>
            <div className="contact-input">
              <div className="input-group pb-2">
                <span className="input-group-text">Phone +234(0)</span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="phone"
                  value={info.whatsapp_phone}
                  onChange={(e) =>
                    setInfo({ ...info, whatsapp_phone: e.target.value })
                  }
                />
              </div>
              <div className="input-group pb-2">
                <span className="input-group-text">WhatsApp +234(0)</span>
                <input
                  className="contact-input-field form-control"
                  aria-label="whatsappNumber"
                  type="text"
                  value={info.whatsapp_number}
                  onChange={(e) =>
                    setInfo({ ...info, whatsapp_number: e.target.value })
                  }
                />
              </div>
              <div className="input-group pb-2">
                <span className="input-group-text">WhatsApp Group Link</span>
                <input
                  className="form-control"
                  aria-label="link"
                  type="text"
                  value={info.whatsapp_link}
                  onChange={(e) =>
                    setInfo({ ...info, whatsapp_link: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="contact-sec mt-3">
            <p className="bg-white pt-3 pb-3 ps-2 pe-2">Messages</p>
            <p className="ps-3">
              <strong>Message Your Users</strong>
            </p>
            <div className="contact-input">
              <textarea
                className="textarea"
                aria-label="text"
                rows={2}
                value={info.dash_message}
                onChange={(e) =>
                  setInfo({ ...info, dash_message: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            className="set-save-btn float-end"
            onClick={handleAdminDetails}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Setting;
