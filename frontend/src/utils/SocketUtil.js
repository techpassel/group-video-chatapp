import { io } from "socket.io-client";
import { BroadcastEventTypes } from "../enums";
import { addSocketId, updateActiveUsers, updateGroupCallRooms } from "../store/actions/userAction";
import { store } from '../store/store'
import { handleAnswer, handleCandidate, handleOffer, handlePreOffer, handlePreOfferAnswer, handleUserHangedUp } from "./WebRCTUtil";

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

    // listeners related with direct call
    //===================================================//
    socket.on('pre-offer', (data) => {
        handlePreOffer(data);
    });

    socket.on('pre-offer-answer', (data) => {
        handlePreOfferAnswer(data);
    });

    socket.on('webRTC-offer', (data) => {
        handleOffer(data);
    });

    socket.on('webRTC-answer', (data) => {
        handleAnswer(data);
    });

    socket.on('webRTC-candidate', (data) => {
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
    socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
    socket.emit('pre-offer-answer', data);
};

export const sendWebRTCOffer = (data) => {
    socket.emit('webRTC-offer', data);
};

export const sendWebRTCAnswer = (data) => {
    socket.emit('webRTC-answer', data);
};

export const sendWebRTCCandidate = (data) => {
    socket.emit('webRTC-candidate', data);
};

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