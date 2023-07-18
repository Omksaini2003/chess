var board;
var game;
var room;

window.onload = function () {
    initGame();
    displayid();
};

var initGame = function() {
   var cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg); // gameboard is the id in default.html
   game = new Chess();
};



function join(){
    room = document.getElementById('room').value;
    console.log(socket.id," want to join ", room);
    socket.emit('join-room',room);
    //document.getElementById('room').value=''
}


function displayid(){
    document.getElementById('sid').innerHTML = socket.id;
}



//socket setup

var socket = io();

// called when a player makes a move on the board UI
var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});
    
    if (move === null)  return 'snapback';
    else socket.emit('move', move,room);
    
};

// called when the server calls socket.broadcast('move')
socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});

socket.on('test',()=>{
    console.log("youre my true bro");
})

