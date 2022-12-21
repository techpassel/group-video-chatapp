import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './LocalVideoView.scss'

const styles = {
    videoContainer: {
        width: '150px',
        height: '150px',
        borderRadius: '8px',
        position: 'absolute',
        top: '5%',
        right: '5%'
    },
    videoElement: {
        width: '100%',
        height: '100%'
    }
};

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
        <div style={styles.videoContainer} className="localVideoContainer">
            <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
        </div>
    );
};

export default LocalVideoView;
