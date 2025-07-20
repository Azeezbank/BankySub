import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ApiDocs.css';

interface api {
  d_id: number,
  service_type: string, 
  api_key: string, 
  api_url: string
}
const ApiDocs: React.FC = () => {
  const [service_type, setService_type] = useState<string>('');
  const [api_key, setApi_key] = useState<string>('');
  const [api_url, setApi_url] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [apiDocs, setApiDocs] = useState<api[]>([]);


  //Fech API documents
  useEffect(() => {
    const fetchApiDocs = async () => {
      try {
        const response = await axios.get('https://bankysub-api.onrender.com/api/env', {withCredentials: true});
        if (response.status === 200) {
        setApiDocs(response.data);
        }
      } catch (err: any) {
        console.error('Failed to fetch API docs', err.response?.data.message || err.message)
      }
    }
    fetchApiDocs();
  })


  //Update API docs
  const handleApiGate = async () => {
    setIsUpdate(true)
    try {
      const response = await axios.post(
        'https://bankysub-api.onrender.com/api/env', { service_type, api_key, api_url }, {withCredentials: true})
      if (response.status === 200) {
        setIsUpdate(false);
      }
    } catch (err: any) {
      console.log('Failed to update api docs', err.response?.data?.message || err.message)
      setIsUpdate(false)
    }
  };

  return (
    <>
      <div className="dashboard-bg bg-light">
        <h5>Dashboard</h5>
        <div className="bg-white-color">
          <div>
            <h6>API Keys</h6>
            <div className="api-input-form">

              <div className='input-form-div'>
                <label htmlFor='service_type'>Service Type</label> <br />
                <select
                  className='input-form'
                  aria-label="network"
                  id='service_type'
                  name='service_type'
                  onChange={(e) => setService_type(e.target.value)}
                >
                  <option>~~~</option>
                  <option>VTU</option>
                  <option>SME</option>
                  <option>GIFTING</option>
                  <option>CORPORATE GIFTING</option>
                  <option>DATA COUPON</option>
                  <option>DATA SHARE</option>
                  <option>SME2</option>
                </select>
              </div>

              <div className='input-form-div'>
                <label htmlFor='api_key'>Api_key</label><br />
                <input className='input-form' type='text' name='api_key' id='api_key' placeholder='Key' onChange={(e) => setApi_key(e.target.value)} />
              </div>

              <div className='input-form-div'>
                <label htmlFor='api_url'>Api_url</label> <br />
                <input className='input-form' type='text' name='api_url' id='api_url' placeholder='Url' onChange={(e) => setApi_url(e.target.value)} />
              </div>

            </div>
            <div className="data_type_update api-btn">
              {isUpdate ? (
                <button type="button" onClick={handleApiGate}>
                  Updating...
                </button>
              ) : (
                <button type="button" onClick={handleApiGate}>
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white-color mt-2">
          {apiDocs?.map((api) => (
          <div key={api.d_id} className='api-map'>
            <p className='bg-light p-1'>{api.service_type}</p>
            <p className='bg-light p-1'>{api.api_key}</p>
            <p className='bg-light p-1'>{api.api_url}</p>
          </div>
          ))}
        </div>
      </div>
    </>
  )
};

export default ApiDocs;
