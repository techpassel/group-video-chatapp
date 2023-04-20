import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './LocalVideoView.scss'

const LocalVideoView = ({ localStream }) => {
    // const { localStream } = useSelector((state) => state.call)
    const [mute, setMute] = useState(true);
    const localVideoRef = useRef();

    useEffect(() => {
        if (localStream) {
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;

            localVideo.onloadedmetadata = () => {
                localVideo.play();
            };
        }
    }, [localStream]);

    const handleMuteBtn = () => {
        setMute(!mute);
    }

    return (
        <div className="localVideoContainer">
            <video className='localVideoElement' ref={localVideoRef} autoPlay muted={mute} />
            <div className='buttonContainer'>
                <div className='buttonWrapper'>
                    <button className='muteButton' onClick={handleMuteBtn}>{mute ? 'Unmute' : 'Mute'}</button>
                </div>
            </div>
        </div>
    );
};

export default LocalVideoView;
