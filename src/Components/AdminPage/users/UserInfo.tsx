import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserInfo.css';

interface UserInfo {
    d_id: number,
    username: string,
    user_email: string,
    user_balance: number,
    packages: string,
    Phone_number: string,
    Pin: number,
    fullName: string
}

const UserInfo: React.FC = () => {

    const [amount, setAmount] = useState(0);
    const [userDetails, setUserDetails] = useState<UserInfo>({
        d_id: 0,
        username: "",
        user_email: "",
        user_balance: 0,
        packages: "",
        Phone_number: "",
        Pin: 0,
        fullName: ""
    });
    const [isloading, setIsLOading] = useState(true);
    const [isBanning, setIsBanning] = useState(true);
    const { id } = useParams();

    //Fetch user details on component mount
    useEffect(() => {
        UserDetails();
    }, [])
    const UserDetails = async () => {
        try {
            const response = await axios.get(`https://bankysub-api.onrender.com/api/user_info/${id}`, { withCredentials: true });
            if (response.status === 200) {
                setUserDetails(response.data);
            }
        } catch (err: any) {
            console.error("Error fetching user information", err.message);
        }
    };

    //Update user details
    const handleUpdateUser = async (fieldName: any, value: any) => {
        try {
            const response = await axios.put(`https://bankysub-api.onrender.com/api/update/user/${id}`, { fieldName, value }, { withCredentials: true });
            if (response.status === 200) {
                console.log("User details updated successfully");
                UserDetails(); // Refresh user details after update
            }
        } catch (err: any) {
            console.error("Error updating user information", err.message);
        }
    };

    //Update user wallet
    const handleUpdateWallet = async () => {
        setIsLOading(false);
        try {
            const response = await axios.post(`https://bankysub-api.onrender.com/api/fund/user/${id}`, { amount }, { withCredentials: true });
            if (response.status === 200) {
                console.log("User wallet updated successfully");
                setIsLOading(true);
            }
        } catch (err: any) {
            console.error("Error updating user wallet", err.message);
            setIsLOading(true);
        }
    };

    //Ban user
    const handleBanUser = async () => {
        try {
            setIsBanning(false);
            const response = await axios.put(`https://bankysub-api.onrender.com/api/ban/user/${id}`, {}, { withCredentials: true });
            if (response.status === 200) {
                console.log("User banned successfully");
                alert("User has been banned successfully");
                UserDetails(); // Refresh user details after banning
                setIsBanning(true);
            }
        } catch (err: any) {
            console.error("Error banning user", err.message);
            setIsBanning(true);
        }
    };

    return (
        <>
            <div className="dashboard-bg bg-light">
                <h5>Dashboard</h5>
                <div className="bg-white p-3">
                    <div>
                        <h4>
                            <span> ({userDetails.d_id}) </span>
                            <span>{userDetails.username}</span>
                        </h4>
                    </div>
                    <div className='d-flex'>
                        <ul className='nav nav-tabs mt-2'>
                            <li className='active'> <a data-toggle="tab" href='#info' className='info-btn Link'> Information & Action</a></li>
                        </ul>
                        <div className='d-flex justify-content-end'>
                            {isBanning ? (
                            <button type='button' className='ban' onClick={handleBanUser}>Ban User</button>
                            ) : (
                            <button type='button' className='ban' onClick={handleBanUser}>Please Wait...</button>
                            )}
                        </div>
                    </div>

                    <div className='nav-content'>
                        <div className='tab-pane fade-in active grid-userDetails' id='info'>

                            <div className='bg-light'>
                                <p className='user-label'>Full Name</p>
                                <div className='container-box'>
                                    <div>
                                        <h4 className='text-center'><i className='bi bi-folder info-logo'></i></h4>

                                        <h5 className='container-box'>{userDetails.fullName}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-light'>
                                <p className='user-label'>Email</p>
                                <div className='container-box'>
                                    <div>
                                        <h4 className='text-center'><i className='bi bi-folder info-logo'></i></h4>
                                        <h5 className='container-box'>{userDetails.user_email}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-light'>
                                <p className='user-label'>Wallet Balance</p>
                                <div className='container-box'>
                                    <div>
                                        <h4 className='text-center'> <i className='bi bi-folder info-logo'></i></h4>
                                        <h5 className='container-box'># {userDetails.user_balance}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-light'>
                                <p className='user-label'>Phone Number</p>
                                <div className='container-box'>
                                    <div>
                                        <h4 className='text-center'> <i className='bi bi-folder info-logo'></i></h4>
                                        <h5 className='container-box'>{userDetails.Phone_number}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-light'>
                                <p className='user-label'>Pin</p>
                                <div className='container-box'>
                                    <div>
                                        <h4 className='text-center'><i className='bi bi-folder info-logo'></i></h4>
                                        <h5 className='container-box'>{userDetails.Pin}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-light'>
                                <p className='user-label'>Package</p>
                                <div className='container-box'>
                                    <div>
                                        <h4 className='text-center'> <i className='bi bi-folder info-logo'></i> </h4>
                                        <h5 className='container-box'>{userDetails.packages}</h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <h3 className='adjust-header'>ADJUST USER INFO</h3>
                        <div>
                            <div>
                                <label htmlFor='FullName' >Modify Full Name</label>
                                <div className='form-group d-flex'>
                                    <input type='text' value={userDetails.fullName} onChange={(e) => setUserDetails({ ...userDetails, fullName: e.target.value })} id='FullName' className='form-control mb-3' />
                                    <button className='user-info-btn' onClick={() => handleUpdateUser('fullName', userDetails.fullName)}>Update</button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor='mail' >Modify Email</label>
                                <div className='form-group d-flex'>
                                    <input type='text' value={userDetails.user_email} onChange={(e) => setUserDetails({ ...userDetails, user_email: e.target.value })} id='mail' className='form-control mb-3' />
                                    <button className='user-info-btn' onClick={() => handleUpdateUser('user_email', userDetails.user_email)}>Update</button>
                                </div>
                                <div>
                                    <label htmlFor='wallet' >Modify User Wallet '-' will deduct</label>
                                    <div className='form-group d-flex'>
                                        <input type='number' onChange={(e) => setAmount(Number(e.target.value))} id='wallet' className='form-control mb-3' />
                                        {isloading ? (
                                            <button className='user-info-btn' onClick={handleUpdateWallet}>Update</button>
                                        ) : (
                                            <button className='user-info-btn' disabled>Updating...</button>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor='phone' >Modify Phone Number</label>
                                        <div className='form-group d-flex'>
                                            <input type='text' value={userDetails.Phone_number} onChange={(e) => setUserDetails({ ...userDetails, Phone_number: e.target.value })} id='phone' className='form-control mb-3' />
                                            <button className='user-info-btn' onClick={() => handleUpdateUser('Phone_number', userDetails.Phone_number)}>Update</button>
                                        </div>
                                        <div>
                                            <label htmlFor='pin' >Modify Pin</label>
                                            <div className='form-group d-flex'>
                                                <input type='text' value={userDetails.Pin} onChange={(e) => setUserDetails({ ...userDetails, Pin: Number(e.target.value) })} id='pin' className='form-control mb-3' />
                                                <button className='user-info-btn' onClick={() => handleUpdateUser('Pin', userDetails.Pin)}>Update</button>
                                            </div>
                                            <div>
                                                <label htmlFor='package' >Modify Package</label>
                                                <div className='form-group d-flex'>
                                                    <input type='text' value={userDetails.packages} onChange={(e) => setUserDetails({ ...userDetails, packages: e.target.value })} id='package' className='form-control mb-3' />
                                                    <button className='user-info-btn' onClick={() => handleUpdateUser('packages', userDetails.packages)}>Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserInfo;