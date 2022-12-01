import express from "express";
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { ExpressPeerServer } from 'peer';

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

// Creating PeerServer(A server for PeerJS). Note that "PeerJs" is used in client side.
// PeerServer helps establishing connections between PeerJS clients. In PeerServer, data is not proxied through the server.
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: ''
});

app.use('/my-peer', peerServer);
// You can access PeerServer created above on the URL - http://localhost:5005/my-peer

peerServer.on('connection', (client) => console.log(`Peer connection established for client - ${client}`));
peerServer.on('disconnect', (client) => onsole.log(`Peer connection ended for client - ${client}`));

// Creating a 'socket.io' server.
// Here 'Server' is imported from 'socket.io' module and 'server' is defined above.
const io = new Server(server, {
    cors: {
        // origin: '*',
        origins: [process.env.FRONTEND_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE']
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
    console.log(`Request coming ${socket.id}`);
    socket.emit('connection', socket.id);

    socket.on('register-user', (data) => {
        if (data.username && data.socketId && data.username != "") {
            peers = peers.filter(p => p.username != data.username);
            peers.push(data);

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
})

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
