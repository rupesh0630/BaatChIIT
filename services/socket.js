const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const express = require('express');
const { callbackify } = require('util');
const app = express();
const server = http.createServer(app);
// const logo1 = require('../client/src/components/Chat/Assets/wait1.svg');


const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
// const io = require('socket.io')(server, {
//   path: '/socket.io', // added this line of code
// });


var sockets = {},
    users = {},
    strangerQueue = false;


module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log("We have a new connection!!", socket.id);
  
    sockets[socket.id] = socket;
    users[socket.id] = {
      connectedTo: -1,
      isTyping: false
    }
  
    if(strangerQueue !== false){
      users[socket.id].connectedTo = strangerQueue;
      users[strangerQueue].connectedTo = socket.id;
      users[socket.id].isTyping = false;
      socket.emit('conn',  {id: users[socket.id].connectedTo});
      users[strangerQueue].isTyping = false;
      sockets[strangerQueue].emit('conn', {code: 1, bcode:1,  text: "You are now chatting with a Stranger!" , id: users[strangerQueue].connectedTo});
      socket.emit('waiting', {bcode: 1, code:1,  text: "You are now chatting with a Stranger!"})
      strangerQueue = false;
    } else {
      strangerQueue = socket.id;
      socket.emit('waiting', {code:2, bcode:2,  text: "Hold up, we are searching for someone to chat"})
    }

    socket.on("new", function () {
		
      // Got data from someone
      if (strangerQueue !== false) {
        users[socket.id].connectedTo = strangerQueue;
        users[strangerQueue].connectedTo = socket.id;
        users[socket.id].isTyping = false;
        users[strangerQueue].isTyping = false;
        socket.emit('conn', {id: users[socket.id].connectedTo});
        sockets[strangerQueue].emit('conn', {code: 1, bcode:1,  text: "You are now chatting with a Stranger!", id: users[strangerQueue].connectedTo});
        socket.emit('waiting', {bcode: 1, code:1, text: "You are now chatting with a Stranger!"})
        strangerQueue = false;
      } else {
        strangerQueue = socket.id;
        socket.emit('waiting', {code:2, bcode:2,  text: "Hold up, we are searching for someone to chat"})
      }
      
    });

    socket.on("disconn", function () {
      var connTo = users[socket.id].connectedTo;
      if (strangerQueue === socket.id || strangerQueue === connTo) {
        strangerQueue = false;
      }
      users[socket.id].connectedTo = -1;
      users[socket.id].isTyping = false;
      if (sockets[connTo]) {
        users[connTo].connectedTo = -1;
        users[connTo].isTyping = false;
        sockets[connTo].emit("disconn", {who: 2, text: "Stranger has left the chat", bcode:3, code: 3});
      }
      socket.emit("disconn", {who: 1, bcode:3, code: 3, text: "You have left the chat"});
    });

    socket.on('typing', (isTyping)=> {
      if (users[socket.id].connectedTo !== -1 && sockets[users[socket.id].connectedTo]) {
        users[socket.id].isTyping = isTyping;
        sockets[users[socket.id].connectedTo].emit('istyping', isTyping);
        // && users[socket.id].isTyping !== isTyping
        // sockets[socket.id].emit('istyping', isTyping);
      }
    });
    
    socket.on('sendMessage', (message, callback) => {
      if (users[socket.id].connectedTo !== -1 && sockets[users[socket.id].connectedTo]) {
        sockets[users[socket.id].connectedTo].emit('message', {text: message, user: users[socket.id].connectedTo})
        sockets[socket.id].emit('message', {text: message, user: users[socket.id].connectedTo});
        callback();
      }
    });
  
    socket.on('disconnect', (err) => {
        console.log("User has disconnected");
  
        var connTo = (users[socket.id] && users[socket.id].connectedTo);
        if(connTo === undefined){
          connTo = -1;
        }
        if(connTo !== -1 && sockets[connTo]) {
          sockets[connTo].emit("disconn", {bcode:3, code: 3, who: 2, reason: err && err.toString(), id: users[socket.id].connectedTo, text: "Stranger has left the chat"});
          users[connTo].connectedTo = -1;
        }
  
        delete sockets[socket.id];
        delete users[socket.id];
  
        if(strangerQueue === socket.id || strangerQueue === connTo) {
          strangerQueue = false;
        }
    });
  });
}  