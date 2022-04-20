var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    if (input.value !== 'transport close') {
      socket.emit('chat message', input.value, name);
      input.value = '';
    } else {
      socket.emit('chat message', `transport close `, name);
      input.value = '';
    }
  }
});
const name = prompt(`What's your name?`);
const myName = name;
socket.on('connect', function(){
  socket.emit('newUser', name);
});
socket.emit('name', name);
socket.on('chat message', function(msg, name, bot) {
  var item = document.createElement('li');
  if (bot) {
    item.textContent = `bot: ${msg}`;
  } else {
    item.textContent = `${name}: ${msg}`;
  }
  console.log(name)
  if (name == myName) {
    item.className = "mine"
  } else if (bot) {
    item.className = "server"
  } else {
    item.className = "notMine"
  }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
socket.on('user connected', function(name) {
  var item = document.createElement('li');
  item.textContent = `"${name}" connected`;
  item.className = "server"
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
socket.on('user disconnected', function(id) {
  var item = document.createElement('li');
  item.textContent = `${id} disconnected`;
  item.className = "server"
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});