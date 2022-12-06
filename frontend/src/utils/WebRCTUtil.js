import { CallStates } from "../enums";
import { setCallState, setLocalStream, setMessage, setRemoteStream } from "../store/actions/callAction";
import { store } from "../store/store";

/*
    Role of STUN and TURN servers in WebRTC :-
    WebRTC connects users by transferring real-time audio, video and data from device to device using P2P communications. 
    In situations where users are on different Internet Protocol (IP) networks that have Network Address Translation (NAT) 
    firewalls that prevent RTC, WebRTC can be used in conjunction with Session Traversal Utilities for NAT (STUN) servers. 
    This enables a given IP address to be translated into a public internet address so peer connections can be established.

    But there are also networks that are so restrictive that even a STUN server cannot be used to translate IP addresses. 
    In these cases, WebRTC is used with a Traversal Using Relays around NAT (TURN) server, which relays traffic between 
    users, enabling them to connect. The Interactive Connectivity Establishment protocol is used to find the best connection.


    For details about WebRTC check following documentations :
    https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
    https://www.techtarget.com/searchunifiedcommunications/definition/WebRTC-Web-Real-Time-Communications



    For details about RTCPeerConnection check following documentation :
    https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
*/

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

let connectedUserSocketId;
let peerConnection;
let dataChannel;

const getState = () => store.getState();

export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(defaultConstrains)
        .then(stream => {
            store.dispatch(setLocalStream(stream));
            store.dispatch(setCallState(CallStates.CALL_AVAILABLE));
            createPeerConnection();
        })
        .catch(error => {
            console.log('Error occured when trying to get an access to get local stream');
            console.log(error);
        })
}

const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);
    let state = getState();

    const localStream = state.call.localStream;

    for (const track of localStream.getTracks()) {
        peerConnection.addTrack(track, localStream);
    }

    peerConnection.ontrack = ({ streams: [stream] }) => {
        console.log(stream);
        store.dispatch(setRemoteStream(stream));
    };

    // Incoming data channel messages
    peerConnection.ondatachannel = (event) => {
        const incomingDataChannel = event.channel;

        incomingDataChannel.onopen = () => {
            console.log('Peer connection is ready to receive data channel messages');
        };

        incomingDataChannel.onmessage = (event) => {
            store.dispatch(setMessage(true, event.data));
        };
    };

    //Creating Data Channel
    dataChannel = peerConnection.createDataChannel('chat');

    //It will be triggered as soon as datachannel is open
    dataChannel.onopen = () => {
        console.log('Chat data channel succesfully opened');
    };

    peerConnection.onicecandidate = (event) => {
        console.log('Geeting candidates from stun server', event.candidate);
        // if (event.candidate) {
        //     wss.sendWebRTCCandidate({
        //         candidate: event.candidate,
        //         connectedUserSocketId: connectedUserSocketId
        //     });
        // }
    };

    peerConnection.onconnectionstatechange = (event) => {
        console.log("Connection state changed", event);
        if (peerConnection.connectionState === 'connected') {
            console.log('Succesfully connected with other peer');
        }
    };
};
