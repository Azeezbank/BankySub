import React from 'react';
import './modal.css';

interface infoErr {
    notification: string,
    onButtonClick: () => void
}
interface infoSus {
    notificationSus: string,
    onButtonClick: () => void
}
interface infoWar {
    warning:  string,
    onButtonClick: () => void
}

export const ModalErr: React.FC<infoErr> = ({ notification }) => {
    return (
        <>
        <div className='notificationDiv'>
            <div className='alert alert-danger alert-dismisible fade show notification'>
                <div className='flex-ferr-alert'>
                <h5 className='fw-bold'>Error!</h5>
                <button type='button' className='btn-close ms-4' data-bs-dismiss='alert'></button>
                </div>
                <p>{notification}</p>
            </div>
        </div>
        </>
    )
};


export const ModalSus: React.FC<infoSus> = ({ notificationSus, onButtonClick }) => {
    return (
        <>
        <div className='notificationDiv'>
            <div className='alert alert-success alert-dismisible fade show notification'>
                <div className='flex-ferr-alert'>
                <h5 className='fw-bold'>Success!</h5>
                <button type='button' className='btn-close ms-4' data-bs-dismiss='alert' onClick={onButtonClick}></button>
                </div>
                <p>{notificationSus}</p>
            </div>
        </div>
        </>
    )
};

//Modal warning
export const ModalWar: React.FC<infoWar> = ({ warning, onButtonClick }) => {
    return (
        <>
        <div className='notificationDiv'>
            <div className='alert alert-warning alert-dismisible fade show notification'>
                <div className='flex-ferr-alert'>
                <h5 className='fw-bold'>Warning!</h5>
                <button type='button' className='btn-close ms-4' data-bs-dismiss='alert' onClick={onButtonClick}></button>
                </div>
                <p>{warning}</p>
            </div>
        </div>
        </>
    )
}
