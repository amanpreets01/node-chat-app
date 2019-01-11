var socket = io();

socket.on('connect' , function() {
  console.log('Connected to the server');
});

socket.on('disconnect' , function() {
  console.log('Disconnected to the server');
});

socket.on('newMessage' , function(data) {
  console.log(data);
});

socket.on('createMessage' , function(data) {
  console.log(data);
});
