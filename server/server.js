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

  socket.on('createMessage' , function(data) {
    console.log(data)
  });

  socket.emit('newMessage' , data =  {
    from : "aman@example.com",
    text : "Hey ,what's up ??",
    createdAt : new Date().getFullYear()
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
