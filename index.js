// Create express server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Routing
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start server
server.listen(3000, () => {
  console.log('listening on *:3000');
});

// Log Connect and Disconnect
io.on('connection', (socket) => {
 console.log('User connected: ' + socket.id);
 socket.on('disconnect', () => {
  console.log('User disconnected: ' + socket.id);
 });
});

// Display socket id and message
io.on('connection', (socket) => {
 socket.on('chat message', (msg) => {
  io.emit('chat message', '<' + socket.id + '> ' + msg);
 });
})


