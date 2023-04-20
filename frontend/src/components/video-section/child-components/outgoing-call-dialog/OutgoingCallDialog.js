import React, { useEffect, useState } from 'react'
import './OutgoingCallDialog.scss'
import { cancelOutgoingCallRequest, resetRejectReason } from '../../../../utils/WebRCTUtil';

const OutgoingCallDialog = ({ calleeUsername, callRejected }) => {
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

    const disconnectCallButtonPressed = () => {
        cancelOutgoingCallRequest();
    };

    return (
        <div className='outgoingCallDialogContainer'>
            <div className='outgoingCallTitle'>Outgoing Call</div>
            {callRejected.rejected ? (<>
                <div className='outgoingCallerName'> {callRejected.reason} </div>
                <div className='outgoingCallButtonsContainer'>
                    <button className='callRejectBtn' onClick={resetRejectReason}>
                        Close
                    </button>
                </div>
            </>) : (<>
                <div className='outgoingCallerName'> Calling to {calleeUsername}. </div>
                <div className='trippleDot'>{str}</div>
                <div className='outgoingCallButtonsContainer'>
                    <button className='callRejectBtn' onClick={disconnectCallButtonPressed}>
                        Cancel
                    </button>
                </div>
                {/* <audio autoPlay loop>
                <source src={simpleTone} type="audio/mpeg" />
            </audio> */}
            </>)}
        </div>
    )
}

export default OutgoingCallDialog