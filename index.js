const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('newUser', function(name){
    socket.id = name;
  });
  socket.on('disconnect', (name) => {
    console.log('user disconnected');
    id = socket.id;
    console.log(id);
    io.emit('user disconnected', id);
  });
  socket.on('chat message', (msg, name) => {
    io.emit('chat message', msg, name);
  });
  socket.on('name', (name) => {
    console.log(`${name} connected`);
    io.emit('user connected', name);
  });
  //test channel
  socket.on('test/chat message', (msg, name) => {
    io.to("test").emit('test/chat message', msg, name);
  });
  socket.on('test/name', (name) => {
    console.log(`${name} connected`);
    io.to("test").emit('test/user connected', name);
  });
  socket.on('joining test channel', (name) => {
    socket.join("test");
    console.log('user joined test channel');
  });
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});