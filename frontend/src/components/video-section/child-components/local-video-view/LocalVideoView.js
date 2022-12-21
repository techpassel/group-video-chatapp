import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './LocalVideoView.scss'

const LocalVideoView = () => {
    const { localStream } = useSelector((state) => state.call)
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

    return (
        <div className="localVideoContainer">
            <video className='localVideoElement' ref={localVideoRef} autoPlay muted />
        </div>
    );
};

export default LocalVideoView;
