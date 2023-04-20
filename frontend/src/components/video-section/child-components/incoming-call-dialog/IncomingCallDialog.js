import React, { useEffect, useState } from 'react'
import { acceptIncomingCallRequest, incomingCallRequestNotAnswered, rejectIncomingCallRequest } from '../../../../utils/WebRCTUtil';
import './IncomingCallDialog.scss';
import simpleTone from '../../../../assets/music/SimpleTone.mp3'


const IncomingCallDialog = ({ callerUsername }) => {
    const [str, setStr] = useState(".");
    useEffect(() => {
        if (str == ".") {
            updateStr("..")
        } else if (str == "..") {
            updateStr("...")
        } else if (str == "...") {
            updateStr(".")
        }
    }, [str])

    const updateStr = (val) => {
        setTimeout(() => {
            setStr(val)
        }, 1000);
    }

    useEffect(() => {
        setTimeout(() => {
            incomingCallRequestNotAnswered();
        }, 45000);
    }, [])

    const handleAcceptButtonPressed = () => {
        acceptIncomingCallRequest();
    };

    const handleRejectButtonPressed = () => {
        rejectIncomingCallRequest();
    };

    return (
        <div className='incomingCallDialogContainer'>
            <div className='incomingCallTitle'>Incoming Call</div>
            <div className='incomingCallerName'>{callerUsername} is calling. </div>
            <div className='trippleDot'>{str}</div>
            <div className='incomingCallButtonsContainer'>
                <button className='callAcceptBtn' onClick={handleAcceptButtonPressed}>
                    Accept
                </button>
                <button className='callRejectBtn' onClick={handleRejectButtonPressed}>
                    Reject
                </button>
            </div>
            <audio autoPlay loop>
                <source src={simpleTone} type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default IncomingCallDialog