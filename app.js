var express = require('express');
const { Socket } = require('socket.io');
var app = express();

app.use(express.static('public')); 

var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});


// websocket setup

var io = require('socket.io')(http);

io.on('connection', function(socket) {

    var room = socket.id;

    console.log('new connection');

    // Called when the client calls socket.emit('move')
    socket.on('move', function(msg,room) {
       socket.broadcast.emit('move', msg); 
       socket.to(room).emit('test',msg);
    });

    socket.on('join-room',(r)=>{
        room=r;
    })
});


