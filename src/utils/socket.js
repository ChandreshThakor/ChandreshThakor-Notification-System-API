const http = require('http');
const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIo(server);
};

const getSocket = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = { initSocket, getSocket };
