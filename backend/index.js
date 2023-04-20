import express from "express";
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { PeerServer } from 'peer';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
};

app.use(allowCrossDomain);
app.use(express.json());
//The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.

const server = http.createServer(app);
// Starting express server
server.listen(
    PORT,
    console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
).on('error', err => console.log("Server can't be started. Error :" + err));

// test api
app.get('/test', (req, res) => {
    res.send("Server working")
});
/*
For details about "peer"(server side implementation of peerjs) check following documentation.
https://www.npmjs.com/package/peer 

We could have used "ExpressPeerServer" also inplace of "PeerServer". Actually following code(i.e. using 'PeerServer') will 
create a separate new server for running "peer" server on port 9000. If we don't want to run our "peer" server separately 
and want to combine it with the existing express server then we should use "ExpressPeerServer". It is also provided by "peer" 
library along with "PeerServer". 
The reason why we created a separate server for peer server is because we can't run a socket.io server and a peer server with the 
same express app as in that case peer server will also use the same websocket attachment to express which socket.io will use. So 
we have to run socket.io server and peer server separately.
*/
const peerServer = PeerServer({
    port: 9000,
    path: '/my-peer',
    proxied: true
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => console.log(`Peer connection established for client - ${client.id}`));
peerServer.on('disconnect', (client) => onsole.log(`Peer connection ended for client - ${client.id}`));

/*
Creating PeerServer(A server for "PeerJS"). Note that "PeerJs" is used in client side, on server side PeerServer is used.
PeerServer helps establishing connections between PeerJS clients. In PeerServer, data is not proxied through the server.

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/my-peer'
});

app.use('/my-peer', peerServer);
You can access PeerServer created above on the URL - http://localhost:5005/my-peer

peerServer.on('connection', (client) => console.log(`Peer connection established for client - ${client}`));
peerServer.on('disconnect', (client) => onsole.log(`Peer connection ended for client - ${client}`));
*/

// Creating a 'socket.io' server.
// Here 'Server' is imported from 'socket.io' module and 'server' is defined above.
const io = new Server(server, {
    cors: {
        origin: '*',
        // origins: [process.env.FRONTEND_URL],
        // methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

let peers = [];
let groupCallRooms = [];

const BroadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
};

io.on('connection', (socket) => {
    //Following code will be executed as soon as connection is established.
    console.log(`Socket connection established - ${socket.id}`);
    /*
    socket.emit() is used to send message to self while io.emit() is used to send message to others(including self)
    If you want to send message to all except you then use socket.broadcast.emit()
    And if you want to send message in a room then use socket.to(roomId).emit().
    */

    socket.emit('connection', null);

    socket.on('register-user', (data) => {
        if (data.socketId && data.username && data.username != "") {
            // peers = peers.filter(p => p.username != data.username);
            peers.push(data);
            notifyPeersAndRoomsUpdate();
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        peers = peers.filter(p => p.socketId != socket.id);
        groupCallRooms = groupCallRooms.filter(room => room.socketId !== socket.id);
        notifyPeersAndRoomsUpdate();
    });

    // listeners related with direct call
    //====================================================================//
    socket.on('pre-offer', (data) => {
        console.log('pre-offer handled');
        io.to(data.callee.socketId).emit('pre-offer', {
            callerUsername: data.caller.username,
            callerSocketId: socket.id
        });
    });

    socket.on('pre-offer-answer', (data) => {
        console.log('handling pre offer answer');
        io.to(data.callerSocketId).emit('pre-offer-answer', {
            answer: data.answer
        });
    });

    socket.on('disconnect-call', (data) => {
        console.log('handling call disconnection');
        io.to(data.otherUserSocketId).emit('disconnect-call', {
            otherUserSocketId: socket.id
        })
    })

    socket.on('webRTC-offer', (data) => {
        console.log('handling webRTC offer');
        io.to(data.calleeSocketId).emit('webRTC-offer', {
            offer: data.offer
        });
    });

    socket.on('webRTC-answer', (data) => {
        console.log('handling webRTC answer');
        io.to(data.callerSocketId).emit('webRTC-answer', {
            answer: data.answer
        });
    });

    socket.on('webRTC-candidate', (data) => {
        console.log('handling ice candidate');
        io.to(data.connectedUserSocketId).emit('webRTC-candidate', {
            candidate: data.candidate
        });
    });

    socket.on('user-hanged-up', (data) => {
        io.to(data.connectedUserSocketId).emit('user-hanged-up');
    });
    //====================================================================//

    const notifyPeersAndRoomsUpdate = () => {
        //To send the user list of already existing users when he is registered. It includes him also.
        io.sockets.emit('broadcast', {
            event: BroadcastEventTypes.ACTIVE_USERS,
            activeUsers: peers
        });

        //To send the user list of already existing groups when he is registered.
        io.sockets.emit('broadcast', {
            event: BroadcastEventTypes.GROUP_CALL_ROOMS,
            groupCallRooms
        });
    }
});