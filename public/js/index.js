var socket = io();

socket.on('connect' , function() {
  console.log('Connected to the server');
});

socket.on('disconnect' , function() {
  console.log('Disconnected to the server');
});

socket.on('newMessage' , function(message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  jQuery("#messages").append(li);
});

socket.on('createMessage' ,(message) => {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  jQuery("#messages").append(li);
});

jQuery('#message-form').on('submit' , function(e){

  socket.emit('createMessage' ,message = {
    from : new URL(window.location.href).searchParams.get('uname'),
    text : jQuery('[name=message]').val()
  } ,function(){

  });
  $('#textfield1').val('');
  e.preventDefault();
});

var locationButton = jQuery('#send-location');
locationButton.on('click' , function() {
  if(!navigator.geolocation){
    return alert('Geolocation not supported');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage' ,{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(err){
    alert('Unable to fetch location');
  });
});

socket.on('newLocationMessage' , function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  
  li.text(`${message.from} :` );
  a.attr('href' , message.url);
  li.append(a);
  jQuery("#messages").append(li);
});
