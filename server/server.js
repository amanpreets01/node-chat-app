const path = require('path');

const publicPath = path.join(__dirname , "../public");
const port = process.env.PORT || 3000;
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express()
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection' , (socket) => {
  console.log('Connected to new user');

  socket.emit('createMessage' , {
    name : "Admin",
    text : "Welcome to chat app",
    createdAt : new Date().getTime()
  });

  socket.broadcast.emit('createMessage' , {
    name : "Admin",
    text : "New User Added",
    createdAt : new Date().getTime()
  })

  socket.on('createMessage' , function(data) {
    console.log(data);
    io.emit('newMessage' , {
      from : data.from,
      text : data.text,
      createdAt : new Date().getTime()
    });
  });

  socket.on('disconnect' , () => {
    console.log('Disconnected from the user');
  });
});




server.listen(port , () => {
  console.log('#############');
  console.log(`SERVER UP ON PORT ${port} `);
  console.log('#############')
})
