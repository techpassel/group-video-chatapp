import { createContext, useEffect, useState } from "react";
import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'

const BroadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState('');
    const [activeUsers, setActiveUsers] = useState([]);
    const [activeGroupCallRoomId, setActiveGroupCallRoomId] = useState(null);
    const [groupCallRooms, setGroupCallRooms] = useState([]);

    // useEffect(() => {
    //     let existingUser = localStorage.getItem("username");
    //     if (existingUser && existingUser != "") {
    //         setUsername(existingUser);
    //     }
    // }, [])

    useEffect(() => {
        if (socket) {
            //We are emitting following event from server as soon as connection is established.
            socket.on('connection', (socketId) => {
                console.log("Socket connection established.");
                registerUser();
            });

            socket.on('broadcast', (data) => {
                handleBroadcastEvents(data);
            });
        }
        // if (username && username != "") {
        //     localStorage.setItem("username", username)
        // }
    }, [socket])

    const setupSocketConnection = () => {
        setSocket(io(SERVER_URL));
    }

    const registerUser = () => {
        socket.emit('register-user', {
            username,
            socketId: socket.id
        });
    }

    const handleBroadcastEvents = (data) => {
        console.log(data);
        switch (data.event) {
            case BroadcastEventTypes.ACTIVE_USERS:
                //Filtering out ourself(i.e. our user)
                const updatedActiveUsers = data.activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
                setActiveUsers(updatedActiveUsers);
                break;
            case BroadcastEventTypes.GROUP_CALL_ROOMS:
                const updatedGroupCallRooms = data.groupCallRooms.filter(room => room.socketId !== socket.id);
                setGroupCallRooms(updatedGroupCallRooms);
                break;
            default:
                break;
        }
    }

    return (<SocketContext.Provider value={{
        username,
        setUsername,
        setupSocketConnection
    }}>{children}</SocketContext.Provider>);
}

export {
    SocketContextProvider,
    SocketContext
};