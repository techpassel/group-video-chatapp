import { io } from "socket.io-client";
import { addSocketId, updateActiveUsers } from "../store/actions/userAction";
import { store } from '../store/store'

const SERVER_URL = 'http://localhost:5000'

let socket;

const getState = () => store.getState();

export const connectWithWebSocket = () => {
    socket = io(SERVER_URL);

    socket.on('connection', () => {
        const { user: { userInfo: { socketId } } } = getState();
        store.dispatch(addSocketId(socket.id));
        registerUser(socketId);
    });

    socket.on('broadcast', (data) => {
        console.log("Broadcast msg");
        console.log(data);
        if (data.activeUsers) {
            const activeUsers = data.activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
            store.dispatch(updateActiveUsers(activeUsers));
        }
    });
}

const registerUser = (previousSocketId) => {
    const { user: { userInfo: { username, socketId } } } = getState();
    socket.emit('register-user', {
        username,
        socketId,
        previousSocketId
    });
}

export const disconnectUser = () => {
    socket.disconnect();
}