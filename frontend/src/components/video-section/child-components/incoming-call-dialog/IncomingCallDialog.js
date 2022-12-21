import React from 'react'
import { acceptIncomingCallRequest, rejectIncomingCallRequest } from '../../../../utils/WebRCTUtil';

const IncomingCallDialog = ({ callerUsername }) => {
    const handleAcceptButtonPressed = () => {
        acceptIncomingCallRequest();
    };

    const handleRejectButtonPressed = () => {
        rejectIncomingCallRequest();
    };

    return (
        <div className=''>
            <span className=''>{callerUsername}</span>
            <div className=''>
                <button className='' onClick={handleAcceptButtonPressed}>
                    Accept
                </button>
                <button className='' onClick={handleRejectButtonPressed}>
                    Reject
                </button>
            </div>
        </div>
    );
};

export default IncomingCallDialog