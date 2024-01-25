const http = require('http');
const socketIO = require('socket.io');

function initializeSocketServer() {
  const server = http.createServer();
  const socketServer = new socketIO.Server(server);

  socketServer.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', (data) => {
      socket.broadcast.emit('message', data);
    });
  });

  return socketServer;
}

module.exports = initializeSocketServer();
