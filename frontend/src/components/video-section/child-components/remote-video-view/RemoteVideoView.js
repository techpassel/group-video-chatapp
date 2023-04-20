import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import "./RemoteVideoView.scss"
import { hangupOngoingCall } from '../../../../utils/WebRCTUtil';

const RemoteVideoView = ({ remoteStream }) => {
    // const { remoteStream } = useSelector((state) => state.call);
    const [mute, setMute] = useState(true);
    const remoteVideoRef = useRef();

    useEffect(() => {
        if (remoteStream) {
            const remoteVideo = remoteVideoRef.current;
            remoteVideo.srcObject = remoteStream;

            remoteVideo.onloadedmetadata = () => {
                remoteVideo.play();
            };
        }
    }, [remoteStream]);

    const handleMuteBtn = () => {
        setMute(!mute);
    }

    return (
        <div className="remoteVideoContainer">
            <div className='videoSectionLogo'>EnnaMeet</div>
            <video className='remoteVideoElement' ref={remoteVideoRef} autoPlay muted={mute} />
            <div className='buttonContainer'>
                <div className='buttonWrapper'>
                    <button className='disconnectButton' onClick={hangupOngoingCall}>Disconnect</button>
                    <button className='muteButton' onClick={handleMuteBtn}>{mute ? 'Unmute' : 'Mute'}</button>
                </div>
            </div>
        </div>
    );
}

export default RemoteVideoView