const express = require('express');
const app = express();
const { Server } = require("socket.io");
const port = 3000
const bot = require('./modules/bot.js')
const ejs = require('ejs')
const { instrument } = require("@socket.io/admin-ui");
let botChecker = new bot()
botChecker.setup()
app.use((req,res,next) => {
  res.set('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.static('public'))
app.get('/', (req, res) => {
  /*if (req.headers['x-replit-user-id'] !== undefined && req.headers['x-replit-user-id'].length > 0) {
    var userData = []
    userData.user_id = req.headers['x-replit-user-id']
    userData.user_name = req.headers['x-replit-user-name']
    userData.user_roles = req.headers['x-replit-user-roles']
    console.log(userData)
    res.sendFile(__dirname + '/public/html/index.html')
  } else {
    res.sendFile(__dirname + '/public/html/logged-out.html')
    console.log('not logged in')
  }*/
  res.sendFile(__dirname + '/public/html/index.html')
});

const server = app.listen(port, () => {
  console.log('listening');
});

const io = new Server(server);
instrument(io, {
  auth: false,
  namespaceName: "/admin-view"
});
io.on('connection', (socket) => {
  console.log('a user connected, getting their name');
  socket.on('newUser', function(name){
    socket.id = name;
  });
  socket.on('disconnect', (name) => {
    id = socket.id;
    console.log(`${id} disconnected`);
    io.emit('user disconnected', id);
  });
  socket.on('chat message', (msg, name) => {
    console.log(`${name} sent: ${msg}`)
    checkedMessage = botChecker.checkForBotMessages(msg, name);
    var bot = false
    io.emit('chat message', checkedMessage.msg, name, bot);
    if (checkedMessage.hasOwnProperty('bot')) {
      var bot = true
      io.emit('chat message', checkedMessage.bot, `bot`, bot);
    }
  });
  socket.on('name', (name) => {
    console.log(`"${name}" connected`);
    io.emit('user connected', name);
  });
});