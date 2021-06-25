const socketClt = (socket) => {

    /* socket.on('disconnect', () => { 
    }); */

    socket.on('sendmsg', (payload, callback) => {
        const id = 1234567;
        callback(id);
        socket.broadcast.emit('sendmsg', payload);
    });
}

module.exports = {
    socketClt
}