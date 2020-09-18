const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const adminMessage = {
    name: 'Admin',
    message: 'Welcome to TicTacToe',
    activePlayer: '',
    isWin: ''
}


let players = {
    player1: '',
    player2: ''
}



io.on('connect', function(socket) {
    console.log('client connected');
    socket.emit('init', adminMessage)        

    socket.on('newMessages', function(payload) { // ini kalo mau maen x/o        
        if (adminMessage.activePlayer === players.player1 ){
            adminMessage.activePlayer= players.player2
        }
        else {
            adminMessage.activePlayer= players.player1
        }
        adminMessage.isWin = payload.isWin
        payload.activePlayer = adminMessage.activePlayer        
        io.emit('serverMessage', payload)
    })

    socket.on('submitPlayer', function(payload) {
        if (players.player1 === ''){        // kalo blm ada Player1
            players.player1 = payload.name
            adminMessage.message = `Player 1 is served ==> ${players.player1}`            
        } else if (players.player2 === ''){ // kalo blm ada Player2
            players.player2 = payload.name
            adminMessage.message = `Player 2 is served ==> ${players.player2}`            
            adminMessage.activePlayer = players.player1  // begitu 2 player udah ada. diset default yg maen dulu player1, ntr kl mau random ini di komen aja
        }
        else {
            adminMessage.message = `Player 1 =${players.player1} || Player 2 =${players.player2} Room is full, yang laen nonton aja yak!!`        }

        io.emit('adminMessage', adminMessage)
    })
})

server.listen(3000, () => {
    console.log('listening at PORT', + 3000)
})