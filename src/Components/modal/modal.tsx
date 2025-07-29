import React from 'react';
import './modal.css';

interface infoErr {
    notification: string
}
interface infoSus {
    notificationSus: string
}
interface infoWar {
    warning:  string
}

export const ModalErr: React.FC<infoErr> = ({ notification }) => {
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
};


export const ModalSus: React.FC<infoSus> = ({ notificationSus }) => {
    return (
        <>
        <div className='notificationDiv'>
            <div className='alert alert-danger alert-dismisible fade show notification'>
                <div className='flex-ferr-alert'>
                <h5 className='fw-bold'>Notification!</h5>
                <button type='button' className='btn-close ms-4' data-bs-dismiss='alert'></button>
                </div>
                <p>{notificationSus}</p>
            </div>
        </div>
        </>
    )
};

//Modal warning
export const ModalWar: React.FC<infoWar> = ({ warning }) => {
    return (
        <>
        <div className='notificationDiv'>
            <div className='alert alert-danger alert-dismisible fade show notification'>
                <div className='flex-ferr-alert'>
                <h5 className='fw-bold'>Notification!</h5>
                <button type='button' className='btn-close ms-4' data-bs-dismiss='alert'></button>
                </div>
                <p>{warning}</p>
            </div>
        </div>
        </>
    )
}
