import { CallStates, PreOfferAnswers } from "../enums";
import { resetCallDataState, setCallerUsername, setCallingDialogVisible, setCallRejected, setCallState, setLocalStream, addMessage, setRemoteStream } from "../store/actions/callAction";
import { store } from "../store/store";
import { sendPreOffer, sendPreOfferAnswer, sendWebRTCAnswer, sendWebRTCCandidate, sendWebRTCOffer } from './SocketUtil'

/*
    Role of STUN and TURN servers in WebRTC :-
    ------------------------------------------------------------------------------------------------------------------------
    WebRTC connects users by transferring real-time audio, video and data from device to device using P2P communications. 
    In situations where users are on different Internet Protocol (IP) networks that have Network Address Translation (NAT) 
    firewalls that prevent RTC, WebRTC can be used in conjunction with Session Traversal Utilities for NAT (STUN) servers. 
    This enables a given IP address to be translated into a public internet address so peer connections can be established.

    But there are also networks that are so restrictive that even a STUN server cannot be used to translate IP addresses. 
    In these cases, WebRTC is used with a Traversal Using Relays around NAT (TURN) server, which relays traffic between 
    users, enabling them to connect. The Interactive Connectivity Establishment protocol is used to find the best connection.
    ------------------------------------------------------------------------------------------------------------------------

    For details about WebRTC check the following documentations :
    https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API

    For details about RTCPeerConnection check the following documentation :
    https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection

    For details about RTCDataChannel check the following documentation :
    https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel

    For details about MediaStream check the following documentation :
    https://developer.mozilla.org/en-US/docs/Web/API/MediaStream

    Few more important links :
    https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
    https://datatracker.ietf.org/doc/html/draft-ietf-mmusic-trickle-ice
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
let screenSharingStream;

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
        console.log(track);
        peerConnection.addTrack(track, localStream);
    }

    console.log(peerConnection.canTrickleIceCandidates);

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
            store.dispatch(addMessage(true, event.data));
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
        if (event.candidate) {
            sendWebRTCCandidate({
                candidate: event.candidate,
                connectedUserSocketId: connectedUserSocketId
            });
        }
    };

    peerConnection.onconnectionstatechange = (event) => {
        console.log("Connection state changed", event);
        if (peerConnection.connectionState === 'connected') {
            console.log('Succesfully connected with other peer');
        }
    };
};

export const handlePreOffer = (data) => {
    if (checkIfCallIsPossible()) {
        connectedUserSocketId = data.callerSocketId;
        store.dispatch(setCallerUsername(data.callerUsername));
        store.dispatch(setCallState(CallStates.CALL_REQUESTED));
    } else {
        sendPreOfferAnswer({
            callerSocketId: data.callerSocketId,
            answer: PreOfferAnswers.CALL_NOT_AVAILABLE
        });
    }
};

export const handlePreOfferAnswer = (data) => {
    store.dispatch(setCallingDialogVisible(false));

    if (data.answer === PreOfferAnswers.CALL_ACCEPTED) {
        sendOffer();
    } else {
        let rejectionReason;
        if (data.answer === PreOfferAnswers.CALL_NOT_AVAILABLE) {
            rejectionReason = 'Callee is not able to pick up the call right now';
        } else {
            rejectionReason = 'Call rejected by the callee';
        }
        store.dispatch(setCallRejected({
            rejected: true,
            reason: rejectionReason
        }));

        resetCallData();
    }
};

export const acceptIncomingCallRequest = () => {
    sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: PreOfferAnswers.CALL_ACCEPTED
    });

    store.dispatch(setCallState(CallStates.CALL_IN_PROGRESS));
};

export const rejectIncomingCallRequest = () => {
    sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: PreOfferAnswers.CALL_REJECTED
    });
    resetCallData();
};

export const incomingCallRequestNotAnswered = () => {
    sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: PreOfferAnswers.CALL_NOT_ANSWERED
    });
    resetCallData();
};


export const handleOffer = async (data) => {
    await peerConnection.setRemoteDescription(data.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendWebRTCAnswer({
        callerSocketId: connectedUserSocketId,
        answer: answer
    });
};

export const handleAnswer = async (data) => {
    await peerConnection.setRemoteDescription(data.answer);
};

export const handleCandidate = async (data) => {
    try {
        console.log('Adding ice candidates', data.candidate);
        await peerConnection.addIceCandidate(data.candidate);
    } catch (err) {
        console.error('Error occured when trying to add received ice candidate', err);
    }
};

export const handleUserHangedUp = () => {
    resetCallDataAfterHangUp();
};

export const callToOtherUser = (calleeDetails) => {
    connectedUserSocketId = calleeDetails.socketId;
    store.dispatch(setCallState(CallStates.CALL_IN_PROGRESS));
    store.dispatch(setCallingDialogVisible(true));
    let { userInfo: { username } } = getState().user
    console.log(username);
    sendPreOffer({
        callee: calleeDetails,
        caller: {
            username
        }
    });
};

const checkIfCallIsPossible = () => {
    const state = getState();
    if (state.call.localStream === null || state.call.callState !== CallStates.CALL_AVAILABLE) {
        return false;
    } else {
        return true;
    }
};

const sendOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendWebRTCOffer({
        calleeSocketId: connectedUserSocketId,
        offer: offer
    });
};

const resetCallDataAfterHangUp = () => {
    peerConnection.close();
    peerConnection = null;
    createPeerConnection();
    resetCallData();
    const state = getState();
    const localStream = state.call.localStream;
    localStream.getVideoTracks()[0].enabled = true;
    localStream.getAudioTracks()[0].enabled = true;

    if (state.call.screenSharingActive) {
        screenSharingStream.getTracks().forEach(track => {
            track.stop();
        });
    }

    store.dispatch(resetCallDataState());
};

const resetCallData = () => {
    connectedUserSocketId = null;
    store.dispatch(setCallState(CallStates.CALL_AVAILABLE));
};