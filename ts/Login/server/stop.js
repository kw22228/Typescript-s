const io = require('socket.io-client');
const socketClient = io.connect('http://localhost:8081');

//stop
socketClient.on('connet', () => {
    socketClient.emit('npmStop');
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});
