import { createContext, useEffect, useState } from "react";

const WebRTCContext = createContext();

const PreOfferAnswers = {
    CALL_ACCEPTED: 'CALL_ACCEPTED',
    CALL_REJECTED: 'CALL_REJECTED',
    CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE'
};

const CallStates = {
    CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
    CALL_AVAILABLE: 'CALL_AVAILABLE',
    CALL_REQUESTED: 'CALL_REQUESTED',
    CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};

const defaultConstrains = {
    video: {
        width: 480,
        height: 360
    },
    audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
    }
    //For simplicity you can use it as follows also
    //video: true, audio: true
};

const configuration = {
    //This is publically available stun server.So not ideal for "production mode". For production create your own STUN/TURN server.
    //Check following link to understand about them and also to know how to create your own STUN/TURN server.
    //https://medium.com/av-transcode/what-is-webrtc-and-how-to-setup-stun-turn-server-for-webrtc-communication-63314728b9d0
    iceServers: [{
        urls: 'stun:stun.l.google.com:19302'
    }]
};

let peerConnection;
let dataChannel;

const WebRTCContextProvider = ({ children }) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [callState, setCallState] = useState(CallStates.CALL_UNAVAILABLE);

    useEffect(() => {
        if (localStream) {
            console.log("stream got");
            console.log(localStream);
            createPeerConnection();
        }
    }, [localStream])

    const getLocalStream = () => {
        navigator.mediaDevices.getUserMedia(defaultConstrains)
            .then(stream => {
                setLocalStream(stream);
                setCallState(CallStates.CALL_AVAILABLE);
            })
            .catch(error => {
                console.log('Error occured when trying to get an access to get local stream');
                console.log(error);
            })
    }

    const createPeerConnection = () => {
        peerConnection = new RTCPeerConnection(configuration);
        // The RTCPeerConnection method "addTrack()" adds a new media track to the set of tracks which will be transmitted to the other peer.
        for (const track of localStream.getTracks()) {
            peerConnection.addTrack(track, localStream);
        }
        /*
        peerConnection.oniceconnectionstatechange = (ev) => console.log("111111111111", ev);

        peerConnection.onconnectionstatechange = (ev) => console.log("222222222", ev);

        peerConnection.addEventListener('track', val => {
            console.log("****************************");
            console.log(val)
            console.log("****************************");
        })
        */
        //Creating Data Channel
        dataChannel = peerConnection.createDataChannel('chat');

        //It will be triggered as soon as datachannel is open
        dataChannel.onopen = () => {
            console.log('chat data channel succesfully opened');
        };

        // Incoming data channel messages
        peerConnection.ondatachannel = (event) => {
            const dataChannel = event.channel;

            dataChannel.onopen = () => {
                console.log('peer connection is ready to receive data channel messages');
            };

            dataChannel.onmessage = (event) => {
                console.log(event.data);
            };
        };
    }

    return (<WebRTCContext.Provider value={{
        getLocalStream
    }}>{children}</WebRTCContext.Provider>);
}

export {
    WebRTCContext,
    WebRTCContextProvider
}