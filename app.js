const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const message = [{
    name: 'Admin',
    message: 'Welcome to TicTacToe'
}]

io.on('connect', function(socket) {
    console.log('client connected');
    socket.emit('init', message)

    socket.on('newMessages', function(payload) {
        console.log(payload);
        socket.broadcast.emit('serverMessage', payload)
    })
})

server.listen(3000, () => {
    console.log('listening at PORT', + 3000)
})