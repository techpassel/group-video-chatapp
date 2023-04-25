import { io } from "socket.io-client";
import { BroadcastEventTypes } from "../enums";
import { addSocketId, updateActiveUsers, updateGroupCallRooms } from "../store/actions/userAction";
import { store } from '../store/store'
import { handleAnswer, handleCandidate, handleDisconnectCall, handleOffer, handlePreOffer, handlePreOfferAnswer, handleUserHangedUp } from "./WebRCTUtil";

const SERVER_URL = 'http://localhost:5000'

let socket;

const getState = () => store.getState();

export const connectWithWebSocket = () => {
    socket = io(SERVER_URL);

    socket.on('connection', () => {
        store.dispatch(addSocketId(socket.id));
        registerUser();
    });

    socket.on('broadcast', (data) => {
        handleBroadcastEvents(data);
    });

    // listeners from server related with direct call
    //===================================================//
    socket.on('pre-offer', (data) => {
        //Step 1 of receiving call. Step 2 is "handlePreOffer" defined in WebRCTUtil.js.
        handlePreOffer(data);
    });

    socket.on('pre-offer-answer', (data) => {
        //Step 4 of making call. Step 5 is "handlePreOfferAnswer" defined in WebRCTUtil.js.
        handlePreOfferAnswer(data);
    });

    socket.on('disconnect-call', (data) => {
        handleDisconnectCall(data);
    })

    socket.on('webRTC-offer', (data) => {
        //Step 4 of receiving call. Step 5 is "handleOffer" defined in WebRCTUtil.js.
        handleOffer(data);
    });

    socket.on('webRTC-answer', (data) => {
        //Step 8 of making call. Step 9 is "handleAnswer" defined in WebRCTUtil.js.
        handleAnswer(data);
    });

    socket.on('webRTC-candidate', (data) => {
        //Step 1 - Receive Ice candidate
        handleCandidate(data);
    });

    socket.on('user-hanged-up', () => {
        handleUserHangedUp();
    });
    //===================================================//
}

const registerUser = () => {
    const { user: { userInfo: { username, socketId } } } = getState();
    socket.emit('register-user', {
        username,
        socketId
    });
}

export const disconnectUser = () => {
    socket.disconnect();
}

// emitting events to server related with direct call
//===================================================//
export const sendPreOffer = (data) => {
    //Step 3 of making call. Step 4 is "socket.on('pre-offer-answer')" defined in SocketUtil.js.
    //After this step request is emitted on server(backend) and hence on callee side frontend.  
    socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
    //Step 3 of receiving call. Step 4 is "socket.on('webRTC-offer')" in SocketUtil.js.
    //After this step request is emitted on server(backend) and hence on caller side frontend.
    socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data) => {
    //Step 7 of making call. Step 8 is "socket.on('webRTC-answer')" in SocketUtil.js.
    //After this step request is emitted on server(backend) and hence on callee side frontend.
    socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
    //Step 6 of receiving call. 
    //After this step request is emitted on server(backend) and hence on caller side frontend.
    //This is the last step in making call. After this only iceCandidate and stun server will work.
    //Check "peerConnection.onicecandidate" in WebRTCUtil.js for details.
    socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data) => {
    //Step 2 - Ice candidate. 
    socket.emit('webRTC-candidate', data);
};

export const disconnectCall = (data) => {
    socket.emit('disconnect-call', data);
}

export const sendUserHangedUp = (data) => {
    socket.emit('user-hanged-up', data);
};
//===================================================//

const handleBroadcastEvents = (data) => {
    switch (data.event) {
        case BroadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
            store.dispatch(updateActiveUsers(activeUsers));
            break;
        case BroadcastEventTypes.GROUP_CALL_ROOMS:
            const groupCallRooms = data.groupCallRooms;
            // const groupCallRooms = data.groupCallRooms.filter(room => room.socketId !== socket.id);
            // const activeGroupCallRoomId = webRTCGroupCallHandler.checkActiveGroupCall();

            // if (activeGroupCallRoomId) {
            //     const room = groupCallRooms.find(room => room.roomId === activeGroupCallRoomId);
            //     if (!room) {
            //         webRTCGroupCallHandler.clearGroupData();
            //     }
            // }
            store.dispatch(updateGroupCallRooms(groupCallRooms));
            break;
        default:
            break;
    }
};