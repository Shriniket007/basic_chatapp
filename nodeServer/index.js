//const { Socket } = require('socket.io');

//node server which will handle socket.io connections
const io = require('socket.io')(8000)   //port = 8000

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);  // to display a new user has joined to all other users
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]}); //if a user send a message it is recieved to other users
    });
})

