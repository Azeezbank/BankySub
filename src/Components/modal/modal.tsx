import React from 'react';
import './modal.css';

interface info {
    notification: string
}

const Modal: React.FC<info> = ({ notification }) => {
    return (
        <>
        <div className='notificationDiv'>
            <div className='alert alert-danger alert-dismisible fade show notification'>
                <div className='flex-ferr-alert'>
                <h5 className='fw-bold'>Notification!</h5>
                <button type='button' className='btn-close ms-4' data-bs-dismiss='alert'></button>
                </div>
                <p>{notification}</p>
            </div>
        </div>
        </>
    )
}

export default Modal;